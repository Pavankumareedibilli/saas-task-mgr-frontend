import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "../auth/LoginPage";
import { AppLayout } from "../layouts/AppLayout";
import { AcceptInvitePage } from "../organizations/AcceptInvitePage";
import { useState } from "react";
import { BoardList } from "../boards/BoardList";
import { CreateBoardModal } from "../boards/CreateBoardModal";
import { BoardDetailPage } from "../boards/BoardDetailPage";
import { usePermissions } from "../permissions/usePermissions";

function BoardCreateRetrieve() {
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const { canManageBoards } = usePermissions();

  return (
    <>
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Boards</h1>

        {canManageBoards && (
          <button
            onClick={() => setShowCreateBoard(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            + New Board
          </button>
        )}
      </div>

      <BoardList />

      {showCreateBoard && (
        <CreateBoardModal onClose={() => setShowCreateBoard(false)} />
      )}
    </>
  );
}

export function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          }
        />

        <Route path="/accept-invite" element={<AcceptInvitePage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout>
                <BoardCreateRetrieve />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="boards/:boardId"
          element={
            <ProtectedRoute>
              <AppLayout>
                <BoardDetailPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
