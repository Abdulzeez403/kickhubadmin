// src/types/auth.ts
export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage?: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}
