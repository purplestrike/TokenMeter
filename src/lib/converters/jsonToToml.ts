import * as TOML from '@iarna/toml';

export function jsonToToml(jsonObj: any): string {
  try {
    return TOML.stringify(jsonObj);
  } catch (error) {
    throw new Error(`Failed to convert JSON to TOML: ${error}`);
  }
}

