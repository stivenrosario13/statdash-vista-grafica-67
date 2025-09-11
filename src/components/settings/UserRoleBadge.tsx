
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/auth";

interface UserRoleBadgeProps {
  role: UserRole;
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  const variants = {
    admin: 'destructive',
    manager: 'default',
    viewer: 'secondary'
  } as const;
  
  const labels = {
    admin: 'Administrador',
    manager: 'Gestor',
    viewer: 'Visualizador'
  };

  return (
    <Badge variant={variants[role]}>
      {labels[role]}
    </Badge>
  );
}
