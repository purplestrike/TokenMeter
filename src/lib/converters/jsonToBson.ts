// Simulated BSON - compact binary-like representation
export function jsonToBson(jsonObj: any): string {
  try {
    // Simulate BSON compactness by removing unnecessary whitespace
    // In real BSON, this would be binary, but we'll use a compact string representation
    return JSON.stringify(jsonObj).replace(/\s+/g, '');
  } catch (error) {
    throw new Error(`Failed to convert JSON to BSON: ${error}`);
  }
}

