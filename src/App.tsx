import { useState, useEffect } from 'react';
import { useTokenStore } from './store/useTokenStore';
import { TokenAnalyzer } from './lib/TokenAnalyzer';
import { InputArea } from './components/InputArea';
import { TokenResults } from './components/TokenResults';
import { ComparisonChart } from './components/ComparisonChart';
import { InsightsPanel } from './components/InsightsPanel';
import { PromptTemplates } from './components/PromptTemplates';
import { motion } from 'framer-motion';

function App() {
  const { input, result, setResult, addToHistory, isDarkMode, toggleDarkMode } = useTokenStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzer] = useState(() => new TokenAnalyzer());

  // Cleanup analyzer on unmount
  useEffect(() => {
    return () => {
      analyzer.dispose();
    };
  }, [analyzer]);

  useEffect(() => {
    // Apply dark mode on mount
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleCalculate = () => {
    if (!input.trim()) {
      setError('Please enter a prompt to analyze');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const analysisResult = analyzer.analyze(input);
      setResult(analysisResult);
      addToHistory(input, analysisResult.detectedFormat || 'Unknown');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze tokens');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (!result) return;

    const csvRows = [
      ['Format', 'Tokens', 'Diff vs JSON (%)'],
      ...result.results.map((r) => [
        r.format,
        r.tokenCount.toString(),
        r.diffPercent.toFixed(2),
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tokenmeter-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 relative overflow-visible">
        <img 
          src="/logo.png" 
          alt="TokenMeter Logo" 
          className="fixed left-0 top-0 h-32 w-32 object-contain z-50"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center relative">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                🧩 TokenMeter
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Measure what matters — every token counts.
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="absolute right-0 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <PromptTemplates />
          <InputArea />

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCalculate}
              disabled={isLoading}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold text-lg shadow-lg transition-colors disabled:cursor-not-allowed"
            >
              {isLoading ? 'Calculating...' : 'Calculate Tokens'}
            </motion.button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
            >
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </motion.div>
          )}

          {result && (
            <>
              <TokenResults result={result} />
              <ComparisonChart result={result} />
              <InsightsPanel result={result} onExportCSV={handleExportCSV} />
            </>
          )}

          {!result && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500 dark:text-gray-400"
            >
              <p className="text-lg">Enter your data above and click "Calculate Tokens" to get started.</p>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>TokenMeter — Client-side token counting and format efficiency analysis</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

