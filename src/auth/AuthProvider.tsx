import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { login as loginApi, getCurrentUser } from "./api";
import { setTokens, clearTokens, getAccessToken } from "./token";
import type { User } from "../types/auth";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function login(username_or_email: string, password: string) {
    const tokens = await loginApi(username_or_email, password);
    setTokens(tokens.access, tokens.refresh);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  }

  function logout() {
    clearTokens();
    setUser(null);
  }

  useEffect(() => {
    async function loadUser() {
      const token = getAccessToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
