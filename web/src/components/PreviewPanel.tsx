import { useState, useCallback } from 'react';
import { FileInfo, readFile, downloadFile, openInNewTab } from '../lib/fileSystem';
import FileList from './FileList';

interface PreviewPanelProps {
  files: FileInfo[];
}

export default function PreviewPanel({ files }: PreviewPanelProps) {
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'source'>('preview');

  const handleSelectFile = useCallback(async (file: FileInfo) => {
    setSelectedFile(file);
    setIsLoading(true);
    try {
      const content = await readFile(file.path);
      setHtmlContent(content);
    } catch (err) {
      setHtmlContent(`<p style="color:red">Error loading file: ${err instanceof Error ? err.message : 'Unknown error'}</p>`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (selectedFile && htmlContent) {
      downloadFile(htmlContent, selectedFile.name);
    }
  }, [selectedFile, htmlContent]);

  const handleOpenInBrowser = useCallback(() => {
    if (htmlContent) {
      openInNewTab(htmlContent);
    }
  }, [htmlContent]);

  const iframeSrcDoc = activeTab === 'preview' ? htmlContent : '';

  return (
    <div className="panel h-full">
      <div className="px-5 py-4 border-b border-navy-100 flex items-center justify-between">
        <h2 className="text-xl font-serif text-navy-800">미리보기</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`
              px-3 py-1.5 rounded text-xs font-medium transition-colors
              ${activeTab === 'preview'
                ? 'bg-navy-800 text-white'
                : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
              }
            `}
          >
            미리보기
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('source')}
            className={`
              px-3 py-1.5 rounded text-xs font-medium transition-colors
              ${activeTab === 'source'
                ? 'bg-navy-800 text-white'
                : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
              }
            `}
          >
            소스
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden grid grid-cols-[280px_1fr]">
        <div className="border-r border-navy-100 overflow-y-auto scrollbar-thin p-3">
          <FileList
            files={files}
            selectedFile={selectedFile?.name ?? null}
            onSelectFile={handleSelectFile}
          />
        </div>

        <div className="flex flex-col overflow-hidden">
          {selectedFile && (
            <div className="px-4 py-2 border-b border-navy-100 flex items-center justify-between bg-navy-50">
              <span className="text-xs text-navy-600 truncate font-medium">
                {selectedFile.name}
              </span>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="
                    px-3 py-1 rounded text-xs font-medium
                    bg-white border border-navy-200 text-navy-700
                    hover:bg-navy-50 transition-colors
                  "
                >
                  다운로드
                </button>
                <button
                  type="button"
                  onClick={handleOpenInBrowser}
                  className="
                    px-3 py-1 rounded text-xs font-medium
                    bg-white border border-navy-200 text-navy-700
                    hover:bg-navy-50 transition-colors
                  "
                >
                  브라우저에서 열기
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 relative overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="flex items-center gap-2 text-navy-400">
                  <div className="w-4 h-4 border-2 border-navy-300 border-t-accent-500 rounded-full animate-spin" />
                  <span className="text-sm">로딩 중...</span>
                </div>
              </div>
            )}

            {!selectedFile && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center text-navy-400">
                <div className="text-center">
                  <p className="font-serif text-lg mb-2">파일을 선택하세요</p>
                  <p className="text-sm">왼쪽 목록에서 미리볼 파일을 클릭하세요</p>
                </div>
              </div>
            )}

            {activeTab === 'preview' && selectedFile && (
              <iframe
                key={selectedFile.name}
                srcDoc={iframeSrcDoc}
                sandbox="allow-scripts"
                title="Preview"
                className="w-full h-full border-0"
              />
            )}

            {activeTab === 'source' && selectedFile && (
              <pre className="w-full h-full overflow-auto p-4 text-xs text-navy-700 bg-navy-50 scrollbar-thin">
                <code>{htmlContent}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
