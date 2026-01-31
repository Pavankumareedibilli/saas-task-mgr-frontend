import { http } from "../api/http";
import type { Organization } from "../types/organization";
import type { OrganizationMember } from "../types/membership";

// This api is used to get organizations 
export async function fetchOrganizations(): Promise<Organization[]> {
  const response = await http.get<Organization[]>("/organizations/");
  return response.data;
}

// This api is used to create a new organization
export async function createOrganization(
  name: string
): Promise<Organization> {
  const response = await http.post<Organization>("/organizations/", {
    name,
  });
  return response.data;
}

export async function inviteMember(
  orgId: number,
  email: string,
  role: "OWNER" | "ADMIN" | "MEMBER"
): Promise<void> {
  await http.post(`/organizations/${orgId}/invite/`, {
    email,
    role,
  });
}

export async function fetchMembers(
  orgId: number
): Promise<OrganizationMember[]> {
  const response = await http.get<OrganizationMember[]>(
    `/organizations/${orgId}/members/`
  );
  return response.data;
}
