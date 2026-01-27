import { http } from "../api/http";
import type { Organization } from "../types/organization";

export async function fetchOrganizations(): Promise<Organization[]> {
  const response = await http.get<Organization[]>("/organizations/");
  return response.data;
}
