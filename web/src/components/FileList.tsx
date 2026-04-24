import { FileInfo } from '../lib/fileSystem';

interface FileListProps {
  files: FileInfo[];
  selectedFile: string | null;
  onSelectFile: (file: FileInfo) => void;
}

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileList({ files, selectedFile, onSelectFile }: FileListProps) {
  if (files.length === 0) {
    return (
      <div className="text-sm text-navy-400 py-6 text-center">
        생성된 파일이 없습니다
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {files.map((file) => (
        <button
          key={file.name}
          type="button"
          onClick={() => onSelectFile(file)}
          className={`
            flex items-center justify-between px-3 py-2 rounded text-left text-sm
            transition-colors duration-150
            ${selectedFile === file.name
              ? 'bg-navy-100 text-navy-800'
              : 'hover:bg-navy-50 text-navy-600'
            }
          `}
        >
          <span className="truncate flex-1 mr-2 font-medium">{file.name}</span>
          <div className="flex items-center gap-2 text-xs text-navy-400 shrink-0">
            <span>{formatSize(file.size)}</span>
            <span>{formatTimestamp(file.timestamp)}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
