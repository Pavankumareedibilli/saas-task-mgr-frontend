import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { acceptInvite } from "./api";
import { useAuth } from "../auth/useAuth";
import { useOrganization } from "./useOrganization";

export function AcceptInvitePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { reloadOrganizations } = useOrganization();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    const inviteToken = token;
    async function accept() {
      try {
        if (!isAuthenticated) {
          navigate(`/login?invite_token=${inviteToken}`, { replace: true });
          return;
        }
        await acceptInvite(inviteToken);
        await reloadOrganizations();
        navigate("/", { replace: true });
        setStatus("success");
      } catch(err) {
        console.error(err);
        setStatus("error");
        return;
      }
      if (isAuthenticated) {
        try {
          useEffect(() => {
            reloadOrganizations();
          }, []);
        } catch (err) {
          console.error("Invite accepted but org reload failed", err);
        }
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }

    accept();
  }, [searchParams, navigate, isAuthenticated]);

  if (status === "loading") {
    return <div className="p-10">Accepting invite...</div>;
  }

  if (status === "error") {
    return <div className="p-10 text-red-600">Invalid or expired invite</div>;
  }

  return null;
}
