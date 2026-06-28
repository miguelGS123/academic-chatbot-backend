import { endpoints } from '@/config/endpoints';
import { apiClient } from '@/shared/services/api-client';

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

export async function loginWithCredentials(
  payload: LoginPayload,
): Promise<LoginResponse> {
  const formData = new URLSearchParams();

  formData.append('username', payload.email.trim().toLowerCase());
  formData.append('password', payload.password);

  const data = await apiClient.postForm<LoginResponse>(
    endpoints.auth.login,
    formData,
  );

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
  return apiClient.post<RegisterResponse>(endpoints.auth.register, {
    full_name: payload.fullName.trim(),
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
    career: payload.career,
    cycle: payload.cycle,
  });
}

export async function getCurrentUser(token: string): Promise<AuthUser> {
  return apiClient.get<AuthUser>(endpoints.auth.me, {
    token,
  });
}