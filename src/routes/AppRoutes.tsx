import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { ProtectedRoute }  from "./ProtectedRoute";
import { LoginPage } from "../auth/LoginPage"

export function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" /> : <LoginPage />
          }
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="p-10">Protected App Area</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
