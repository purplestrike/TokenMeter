// Simulated MessagePack - compact representation
export function jsonToMessagePack(jsonObj: any): string {
  try {
    // MessagePack is binary, but we simulate compactness
    // Remove all unnecessary whitespace and use short keys
    return JSON.stringify(jsonObj, null, 0).replace(/\s+/g, '');
  } catch (error) {
    throw new Error(`Failed to convert JSON to MessagePack: ${error}`);
  }
}

