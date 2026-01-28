import { OrganizationSwitcher } from "../organizations/OrganizationSwitcher";
import { useAuth } from "../auth/useAuth";

interface Props {
  children: React.ReactNode;
}

export function AppLayout({ children }: Props) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-bold">Multi-Tenent-SaaS-tsk_mgr</span>
          <OrganizationSwitcher />
        </div>

        <div className="flex items-center gap-4">
          <span>{user?.email}</span>
          <button
            onClick={logout}
            className="text-sm text-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
