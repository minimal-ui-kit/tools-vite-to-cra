import fs from 'fs';
import path from 'path';

// ----------------------------------------------------------------------

export function getFile(filePath: string) {
  const _path = path.resolve(process.cwd(), filePath);

  const _content = fs.readFileSync(_path, 'utf-8');

  return {
    _path,
    _content,
  };
}
