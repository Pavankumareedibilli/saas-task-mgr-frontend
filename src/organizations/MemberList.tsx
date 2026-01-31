import { useEffect, useState } from "react";
import { fetchMembers } from "./api";
import { useOrganization } from "./useOrganization";
import type { OrganizationMember } from "../types/membership";

export function MemberList() {
  const { activeOrg } = useOrganization();
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeOrg) return;

    const orgId = activeOrg.id;

    async function load() {
      setLoading(true);
      const data = await fetchMembers(orgId);
      setMembers(data);
      setLoading(false);
    }

    load();
  }, [activeOrg]);

  if (!activeOrg) return null;
  if (loading) return <p>Loading members...</p>;

  return (
    <div className="space-y-2">
      <h3 className="font-bold">Members</h3>
      <ul>
        {members.map((m) => (
          <li key={m.id}>
            {m.email} — {m.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
