import { getFile } from './get-file';

import type { SourceType } from '../types';

// ----------------------------------------------------------------------

export function checkSource(): SourceType {
  const { content } = getFile('./package.json');

  const packageJSON = JSON.parse(content);

  const isMinimalUI = packageJSON.name.includes('@minimal');

  const isTypeScript =
    packageJSON.name.includes('-ts') || packageJSON.description.includes('TypeScript');

  const isStarterVersion =
    packageJSON.name.includes('starter') || packageJSON.description.includes('Starter');

  return {
    isTypeScript,
    isFullVersion: !isStarterVersion,
    kitName: isMinimalUI ? 'Minimal' : 'Zone',
  };
}
