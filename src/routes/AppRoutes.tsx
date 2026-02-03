import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "../auth/LoginPage";
import { AppLayout } from "../layouts/AppLayout";
import { AcceptInvitePage } from "../organizations/AcceptInvitePage";

export function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
        />

        <Route path="/accept-invite" element={<AcceptInvitePage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout>
                <div>App content goes here</div>
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
