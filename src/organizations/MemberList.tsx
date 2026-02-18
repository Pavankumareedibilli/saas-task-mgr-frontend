import { useEffect, useState } from "react";
import { fetchMembers } from "./api";
import { useOrganization } from "./useOrganization";
import type { OrganizationMember } from "../types/membership";

export function MemberList() {
  const { activeOrg } = useOrganization();
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeOrg) {
      setMembers([]);
      setLoading(false);
      return;
    }

    setMembers([]);
    setLoading(true);

    let cancelled = false;

    async function load() {
      try {
        if (!activeOrg) return;
        const data = await fetchMembers(activeOrg.id);
        if (!cancelled) {
          setMembers(data);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [activeOrg]);

  if (!activeOrg) return null;
  if (loading) return <p>Loading members...</p>;

  return (
  
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Members</h2>

      <div className="bg-white border rounded-lg divide-y">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex justify-between items-center px-4 py-3"
          >
            <span className="text-sm">{member.email}</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {member.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
