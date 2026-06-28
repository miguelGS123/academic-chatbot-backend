import { env } from '@/config/env';

export const apiConfig = {
  baseUrl: env.apiBaseUrl.replace(/\/$/, ''),
  timeout: 15000,
} as const;

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith('/')
    ? path
    : `/${path}`;

  return `${apiConfig.baseUrl}${normalizedPath}`;
}