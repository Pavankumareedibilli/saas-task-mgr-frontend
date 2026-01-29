import { OrganizationSwitcher } from "../organizations/OrganizationSwitcher";
import { useAuth } from "../auth/useAuth";
import { useState } from "react";
import { CreateOrganizationModal } from "../organizations/CreateOrganizationModal";

interface Props {
  children: React.ReactNode;
}

export function AppLayout({ children }: Props) {
  const { user, logout } = useAuth();
  const [showCreateOrg, setShowCreateOrg] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-bold">Multi-Tenent-SaaS-tsk_mgr</span>
          <OrganizationSwitcher />
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

      <main className="flex-1 p-6">{children}</main>
      {showCreateOrg && (
        <CreateOrganizationModal onClose={() => setShowCreateOrg(false)} />
      )}
    </div>
  );
}
