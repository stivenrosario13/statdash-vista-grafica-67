
import { UserRole } from "@/types/auth";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastLogin: string;
  avatar?: string;
  phone?: string;
  department?: string;
  joinDate?: string;
  permissions?: string[];
}

export interface NewUserForm {
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  department?: string;
}
