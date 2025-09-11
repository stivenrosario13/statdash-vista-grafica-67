
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { UserRole, User, AuthState, RolePermissions } from '@/types/auth';

const AuthContext = createContext<{
  authState: AuthState;
  permissions: RolePermissions;
  logout: () => void;
  hasPermission: (permission: keyof RolePermissions) => boolean;
  login: (email: string, role: UserRole) => void;
} | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const getRolePermissions = (role: UserRole): RolePermissions => {
  const permissions: Record<UserRole, RolePermissions> = {
    admin: {
      canCreateCobros: true,
      canEditCobros: true,
      canDeleteCobros: true,
      canViewAllTeams: true,
      canManageUsers: true,
      canExportData: true,
      canViewReports: true,
      canManageSettings: true,
    },
    manager: {
      canCreateCobros: true,
      canEditCobros: true,
      canDeleteCobros: false,
      canViewAllTeams: false,
      canManageUsers: false,
      canExportData: true,
      canViewReports: true,
      canManageSettings: false,
    },
    viewer: {
      canCreateCobros: false,
      canEditCobros: false,
      canDeleteCobros: false,
      canViewAllTeams: false,
      canManageUsers: false,
      canExportData: true,
      canViewReports: true,
      canManageSettings: false,
    },
  };
  
  return permissions[role];
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
  });

  const [permissions, setPermissions] = useState<RolePermissions>(getRolePermissions('viewer'));

  useEffect(() => {
    console.log("AuthProvider: Checking authentication state");
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole") as UserRole;
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    console.log("AuthProvider: Login status:", isLoggedIn);
    console.log("AuthProvider: User data:", { userRole, userName, userEmail });

    if (isLoggedIn && userRole && userName && userEmail) {
      const user: User = {
        id: userEmail,
        email: userEmail,
        name: userName,
        role: userRole,
      };

      setAuthState({
        isLoggedIn: true,
        user,
      });

      setPermissions(getRolePermissions(userRole));
      console.log("AuthProvider: User authenticated successfully");
    } else {
      console.log("AuthProvider: User not authenticated or missing data");
      setAuthState({
        isLoggedIn: false,
        user: null,
      });
      setPermissions(getRolePermissions('viewer'));
    }
  }, []);

  const login = (email: string, role: UserRole) => {
    console.log("AuthProvider: Logging in user:", email, role);
    
    const user: User = {
      id: email,
      email: email,
      name: email.split('@')[0],
      role: role,
    };

    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", email);

    setAuthState({
      isLoggedIn: true,
      user,
    });

    setPermissions(getRolePermissions(role));
  };

  const logout = () => {
    console.log("AuthProvider: Logging out user");
    
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userProfileImage");
    
    setAuthState({
      isLoggedIn: false,
      user: null,
    });
    
    setPermissions(getRolePermissions('viewer'));
  };

  const hasPermission = (permission: keyof RolePermissions): boolean => {
    return permissions[permission];
  };

  return (
    <AuthContext.Provider value={{ authState, permissions, logout, hasPermission, login }}>
      {children}
    </AuthContext.Provider>
  );
};
