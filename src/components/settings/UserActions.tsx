
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface UserActionsProps {
  userId: string;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

export function UserActions({ userId, onEdit, onDelete }: UserActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" size="sm" onClick={() => onEdit(userId)}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button 
        variant="destructive" 
        size="sm"
        onClick={() => onDelete(userId)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
