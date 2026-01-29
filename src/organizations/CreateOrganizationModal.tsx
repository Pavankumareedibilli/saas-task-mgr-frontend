import { useState } from "react";
import { useOrganization } from "./useOrganization";

interface Props {
  onClose: () => void;
}

export function CreateOrganizationModal({ onClose }: Props) {
  const { createOrg } = useOrganization();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Organization name required");
      return;
    }

    try {
      setLoading(true);
      await createOrg(name.trim());
      onClose();
    } catch {
      setError("Failed to create organization");
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
        <h2 className="text-lg font-bold">Create Organization</h2>

        {error && <p className="text-red-600">{error}</p>}

        <input
          className="w-full border p-2"
          placeholder="Organization name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
