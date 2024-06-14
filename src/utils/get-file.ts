import fs from 'fs';
import nodePath from 'path';

// ----------------------------------------------------------------------

function resolvePath(filePath: string) {
  return nodePath.resolve(process.cwd(), filePath);
}

// ----------------------------------------------------------------------

export function getFile(filePath: string) {
  const path = resolvePath(filePath);
  const content = fs.readFileSync(path, 'utf-8');

  return { path, content };
}

// ----------------------------------------------------------------------

export function fileExists(filePath: string) {
  const path = resolvePath(filePath);
  const isFileExists = fs.existsSync(path);

  return isFileExists;
}
