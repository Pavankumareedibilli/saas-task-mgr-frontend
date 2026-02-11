import { OrganizationSwitcher } from "../organizations/OrganizationSwitcher";
import { useAuth } from "../auth/useAuth";
import { useState } from "react";
import { CreateOrganizationModal } from "../organizations/CreateOrganizationModal";
import { MemberList } from "../organizations/MemberList";
import { InviteMemberModal } from "../organizations/InviteMemberModal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrganization } from "../organizations/useOrganization";

interface Props {
  children: React.ReactNode;
}

export function AppLayout({ children }: Props) {
  const { user, logout } = useAuth();
  const [showCreateOrg, setShowCreateOrg] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const navigate = useNavigate();
  const { activeOrg } = useOrganization();
  useEffect(() => {
  if (!activeOrg) return;

  navigate("/", { replace: true });
}, [activeOrg?.id]);


  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-bold">Multi-Tenant Task/Project Manager </span>
          <OrganizationSwitcher />
          <button
            onClick={() => setShowInvite(true)}
            className="text-sm text-blue-600"
          >
            Invite
          </button>

          <button
            onClick={() => setShowCreateOrg(true)}
            className="text-sm text-blue-600"
          >
            + New Org
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span>{user?.email}</span>
          <button onClick={logout} className="text-sm text-red-600">
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-6">
        {children} <MemberList />
      </main>
      {showCreateOrg && (
        <CreateOrganizationModal onClose={() => setShowCreateOrg(false)} />
      )}
      {showInvite && <InviteMemberModal onClose={() => setShowInvite(false)} />}
    </div>
  );
}
