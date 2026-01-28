import { useOrganization } from "./useOrganization";

export function OrganizationSwitcher() {
  const { organizations, activeOrg, setActiveOrg, loading } = useOrganization();

  if (loading) {
    return <div>Loading organizations...</div>;
  }

  if (organizations.length === 0) {
    return <div>No organizations found</div>;
  }

  return (
    <select
      className="border p-2 rounded"
      value={activeOrg?.id}
      onChange={(e) => {
        const selected = organizations.find(
          (org) => org.id === Number(e.target.value),
        );
        if (selected) {
          setActiveOrg(selected);
        }
      }}
    >
      {organizations.map((org) => (
        <option key={org.id} value={org.id}>
          {org.name} ({org.role})
        </option>
      ))}
    </select>
  );
}
