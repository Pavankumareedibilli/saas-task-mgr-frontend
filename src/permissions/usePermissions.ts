import { useOrganization } from "../organizations/useOrganization";

export function usePermissions() {
  const { activeOrg } = useOrganization();

  const role = activeOrg?.role;

  const isOwner = role === "OWNER";
  const isAdmin = role === "ADMIN";
  const isMember = role === "MEMBER";

  const canManageBoards = isOwner || isAdmin;
  const canManageLists = isOwner || isAdmin;
  const canManageCards = isOwner || isAdmin;
  const canInvite = isOwner || isAdmin;

  return {
    role,
    isOwner,
    isAdmin,
    isMember,
    canManageBoards,
    canManageLists,
    canManageCards,
    canInvite,
  };
}
