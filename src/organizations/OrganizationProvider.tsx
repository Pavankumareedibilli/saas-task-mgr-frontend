import { useEffect, useState } from "react";
import { OrganizationContext } from "./OrganizationContext";
import { fetchOrganizations } from "./api";
import type { Organization } from "../types/organization";

interface Props {
  children: React.ReactNode;
}

export function OrganizationProvider({ children }: Props) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [activeOrg, setActiveOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrganizations() {
      try {
        const orgs = await fetchOrganizations();
        setOrganizations(orgs);
        
        if (orgs.length > 0) {
          setActiveOrg(orgs[0]);
        }
      } finally {
        setLoading(false);
      }
    }

    loadOrganizations();
  }, []);

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        activeOrg,
        setActiveOrg,
        loading,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}
