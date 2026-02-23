import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { acceptInvite } from "./api";
import { useAuth } from "../auth/useAuth";
import { useOrganization } from "./useOrganization";
import { PageContainer } from "../layout/PageContainer";

export function AcceptInvitePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { reloadOrganizations } = useOrganization();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  const token = searchParams.get("token");

  if (!isAuthenticated && token) {
    localStorage.setItem("pending_invite_token", token);
    navigate("/login");
    return null;
  }

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    if (!isAuthenticated) {
      navigate(`/login?redirect=/accept-invite?token=${token}`);
      return;
    }

    async function handleAccept(inviteToken: string) {
      try {
        await acceptInvite(inviteToken);
        await reloadOrganizations();
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }

    handleAccept(token);
  }, [searchParams, isAuthenticated, navigate, reloadOrganizations]);

  return (
    <PageContainer>
      <div className="max-w-md mx-auto mt-20 bg-white border rounded-lg p-8 text-center">
        {status === "loading" && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Accepting Invitation...
            </h2>
            <p className="text-sm text-gray-500">
              Please wait while we add you to the organization.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-lg font-semibold mb-4 text-green-600">
              Invitation Accepted 🎉
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              You have been added to the organization.
            </p>

            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Go to Dashboard
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-lg font-semibold mb-4 text-red-600">
              Invalid or Expired Invitation
            </h2>
            <p className="text-sm text-gray-600">
              This invitation link is no longer valid.
            </p>
          </>
        )}
      </div>
    </PageContainer>
  );
}
