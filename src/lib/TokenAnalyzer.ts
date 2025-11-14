import { encodingForModel } from 'js-tiktoken';
import { converters } from './converters';
import yaml from 'js-yaml';
import * as xmljs from 'xml-js';
import { parse as parseToml } from 'toml';

export interface TokenResult {
  format: string;
  tokenCount: number;
  diffPercent: number;
  content: string;
}

export interface AnalysisResult {
  results: TokenResult[];
  mostEfficient: TokenResult;
  jsonResult: TokenResult;
  inputTokens: number;
  totalTokens: number;
  detectedFormat?: string;
}

export class TokenAnalyzer {
  private encoder: any;

  constructor() {
    // Use cl100k_base encoding (GPT-4, GPT-3.5-turbo)
    try {
      this.encoder = encodingForModel('gpt-4');
    } catch (error) {
      // Fallback to cl100k_base if model not found
      try {
        this.encoder = encodingForModel('gpt-3.5-turbo');
      } catch {
        console.warn('Failed to initialize tokenizer, using fallback');
        this.encoder = null;
      }
    }
  }

  /**
   * Auto-detect and parse input string
   */
  parseInput(input: string): { data: any; detectedFormat: string } {
    const trimmed = input.trim();
    
    if (!trimmed) {
      throw new Error('Input is empty');
    }

    // Try JSON first (most common)
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        return { data: parsed, detectedFormat: 'JSON' };
      } catch {}
    }

    // Try YAML
    try {
      const parsed = yaml.load(trimmed);
      if (parsed && typeof parsed === 'object') {
        return { data: parsed, detectedFormat: 'YAML' };
      }
    } catch {}

    // Try XML
    if (trimmed.startsWith('<')) {
      try {
        const parsed = xmljs.xml2js(trimmed, { compact: true });
        if (parsed) {
          return { data: parsed, detectedFormat: 'XML' };
        }
      } catch {}
    }

    // Try TOML
    try {
      const parsed = parseToml(trimmed);
      if (parsed && typeof parsed === 'object') {
        return { data: parsed, detectedFormat: 'TOML' };
      }
    } catch {}

    // Try key-value pairs (e.g., "Key: Value" format)
    try {
      const parsed = this.parseKeyValuePairs(trimmed);
      if (parsed && Object.keys(parsed).length > 0) {
        return { data: parsed, detectedFormat: 'Key-Value Pairs' };
      }
    } catch {}

    // If all parsing fails, treat as unknown format and wrap in an object
    return { 
      data: { content: trimmed }, 
      detectedFormat: 'Unknown' 
    };
  }

  private parseKeyValuePairs(text: string): any {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const result: any = {};
    
    for (const line of lines) {
      // Match "Key: Value" pattern
      const match = line.match(/^([^:]+):\s*(.+)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        result[key] = value;
      }
    }
    
    return Object.keys(result).length > 0 ? result : null;
  }


  /**
   * Count tokens in a string using tiktoken (cl100k_base encoding)
   */
  countTokens(text: string): number {
    try {
      if (this.encoder) {
        const tokens = this.encoder.encode(text);
        return tokens.length;
      } else {
        // Fallback: approximate token count (roughly 4 chars per token)
        return Math.ceil(text.length / 4);
      }
    } catch (error) {
      console.warn('Token counting error:', error);
      // Fallback: approximate token count (roughly 4 chars per token)
      return Math.ceil(text.length / 4);
    }
  }

  /**
   * Clean up encoder when done
   */
  dispose() {
    if (this.encoder && typeof this.encoder.free === 'function') {
      this.encoder.free();
    }
  }

  /**
   * Analyze token usage across all formats
   */
  analyze(input: string): AnalysisResult {
    try {
      // Auto-detect and parse input to JavaScript object
      const { data: parsedObj, detectedFormat } = this.parseInput(input);
      
      // Convert to all formats
      const results: TokenResult[] = [];
      
      for (const converter of converters) {
        try {
          const converted = converter.convert(parsedObj);
          const tokenCount = this.countTokens(converted);
          results.push({
            format: converter.name,
            tokenCount,
            diffPercent: 0, // Will calculate after
            content: converted,
          });
        } catch (error) {
          console.warn(`Failed to convert to ${converter.name}:`, error);
        }
      }

      // Find JSON result for comparison
      const jsonResult = results.find(r => r.format === 'JSON') || results[0];
      
      // Calculate percentage differences vs JSON
      results.forEach(result => {
        result.diffPercent = jsonResult.tokenCount > 0
          ? ((result.tokenCount - jsonResult.tokenCount) / jsonResult.tokenCount) * 100
          : 0;
      });

      // Sort by token count (most efficient first)
      results.sort((a, b) => a.tokenCount - b.tokenCount);
      
      const mostEfficient = results[0];
      const inputTokens = this.countTokens(input);
      const totalTokens = results.reduce((sum, r) => sum + r.tokenCount, 0);

      return {
        results,
        mostEfficient,
        jsonResult,
        inputTokens,
        totalTokens,
        detectedFormat, // Add detected format to result
      };
    } catch (error) {
      throw new Error(`Analysis failed: ${error}`);
    }
  }

}

