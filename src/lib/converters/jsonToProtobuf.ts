// Simulated Protocol Buffers (Protobuf)
// Protobuf is binary, but we simulate with a compact text representation
export function jsonToProtobuf(jsonObj: any): string {
  try {
    // Protobuf uses field numbers and compact encoding
    // For token counting purposes, we create a compact text representation
    // that simulates the efficiency of protobuf encoding
    
    // Convert to a compact representation similar to protobuf text format
    // but optimized for minimal token usage
    function toProtobufText(obj: any, indent: number = 0): string {
      const lines: string[] = [];
      
      if (Array.isArray(obj)) {
        // Arrays in protobuf are repeated fields
        return obj.map(item => toProtobufText(item, indent)).join(' ');
      } else if (obj !== null && typeof obj === 'object') {
        // Objects become message fields
        const entries = Object.entries(obj);
        for (let i = 0; i < entries.length; i++) {
          const [key, value] = entries[i];
          const fieldName = key.replace(/([A-Z])/g, '_$1').toLowerCase();
          
          if (value === null || value === undefined) {
            continue;
          } else if (typeof value === 'object' && !Array.isArray(value)) {
            lines.push(`${fieldName} { ${toProtobufText(value, 0)} }`);
          } else if (Array.isArray(value)) {
            value.forEach(v => {
              if (typeof v === 'object' && v !== null) {
                lines.push(`${fieldName} { ${toProtobufText(v, 0)} }`);
              } else {
                lines.push(`${fieldName}: ${String(v)}`);
              }
            });
          } else {
            lines.push(`${fieldName}: ${String(value)}`);
          }
        }
        return lines.join(' ');
      } else {
        return String(obj);
      }
    }
    
    // Create compact protobuf-like representation
    const protobufText = toProtobufText(jsonObj);
    
    // Further compact by removing unnecessary spaces while preserving structure
    return protobufText.replace(/\s+/g, ' ').trim();
  } catch (error) {
    throw new Error(`Failed to convert JSON to Protobuf: ${error}`);
  }
}

