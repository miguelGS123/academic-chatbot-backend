import { buildApiUrl } from '@/config/api';

type RequestOptions = {
  token?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

async function parseErrorResponse(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return 'Unknown error';
  }
}

async function request<T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  options: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...options.headers,
  };

  let body: BodyInit | undefined;

  if (options.body instanceof URLSearchParams) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    body = options.body.toString();
  } else if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(options.body);
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token.trim()}`;
  }

  const response = await fetch(buildApiUrl(path), {
    method,
    headers,
    body,
  });

  if (!response.ok) {
    const errorText = await parseErrorResponse(response);

    console.error('API error:', {
      path,
      status: response.status,
      body: errorText,
    });

    throw new Error('No se pudo completar la solicitud.');
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, 'GET', options),

  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, 'POST', {
      ...options,
      body,
    }),

  postForm: <T>(
    path: string,
    formData: URLSearchParams,
    options?: RequestOptions,
  ) =>
    request<T>(path, 'POST', {
      ...options,
      body: formData,
    }),
};