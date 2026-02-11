import { useEffect, useState } from "react";
import { OrganizationContext } from "./OrganizationContext";
import type { Organization } from "../types/organization";
import { createOrganization, fetchOrganizations } from "./api";
import { useAuth } from "../auth/useAuth";

interface Props {
  children: React.ReactNode;
}

export function OrganizationProvider({ children }: Props) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [activeOrg, setActiveOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setOrganizations([]);
      setActiveOrg(null);
      setLoading(false);
      return;
    }

    async function loadOrganizations() {
      setLoading(true);
      try {
        const orgs = await fetchOrganizations();
        setOrganizations(orgs);
        setActiveOrg(orgs[0] ?? null);
      } finally {
        setLoading(false);
      }
    }

    loadOrganizations();
  }, [user]);

  
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
