import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

function fileApiMiddleware() {
  return {
    name: 'file-api-middleware',
    configureServer(server: { middlewares: { use: (path: string, handler: (req: any, res: any, next: any) => void) => void } }) {
      server.middlewares.use('/api/write', async (req, res, next) => {
        if (req.method !== 'POST') return next();

        try {
          let body = '';
          req.on('data', (chunk: Buffer) => { body += chunk; });
          req.on('end', () => {
            try {
              const { path: filePath, content } = JSON.parse(body);
              const absolutePath = resolve(__dirname, filePath);
              const dir = path.dirname(absolutePath);
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
              }
              fs.writeFileSync(absolutePath, content, 'utf-8');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: String(err) }));
            }
          });
        } catch {
          next();
        }
      });

      server.middlewares.use('/api/list', async (req, res, next) => {
        if (req.method !== 'GET') return next();

        try {
          const url = new URL(req.url || '', `http://${req.headers.host}`);
          const dirPath = url.searchParams.get('dir');
          if (!dirPath) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Missing dir parameter' }));
            return;
          }

          const absoluteDir = resolve(__dirname, dirPath);
          if (!fs.existsSync(absoluteDir)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify([]));
            return;
          }

          const entries = fs.readdirSync(absoluteDir);
          const files = entries
            .filter((entry) => {
              const fullPath = path.join(absoluteDir, entry);
              return fs.statSync(fullPath).isFile();
            })
            .map((entry) => {
              const fullPath = path.join(absoluteDir, entry);
              const stat = fs.statSync(fullPath);
              return {
                name: entry,
                path: `${dirPath}/${entry}`,
                timestamp: stat.mtimeMs,
                size: stat.size,
              };
            });

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(files));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(err) }));
        }
      });

      server.middlewares.use('/api/read', async (req, res, next) => {
        if (req.method !== 'GET') return next();

        try {
          const url = new URL(req.url || '', `http://${req.headers.host}`);
          const filePath = url.searchParams.get('path');
          if (!filePath) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Missing path parameter' }));
            return;
          }

          const absolutePath = resolve(__dirname, filePath);
          if (!fs.existsSync(absolutePath)) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'File not found' }));
            return;
          }

          const content = fs.readFileSync(absolutePath, 'utf-8');
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(content);
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(err) }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), fileApiMiddleware()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
