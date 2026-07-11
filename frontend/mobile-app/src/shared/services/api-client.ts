import { buildApiUrl } from '@/config/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions = {
  token?: string | null;
  body?: unknown;
  headers?: Record<string, string>;
};

type UnauthorizedHandler = () => void | Promise<void>;

let currentAccessToken: string | null = null;
let unauthorizedHandler: UnauthorizedHandler | null = null;

export class ApiError extends Error {
  readonly status: number;
  readonly responseBody: string;

  constructor(
    message: string,
    status: number,
    responseBody: string,
  ) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
    this.responseBody = responseBody;
  }
}

export function setApiAccessToken(token: string | null): void {
  currentAccessToken = token?.trim() || null;
}

export function setApiUnauthorizedHandler(
  handler: UnauthorizedHandler | null,
): void {
  unauthorizedHandler = handler;
}

async function parseErrorResponse(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return 'Unknown error';
  }
}

async function request<T>(
  path: string,
  method: HttpMethod,
  options: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...options.headers,
  };

  let body: BodyInit | undefined;

  if (options.body instanceof URLSearchParams) {
    headers['Content-Type'] =
      'application/x-www-form-urlencoded';

    body = options.body.toString();
  } else if (options.body !== undefined) {
    headers['Content-Type'] =
      'application/json; charset=utf-8';

    body = JSON.stringify(options.body);
  }

  const resolvedToken =
    options.token === undefined
      ? currentAccessToken
      : options.token?.trim() || null;

  if (resolvedToken) {
    headers.Authorization = `Bearer ${resolvedToken}`;
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

    if (
      response.status === 401 &&
      resolvedToken &&
      unauthorizedHandler
    ) {
      await unauthorizedHandler();
    }

    throw new ApiError(
      resolveErrorMessage(response.status),
      response.status,
      errorText,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

function resolveErrorMessage(status: number): string {
  if (status === 400) {
    return 'La solicitud contiene datos inválidos.';
  }

  if (status === 401) {
    return 'Tu sesión expiró. Inicia sesión nuevamente.';
  }

  if (status === 403) {
    return 'No tienes permiso para realizar esta acción.';
  }

  if (status === 404) {
    return 'No se encontró la información solicitada.';
  }

  if (status === 409) {
    return 'La operación no pudo completarse por un conflicto.';
  }

  if (status === 422) {
    return 'Algunos datos enviados no son válidos.';
  }

  if (status >= 500) {
    return 'El servidor no pudo procesar la solicitud.';
  }

  return 'No se pudo completar la solicitud.';
}

export const apiClient = {
  get: <T>(
    path: string,
    options?: RequestOptions,
  ): Promise<T> =>
    request<T>(path, 'GET', options),

  post: <T>(
    path: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> =>
    request<T>(path, 'POST', {
      ...options,
      body,
    }),

  put: <T>(
    path: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> =>
    request<T>(path, 'PUT', {
      ...options,
      body,
    }),

  patch: <T>(
    path: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> =>
    request<T>(path, 'PATCH', {
      ...options,
      body,
    }),

  delete: <T>(
    path: string,
    options?: RequestOptions,
  ): Promise<T> =>
    request<T>(path, 'DELETE', options),

  postForm: <T>(
    path: string,
    formData: URLSearchParams,
    options?: RequestOptions,
  ): Promise<T> =>
    request<T>(path, 'POST', {
      ...options,
      body: formData,
    }),
};