import { useEffect, useState } from "react";
import { OrganizationContext } from "./OrganizationContext";
import type { Organization } from "../types/organization";
import { createOrganization, fetchOrganizations } from "./api";

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
  async function createOrg(name: string) {
    const newOrg = await createOrganization(name);

    setOrganizations((prev) => [...prev, newOrg]);
    setActiveOrg(newOrg);
  }
 

  async function reloadOrganizations() {
  setLoading(true);
  const orgs = await fetchOrganizations();
  setOrganizations(orgs);
  if (orgs.length > 0) {
    setActiveOrg(orgs[0]);
  }
  setLoading(false);
}


  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        activeOrg,
        setActiveOrg,
        createOrg,
        reloadOrganizations,
        loading,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}
