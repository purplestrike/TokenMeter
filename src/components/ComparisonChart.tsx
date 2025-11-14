import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { AnalysisResult } from '../lib/TokenAnalyzer';

interface ComparisonChartProps {
  result: AnalysisResult;
}

export function ComparisonChart({ result }: ComparisonChartProps) {
  const chartData = result.results.map((item) => ({
    format: item.format,
    tokens: item.tokenCount,
    diff: item.diffPercent,
  }));

  const getBarColor = (format: string) => {
    if (format === result.mostEfficient.format) {
      return '#10b981'; // green-500
    }
    if (format === 'JSON') {
      return '#3b82f6'; // blue-500
    }
    return '#6b7280'; // gray-500
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-gray-900 dark:text-gray-100">{data.format}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tokens: <span className="font-mono font-bold">{data.tokens.toLocaleString()}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Diff: <span className={data.diff < 0 ? 'text-green-600' : data.diff > 0 ? 'text-red-600' : ''}>
              {data.diff > 0 ? '+' : ''}{data.diff.toFixed(1)}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Token Usage Comparison
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
          <XAxis
            dataKey="format"
            stroke="#6b7280"
            className="dark:stroke-gray-400"
            tick={{ fill: '#6b7280' }}
          />
          <YAxis
            stroke="#6b7280"
            className="dark:stroke-gray-400"
            tick={{ fill: '#6b7280' }}
            label={{ value: 'Tokens', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="tokens" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.format)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

