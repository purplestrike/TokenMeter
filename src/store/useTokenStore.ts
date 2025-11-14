import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AnalysisResult } from '../lib/TokenAnalyzer';

interface TokenStore {
  input: string;
  result: AnalysisResult | null;
  isDarkMode: boolean;
  history: Array<{ input: string; format: string; timestamp: number }>;
  
  setInput: (input: string) => void;
  setResult: (result: AnalysisResult | null) => void;
  toggleDarkMode: () => void;
  addToHistory: (input: string, format: string) => void;
  clearHistory: () => void;
}

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      input: '{"name": "Alice", "message": "Hello, world!"}',
      result: null,
      isDarkMode: false,
      history: [],

      setInput: (input) => set({ input }),
      setResult: (result) => set({ result }),
      
      toggleDarkMode: () => set((state) => {
        const newMode = !state.isDarkMode;
        document.documentElement.classList.toggle('dark', newMode);
        return { isDarkMode: newMode };
      }),
      
      addToHistory: (input, format) => set((state) => ({
        history: [
          { input, format, timestamp: Date.now() },
          ...state.history.filter(h => h.input !== input || h.format !== format).slice(0, 9)
        ],
      })),
      
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'tokenmeter-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        input: state.input,
        isDarkMode: state.isDarkMode,
        history: state.history,
      }),
    }
  )
);

