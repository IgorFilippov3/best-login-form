import type { User } from "./user";

export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  data: {
    user: User;
  };
}
