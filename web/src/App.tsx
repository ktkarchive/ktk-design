import { useState, useRef, useCallback, useEffect } from 'react';
import ChatPanel from './components/ChatPanel';
import PreviewPanel from './components/PreviewPanel';
import { useFileWatcher } from './hooks/useFileWatcher';

const MIN_LEFT_WIDTH = 320;
const MIN_RIGHT_WIDTH = 400;

export default function App() {
  const [leftWidth, setLeftWidth] = useState(40);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { files, status, refresh } = useFileWatcher(1000);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const newLeftWidth = (e.clientX / containerWidth) * 100;

      if (
        e.clientX >= MIN_LEFT_WIDTH &&
        containerWidth - e.clientX >= MIN_RIGHT_WIDTH
      ) {
        setLeftWidth(newLeftWidth);
      }
    },
    [isDragging]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="h-screen w-screen flex flex-col bg-navy-100">
      <header className="shrink-0 px-6 py-3 bg-navy-800 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-serif tracking-tight">KTK Design 워크벤치</h1>
          <span className="text-xs text-navy-300 font-medium px-2 py-0.5 bg-navy-700 rounded">
            v0.1.0
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={refresh}
            className="
              text-xs text-navy-300 hover:text-white
              px-3 py-1.5 rounded border border-navy-600
              hover:border-navy-500 transition-colors
            "
          >
            새로고침
          </button>
          <span className="text-xs text-navy-400">
            파일: {files.length}개
          </span>
        </div>
      </header>

      <main
        ref={containerRef}
        className="flex-1 flex overflow-hidden p-3 gap-3"
      >
        <div
          className="h-full overflow-hidden"
          style={{ width: `${leftWidth}%` }}
        >
          <ChatPanel status={status} />
        </div>

        <div
          className={`
            w-1 shrink-0 cursor-col-resize rounded-full
            transition-colors duration-150
            ${isDragging ? 'bg-accent-500' : 'bg-navy-200 hover:bg-accent-400'}
          `}
          onMouseDown={handleMouseDown}
          title="드래그하여 패널 크기 조절"
        />

        <div
          className="h-full overflow-hidden flex-1"
        >
          <PreviewPanel files={files} />
        </div>
      </main>
    </div>
  );
}
