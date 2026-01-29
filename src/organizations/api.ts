import { http } from "../api/http";
import type { Organization } from "../types/organization";


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