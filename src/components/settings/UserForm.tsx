
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/types/auth";
import { NewUserForm } from "@/types/user";
import { toast } from "sonner";

interface UserFormProps {
  onAddUser: (user: NewUserForm) => void;
  onCancel: () => void;
}

export function UserForm({ onAddUser, onCancel }: UserFormProps) {
  const [newUser, setNewUser] = useState<NewUserForm>({
    name: "",
    email: "",
    role: "viewer"
  });

  const handleSubmit = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    onAddUser(newUser);
    setNewUser({ name: "", email: "", role: "viewer" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nuevo Usuario</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="userName">Nombre</Label>
            <Input
              id="userName"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              placeholder="Nombre completo"
            />
          </div>
          <div>
            <Label htmlFor="userEmail">Email</Label>
            <Input
              id="userEmail"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              placeholder="email@ejemplo.com"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="userRole">Rol</Label>
          <Select value={newUser.role} onValueChange={(value: UserRole) => setNewUser({...newUser, role: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="viewer">Visualizador</SelectItem>
              <SelectItem value="manager">Gestor</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSubmit}>Crear Usuario</Button>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
