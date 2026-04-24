export interface FileInfo {
  name: string;
  path: string;
  timestamp: number;
  size: number;
}

export interface StatusInfo {
  status: 'idle' | 'processing' | 'done' | 'error';
  message: string;
  timestamp: number;
}

const INPUT_DIR = '../communication/input';
const OUTPUT_DIR = '../communication/output';
const STATUS_FILE = '../communication/status/status.json';

export async function writeInputFile(content: string): Promise<void> {
  const timestamp = Date.now();
  const filename = `${timestamp}.md`;
  const path = `${INPUT_DIR}/${filename}`;

  const response = await fetch('/api/write', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, content }),
  });

  if (!response.ok) {
    throw new Error(`Failed to write file: ${response.statusText}`);
  }
}

export async function listOutputFiles(): Promise<FileInfo[]> {
  try {
    const response = await fetch('/api/list?dir=' + encodeURIComponent(OUTPUT_DIR));
    if (!response.ok) return [];
    const files: FileInfo[] = await response.json();
    return files.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

export async function readFile(path: string): Promise<string> {
  const response = await fetch('/api/read?path=' + encodeURIComponent(path));
  if (!response.ok) {
    throw new Error(`Failed to read file: ${response.statusText}`);
  }
  return response.text();
}

export async function readStatus(): Promise<StatusInfo | null> {
  try {
    const response = await fetch('/api/read?path=' + encodeURIComponent(STATUS_FILE));
    if (!response.ok) return null;
    const data = await response.json();
    return data as StatusInfo;
  } catch {
    return null;
  }
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function openInNewTab(content: string): void {
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
