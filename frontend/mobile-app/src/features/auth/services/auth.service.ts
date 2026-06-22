import { env } from '@/config/env';

import type {
  AuthUser,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/features/auth/types/auth.types';

type LoginPayload = {
  email: string;
  password: string;
};

async function parseErrorResponse(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return 'Unknown error';
  }
}

export async function loginWithCredentials(
  payload: LoginPayload,
): Promise<LoginResponse> {
  const formData = new URLSearchParams();

  formData.append('username', payload.email.trim().toLowerCase());
  formData.append('password', payload.password);

  const response = await fetch(`${env.apiBaseUrl}/api/v1/users/users/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  if (!response.ok) {
    const errorText = await parseErrorResponse(response);

    console.error('Login error:', errorText);

    throw new Error('Credenciales inválidas.');
  }

  const data = (await response.json()) as LoginResponse;

  if (!data.access_token) {
    throw new Error('El backend no devolvió access_token.');
  }

  return {
    access_token: data.access_token.trim(),
    token_type: data.token_type,
  };
}

export async function registerUser(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const response = await fetch(`${env.apiBaseUrl}/api/v1/users/users/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      full_name: payload.fullName.trim(),
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
      career: payload.career,
      cycle: payload.cycle,
    }),
  });

  if (!response.ok) {
    const errorText = await parseErrorResponse(response);

    console.error('Register error:', errorText);

    throw new Error('No se pudo crear la cuenta.');
  }

  return response.json() as Promise<RegisterResponse>;
}

export async function getCurrentUser(token: string): Promise<AuthUser> {
  const cleanToken = token.trim();

  const response = await fetch(`${env.apiBaseUrl}/api/v1/users/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${cleanToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await parseErrorResponse(response);

    console.error('Get current user error:', errorText);

    throw new Error('No se pudo obtener el usuario autenticado.');
  }

  return response.json() as Promise<AuthUser>;
}