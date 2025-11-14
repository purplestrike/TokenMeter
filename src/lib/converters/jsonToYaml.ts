import yaml from 'js-yaml';

export function jsonToYaml(jsonObj: any): string {
  try {
    return yaml.dump(jsonObj, { 
      indent: 2,
      lineWidth: -1,
      noRefs: true 
    });
  } catch (error) {
    throw new Error(`Failed to convert JSON to YAML: ${error}`);
  }
}

