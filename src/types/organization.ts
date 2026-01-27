export type OrgRole = "OWNER" | "ADMIN" | "MEMBER";

export interface Organization {
  id: number;
  name: string;
  slug: string;
  role: OrgRole;
}
