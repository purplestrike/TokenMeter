// TOON (Token-Oriented Object Notation) - minimal syntax
export function jsonToToon(jsonObj: any): string {
  try {
    return toonStringify(jsonObj);
  } catch (error) {
    throw new Error(`Failed to convert JSON to TOON: ${error}`);
  }
}

function toonStringify(obj: any, indent = 0): string {
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  
  const type = typeof obj;
  
  if (type === 'string') {
    // Minimal quoting - only if needed
    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(obj)) {
      return obj;
    }
    return `"${obj.replace(/"/g, '\\"')}"`;
  }
  
  if (type === 'number' || type === 'boolean') {
    return String(obj);
  }
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const items = obj.map(item => toonStringify(item, indent + 1));
    return `[${items.join(',')}]`;
  }
  
  if (type === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    
    const pairs = keys.map(key => {
      const value = toonStringify(obj[key], indent + 1);
      const keyStr = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key) ? key : `"${key}"`;
      return `${keyStr}:${value}`;
    });
    
    return `{${pairs.join(',')}}`;
  }
  
  return String(obj);
}

