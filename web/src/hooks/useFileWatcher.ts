import { useState, useEffect, useRef, useCallback } from 'react';
import { listOutputFiles, readStatus, FileInfo, StatusInfo } from '../lib/fileSystem';

interface UseFileWatcherReturn {
  files: FileInfo[];
  status: StatusInfo | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useFileWatcher(pollInterval = 1000): UseFileWatcherReturn {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [status, setStatus] = useState<StatusInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastFileCountRef = useRef(0);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [newFiles, newStatus] = await Promise.all([
        listOutputFiles(),
        readStatus(),
      ]);

      if (newFiles.length !== lastFileCountRef.current) {
        lastFileCountRef.current = newFiles.length;
      }

      setFiles(newFiles);
      setStatus(newStatus);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(fetchData, pollInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchData, pollInterval]);

  return { files, status, isLoading, error, refresh };
}
