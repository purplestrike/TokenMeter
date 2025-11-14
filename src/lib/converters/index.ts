import { jsonToYaml } from './jsonToYaml';
import { jsonToXml } from './jsonToXml';
import { jsonToToon } from './jsonToToon';
import { jsonToToml } from './jsonToToml';
import { jsonToBson } from './jsonToBson';
import { jsonToMessagePack } from './jsonToMessagePack';
import { jsonToAvro } from './jsonToAvro';
import { jsonToCbor } from './jsonToCbor';
import { jsonToProtobuf } from './jsonToProtobuf';

export interface FormatConverter {
  name: string;
  convert: (jsonObj: any) => string;
}

export const converters: FormatConverter[] = [
  { name: 'JSON', convert: (obj) => JSON.stringify(obj, null, 2) },
  { name: 'TOON', convert: jsonToToon },
  { name: 'YAML', convert: jsonToYaml },
  { name: 'XML', convert: jsonToXml },
  { name: 'TOML', convert: jsonToToml },
  { name: 'BSON', convert: jsonToBson },
  { name: 'MessagePack', convert: jsonToMessagePack },
  { name: 'Avro', convert: jsonToAvro },
  { name: 'CBOR', convert: jsonToCbor },
  { name: 'Protobuf', convert: jsonToProtobuf },
];

