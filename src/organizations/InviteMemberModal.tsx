import { useState } from "react";
import { inviteMember } from "./api";
import { useOrganization } from "./useOrganization";
import type { OrgRole } from "../types/organization";

interface Props {
  onClose: () => void;
}

export function InviteMemberModal({ onClose }: Props) {
  const { activeOrg } = useOrganization();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<OrgRole>("MEMBER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!activeOrg) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!activeOrg) {
      setError("No active organization");
      return;
    }

    try {
      setLoading(true);
      await inviteMember(activeOrg.id, email, role);
      onClose();
    } catch {
      setError("Failed to send invite");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-96 space-y-4"
      >
        <h2 className="text-lg font-bold">Invite Member</h2>

        {error && <p className="text-red-600">{error}</p>}

        <input
          className="w-full border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className="w-full border p-2"
          value={role}
          onChange={(e) => setRole(e.target.value as OrgRole)}
        >
          <option value="MEMBER">Member</option>
          <option value="ADMIN">Admin</option>
        </select>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="border px-4 py-2">
            Cancel
          </button>
          <button
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2"
          >
            {loading ? "Sending..." : "Send Invite"}
          </button>
        </div>
      </form>
    </div>
  );
}
