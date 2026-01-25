// src/auth/api.ts
import { http } from "../api/http";
import type { LoginResponse, RegisterPayload, User } from "../types/auth";


export async function login(
  username_or_email: string,
  password: string
): Promise<LoginResponse> {
  const response = await http.post<LoginResponse>("/auth/token/", {
    username:username_or_email, 
    password,
  });

  return response.data;
}




export async function register(payload: RegisterPayload): Promise<void> {
  await http.post("/auth/register/", payload);
}

export async function getCurrentUser(): Promise<User> {
  const response = await http.get<User>("/auth/accounts/me/");
  return response.data;
}
