import { motion } from 'framer-motion';
import { AnalysisResult } from '../lib/TokenAnalyzer';

interface InsightsPanelProps {
  result: AnalysisResult;
  onExportCSV: () => void;
}

export function InsightsPanel({ result, onExportCSV }: InsightsPanelProps) {
  const efficiencyGain = result.jsonResult.tokenCount - result.mostEfficient.tokenCount;
  const efficiencyPercent = result.jsonResult.tokenCount > 0
    ? ((efficiencyGain / result.jsonResult.tokenCount) * 100).toFixed(1)
    : '0';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg p-6 border border-blue-200 dark:border-gray-700"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        💡 Insights
      </h2>

      <div className="space-y-4">
        {result.detectedFormat && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-gray-700">
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Detected Format
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Your input was detected as: <span className="font-bold text-blue-600 dark:text-blue-400">{result.detectedFormat}</span>
            </p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-gray-700">
          <div className="flex items-start">
            <span className="text-2xl mr-3">✅</span>
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Most Efficient Format
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-bold text-green-600 dark:text-green-400">
                  {result.mostEfficient.format}
                </span>{' '}
                uses{' '}
                <span className="font-bold text-green-600 dark:text-green-400">
                  {efficiencyPercent}%
                </span>{' '}
                fewer tokens than JSON ({efficiencyGain.toLocaleString()} tokens saved).
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Format Rankings
          </p>
          <div className="space-y-2">
            {result.results.slice(0, 3).map((item, idx) => (
              <div key={item.format} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center mr-2">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{item.format}</span>
                </div>
                <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                  {item.tokenCount.toLocaleString()} tokens
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onExportCSV}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
          >
            📥 Export CSV
          </button>
        </div>
      </div>
    </motion.div>
  );
}

