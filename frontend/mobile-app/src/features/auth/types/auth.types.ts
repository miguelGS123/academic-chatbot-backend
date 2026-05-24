export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export type RegisterPayload = {
  full_name: string;
  email: string;
  password: string;
  career: string;
};

export type RegisterResponse = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  career: string | null;
  is_active: boolean;
};