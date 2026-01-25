
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  password2: string;
}
