import { env } from '@/config/env';
import type {
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/features/auth/types/auth.types';

type LoginPayload = {
  email: string;
  password: string;
};

export async function loginWithCredentials(
  payload: LoginPayload,
): Promise<LoginResponse> {
  const formData = new URLSearchParams();

  formData.append('username', payload.email);
  formData.append('password', payload.password);

  const response = await fetch(
    `${env.apiBaseUrl}/api/v1/users/users/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error('Login error:', errorText);

    throw new Error('Credenciales inválidas.');
  }

  return response.json() as Promise<LoginResponse>;
}

export async function registerUser(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const response = await fetch(
    `${env.apiBaseUrl}/api/v1/users/users/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error('Register error:', errorText);

    throw new Error('No se pudo registrar el usuario.');
  }

  return response.json() as Promise<RegisterResponse>;
}