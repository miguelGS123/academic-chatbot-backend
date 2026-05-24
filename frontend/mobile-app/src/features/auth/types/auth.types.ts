export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  career: string;
  cycle: number;
};

export type RegisterResponse = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  career: string | null;
  cycle: number | null;
  is_active: boolean;
};

export type AuthUser = {
  id: number;
  full_name: string;
  email: string;
  university: string | null;
  role: string;
  career: string | null;
  cycle: number | null;
  is_active: boolean;
};