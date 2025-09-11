
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole, RolePermissions } from '@/types/auth';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  requiredPermission?: keyof RolePermissions;
  fallback?: ReactNode;
}

export const RoleGuard = ({ 
  children, 
  allowedRoles, 
  requiredPermission, 
  fallback = null 
}: RoleGuardProps) => {
  const { authState, hasPermission } = useAuth();

  if (!authState.isLoggedIn || !authState.user) {
    return <>{fallback}</>;
  }

  // Verificar por rol específico
  if (allowedRoles && !allowedRoles.includes(authState.user.role)) {
    return <>{fallback}</>;
  }

  // Verificar por permiso específico
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
