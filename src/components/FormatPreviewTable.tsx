import { motion } from 'framer-motion';
import { AnalysisResult } from '../lib/TokenAnalyzer';
import { useState } from 'react';

interface FormatPreviewTableProps {
  result: AnalysisResult | null;
}

export function FormatPreviewTable({ result }: FormatPreviewTableProps) {
  const [expandedFormat, setExpandedFormat] = useState<string | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!result) {
    return null;
  }

  const handleCopy = (content: string, format: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const toggleExpand = (format: string) => {
    setExpandedFormat(expandedFormat === format ? null : format);
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Converted Format Syntax
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        View how your prompt appears in each serialization format:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Format
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Syntax Preview
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Tokens
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {result.results.map((item, idx) => {
              const isExpanded = expandedFormat === item.format;
              const displayContent = isExpanded 
                ? item.content 
                : truncateContent(item.content, 150);

              return (
                <motion.tr
                  key={item.format}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {item.format}
                    </span>
                    {item.format === result.mostEfficient.format && (
                      <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
                        Most Efficient
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="max-w-2xl">
                      <pre className="text-xs font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre-wrap break-words">
                        {displayContent}
                      </pre>
                      {item.content.length > 150 && (
                        <button
                          onClick={() => toggleExpand(item.format)}
                          className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono text-sm text-gray-900 dark:text-gray-100">
                      {item.tokenCount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleCopy(item.content, item.format)}
                      className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedFormat === item.format ? '✓ Copied' : '📋 Copy'}
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

