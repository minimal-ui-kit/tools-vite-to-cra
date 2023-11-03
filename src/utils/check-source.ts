import { getFile } from './get-file';

// ----------------------------------------------------------------------

type ReturnType = {
  isTypeScript: boolean;
  isFullVersion: boolean;
  kitName: 'Minimal' | 'Zone';
};

export function checkSource(): ReturnType {
  const { _content } = getFile('./package.json');

  const packageJSON = JSON.parse(_content);

  const isMinimalUI = packageJSON.name.includes('@minimal');

  const isTypeScript =
    packageJSON.name.includes('-ts') || packageJSON.description.includes('TypeScript');

  const isStarterVersion =
    packageJSON.name.includes('starter') || packageJSON.description.includes('Starter');

  return {
    kitName: isMinimalUI ? 'Minimal' : 'Zone',
    isTypeScript,
    isFullVersion: !isStarterVersion,
  };
}
