import { createContext } from "react";
import type { Organization } from "../types/organization";

export interface OrganizationContextType {
  organizations: Organization[];
  activeOrg: Organization | null;
  setActiveOrg: (org: Organization) => void;
  createOrg: (name: string) => Promise<void>;
  loading: boolean;
}


export const OrganizationContext =
  createContext<OrganizationContextType | undefined>(undefined);
