import { useState, useEffect } from 'react';
import { useTokenStore } from '../store/useTokenStore';
import { motion } from 'framer-motion';
import { FormatPreviewTable } from './FormatPreviewTable';

export function InputArea() {
  const { input, setInput, history, result, setResult } = useTokenStore();
  const [localInput, setLocalInput] = useState(input);
  const [detectedFormat, setDetectedFormat] = useState<string>('Auto-detecting...');

  useEffect(() => {
    setLocalInput(input);
    detectFormat(input);
  }, [input]);

  const detectFormat = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      setDetectedFormat('Enter your prompt');
      return;
    }

    // Try to detect format
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        JSON.parse(trimmed);
        setDetectedFormat('JSON detected');
        return;
      } catch {}
    }

    if (trimmed.startsWith('<') && trimmed.includes('>')) {
      setDetectedFormat('XML detected');
      return;
    }

    if (trimmed.includes(':') && (trimmed.includes('\n') || trimmed.split(':').length > 1)) {
      if (trimmed.split('\n').some(line => line.includes(':') && !line.includes('http'))) {
        setDetectedFormat('YAML/TOML detected');
        return;
      }
    }

    setDetectedFormat('Plain text');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLocalInput(value);
    setInput(value);
    detectFormat(value);
  };

  const loadFromHistory = (item: typeof history[0]) => {
    setInput(item.input);
    setLocalInput(item.input);
    detectFormat(item.input);
  };

  const handleClear = () => {
    setInput('');
    setLocalInput('');
    setResult(null);
    setDetectedFormat('Auto-detecting...');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter Your Prompt
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Enter structured data (JSON, YAML, XML, etc.) or plain text. The system will auto-detect the format and convert it to all supported formats.
        </p>
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            {detectedFormat}
          </span>
          <button
            onClick={handleClear}
            className="px-3 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition-colors font-medium"
          >
            🗑️ Clear
          </button>
        </div>
        <textarea
          value={localInput}
          onChange={handleInputChange}
          placeholder=""
          className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {history.length > 0 && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Recent Prompts
          </label>
          <div className="flex flex-wrap gap-2">
            {history.slice(0, 5).map((item, idx) => (
              <button
                key={idx}
                onClick={() => loadFromHistory(item)}
                className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title={item.input}
              >
                {item.input.substring(0, 40)}...
              </button>
            ))}
          </div>
        </div>
      )}

      <FormatPreviewTable result={result} />
    </motion.div>
  );
}

