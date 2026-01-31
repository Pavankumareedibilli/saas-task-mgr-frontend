import type { OrgRole } from "./organization";

// export interface OrganizationMember {
//   id: number;
//   user: {
//     id: number;
//     email: string;
//     username: string;
//   };
//   role: OrgRole;
// }

export interface OrganizationMember {
  id: number;
  user_id: number;
  username: string;
  email: string;
  role : OrgRole
  joined_at: string;
  //role: "OWNER" | "ADMIN" | "MEMBER";
}
