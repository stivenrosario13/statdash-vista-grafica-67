
export type UserRole = 'admin' | 'manager' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

export interface RolePermissions {
  canCreateCobros: boolean;
  canEditCobros: boolean;
  canDeleteCobros: boolean;
  canViewAllTeams: boolean;
  canManageUsers: boolean;
  canExportData: boolean;
  canViewReports: boolean;
  canManageSettings: boolean;
}
