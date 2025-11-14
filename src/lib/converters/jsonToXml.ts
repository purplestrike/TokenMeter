/**
 * Convert JSON object to clean XML string
 */
export function jsonToXml(jsonObj: any): string {
  try {
    // Determine the root element name
    const rootElementName = determineRootElementName(jsonObj);
    
    // Build XML manually for clean output
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    
    if (Array.isArray(jsonObj)) {
      xml += `<${rootElementName}>\n`;
      jsonObj.forEach((item) => {
        xml += '  <item>\n';
        xml += buildXmlElements(item, 2);
        xml += '  </item>\n';
      });
      xml += `</${rootElementName}>`;
    } else if (jsonObj && typeof jsonObj === 'object') {
      xml += `<${rootElementName}>\n`;
      xml += buildXmlElements(jsonObj, 1);
      xml += `</${rootElementName}>`;
    } else {
      xml += `<${rootElementName}>${escapeXml(String(jsonObj))}</${rootElementName}>`;
    }
    
    return xml;
  } catch (error) {
    throw new Error(`Failed to convert JSON to XML: ${error}`);
  }
}

/**
 * Build XML elements from an object recursively
 */
function buildXmlElements(obj: any, indentLevel: number): string {
  let xml = '';
  const indent = '  '.repeat(indentLevel);
  
  for (const [key, value] of Object.entries(obj)) {
    // Skip null/undefined values
    if (value === null || value === undefined) {
      continue;
    }
    
    // Sanitize key name for XML
    const elementName = sanitizeXmlName(key);
    
    if (Array.isArray(value)) {
      // Handle arrays
      value.forEach((item) => {
        if (typeof item === 'object' && item !== null) {
          xml += `${indent}<${elementName}>\n`;
          xml += buildXmlElements(item, indentLevel + 1);
          xml += `${indent}</${elementName}>\n`;
        } else {
          xml += `${indent}<${elementName}>${escapeXml(String(item))}</${elementName}>\n`;
        }
      });
    } else if (typeof value === 'object') {
      // Handle nested objects
      xml += `${indent}<${elementName}>\n`;
      xml += buildXmlElements(value, indentLevel + 1);
      xml += `${indent}</${elementName}>\n`;
    } else {
      // Handle primitive values
      xml += `${indent}<${elementName}>${escapeXml(String(value))}</${elementName}>\n`;
    }
  }
  
  return xml;
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Sanitize a string to be a valid XML element name
 */
function sanitizeXmlName(name: string): string {
  // XML element names must start with a letter or underscore
  // and can contain letters, digits, hyphens, underscores, and periods
  return name.replace(/[^a-zA-Z0-9_\-.]/g, '_').replace(/^[^a-zA-Z_]/, '_$&');
}

/**
 * Determine an appropriate root element name based on the object's keys
 */
function determineRootElementName(obj: any): string {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return 'root';
  }

  const keys = Object.keys(obj);
  
  // Common patterns for detecting entity types
  const patterns: { [key: string]: string } = {
    'Username': 'User',
    'Email': 'User',
    'Password': 'User',
    'FirstName': 'User',
    'LastName': 'User',
    'Name': 'User',
    'Age': 'User',
    'Bio': 'User',
    'Profile': 'Profile',
    'Title': 'Article',
    'Content': 'Article',
    'Author': 'Article',
    'ProductName': 'Product',
    'Price': 'Product',
    'Category': 'Product',
    'OrderId': 'Order',
    'Customer': 'Order',
    'Items': 'Order',
  };

  // Check if any key matches a pattern
  for (const key of keys) {
    if (patterns[key]) {
      return patterns[key];
    }
  }

  // If we have common user fields, use "User"
  const userFields = ['Username', 'Email', 'Password', 'FirstName', 'LastName', 'Name', 'Age', 'Bio'];
  if (keys.some(key => userFields.includes(key))) {
    return 'User';
  }

  // If we have common product fields, use "Product"
  const productFields = ['ProductName', 'Price', 'Category', 'Description'];
  if (keys.some(key => productFields.includes(key))) {
    return 'Product';
  }

  // If we have common order fields, use "Order"
  const orderFields = ['OrderId', 'Customer', 'Items', 'Total'];
  if (keys.some(key => orderFields.includes(key))) {
    return 'Order';
  }

  // Try to infer from the first key (singularize if plural)
  if (keys.length > 0) {
    const firstKey = keys[0];
    // If the key ends with 's' and is plural, use singular form
    if (firstKey.endsWith('s') && firstKey.length > 1) {
      const singular = firstKey.slice(0, -1);
      if (/^[A-Z][a-zA-Z0-9]*$/.test(singular)) {
        return singular;
      }
    }
    // Capitalize first letter if it's lowercase
    if (/^[a-z]/.test(firstKey)) {
      return firstKey.charAt(0).toUpperCase() + firstKey.slice(1);
    }
  }

  // Default fallback
  return 'root';
}

