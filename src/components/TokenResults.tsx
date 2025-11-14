import { motion } from 'framer-motion';
import { AnalysisResult } from '../lib/TokenAnalyzer';

interface TokenResultsProps {
  result: AnalysisResult;
}

export function TokenResults({ result }: TokenResultsProps) {
  const formatDiffColor = (diff: number) => {
    if (diff < 0) return 'text-green-600 dark:text-green-400';
    if (diff > 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const formatDiffSign = (diff: number) => {
    if (diff > 0) return '+';
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Token Comparison Results
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Format
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Tokens
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Diff vs JSON
              </th>
            </tr>
          </thead>
          <tbody>
            {result.results.map((item, idx) => (
              <motion.tr
                key={item.format}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  item.format === result.mostEfficient.format
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : ''
                }`}
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
                <td className="py-3 px-4 text-right font-mono text-gray-900 dark:text-gray-100">
                  {item.tokenCount.toLocaleString()}
                </td>
                <td className={`py-3 px-4 text-right font-medium ${formatDiffColor(item.diffPercent)}`}>
                  {formatDiffSign(item.diffPercent)}{item.diffPercent.toFixed(1)}%
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">Input Tokens</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {result.inputTokens.toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Tokens (All Formats)</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {result.totalTokens.toLocaleString()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

