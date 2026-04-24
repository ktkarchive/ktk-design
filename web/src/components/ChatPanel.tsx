import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import { StatusInfo } from '../lib/fileSystem';

interface Message {
  id: string;
  role: 'user' | 'system';
  content: string;
  timestamp: number;
}

interface ChatPanelProps {
  status: StatusInfo | null;
}

export default function ChatPanel({ status }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (status?.message) {
      const systemMessage: Message = {
        id: `status-${status.timestamp}`,
        role: 'system',
        content: status.message,
        timestamp: status.timestamp,
      };
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== systemMessage.id);
        return [...filtered, systemMessage];
      });
    }
  }, [status]);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      const timestamp = Date.now();
      const filename = `${timestamp}.md`;
      const path = `../communication/input/${filename}`;

      const response = await fetch('/api/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, content: input.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Failed to write file: ${response.statusText}`);
      }

      const successMessage: Message = {
        id: `success-${timestamp}`,
        role: 'system',
        content: '프롬프트가 Kimi CLI로 전송되었습니다. 처리 중...',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, successMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'system',
        content: `오류: ${err instanceof Error ? err.message : '전송 실패'}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAutoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    handleAutoResize();
  }, [input]);

  const getStatusColor = () => {
    switch (status?.status) {
      case 'processing':
        return 'bg-accent-500';
      case 'done':
        return 'bg-emerald-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-navy-300';
    }
  };

  const getStatusLabel = () => {
    switch (status?.status) {
      case 'processing':
        return '처리 중';
      case 'done':
        return '완료';
      case 'error':
        return '오류';
      default:
        return '대기';
    }
  };

  return (
    <div className="panel h-full">
      <div className="px-5 py-4 border-b border-navy-100 flex items-center justify-between">
        <h2 className="text-xl font-serif text-navy-800">채팅</h2>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
          <span className="text-xs text-navy-500 font-medium">{getStatusLabel()}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12 text-navy-400">
            <p className="font-serif text-lg mb-2">KTK Design 워크벤치</p>
            <p className="text-sm">
              프롬프트를 입력하면 Kimi CLI로 전송되어<br />
              HTML 디자인 아티팩트가 생성됩니다.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[85%] px-4 py-3 rounded-lg text-sm leading-relaxed
                ${message.role === 'user'
                  ? 'bg-navy-800 text-white'
                  : 'bg-navy-50 text-navy-700 border border-navy-100'
                }
              `}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="px-5 py-4 border-t border-navy-100">
        <div className="flex gap-3 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="프롬프트를 입력하세요..."
            rows={1}
            className="
              flex-1 resize-none px-4 py-3 rounded-lg
              bg-navy-50 border border-navy-200
              text-sm text-navy-800 placeholder-navy-400
              focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent
              transition-shadow
            "
          />
          <button
            type="button"
            disabled={!input.trim() || isSending}
            className="
              px-5 py-3 rounded-lg bg-accent-500 text-white text-sm font-medium
              hover:bg-accent-600 active:bg-accent-700
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors duration-150
              shrink-0
            "
          >
            {isSending ? '전송 중...' : '전송'}
          </button>
        </div>
        <p className="mt-2 text-xs text-navy-400">
          Shift + Enter로 줄바꿈, Enter로 전송
        </p>
      </form>
    </div>
  );
}
