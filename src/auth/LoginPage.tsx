import { useState } from "react";
import { useAuth } from "./useAuth";

export function LoginPage() {
  const { login } = useAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await login(usernameOrEmail, password);
    } catch {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-80 p-6 border rounded space-y-4"
      >
        <h1 className="text-xl font-bold">Login</h1>

        {error && <p className="text-red-600">{error}</p>}

        <input
          className="w-full border p-2"
          placeholder="Email or username"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
        />

        <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2">
          Login
        </button>
      </form>
    </div>
  );
}
