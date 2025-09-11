
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  UserPlus, 
  Users, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Shield, 
  Activity,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Eye,
  Lock,
  Unlock,
  MoreHorizontal,
  Download,
  Upload,
  CheckCircle,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import { UserRole } from "@/types/auth";
import { MockUser, NewUserForm } from "@/types/user";

const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'Steven Rosario',
    email: 'steven@sistema.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15 10:30',
    avatar: '',
    phone: '+1-809-555-0100',
    department: 'Administración',
    joinDate: '2023-01-01',
    permissions: ['all']
  },
  {
    id: '2',
    name: 'Ana López',
    email: 'ana.lopez@sistema.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-01-15 09:15',
    avatar: '',
    phone: '+1-809-555-0101',
    department: 'Cobros Norte',
    joinDate: '2023-03-15',
    permissions: ['cobros', 'reportes']
  },
  {
    id: '3',
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@sistema.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-01-15 08:45',
    avatar: '',
    phone: '+1-809-555-0102',
    department: 'Cobros Sur',
    joinDate: '2023-02-10',
    permissions: ['cobros', 'clientes']
  },
  {
    id: '4',
    name: 'Luis Herrera',
    email: 'luis.herrera@sistema.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-01-14 16:20',
    avatar: '',
    phone: '+1-809-555-0103',
    department: 'Cobros Este',
    joinDate: '2023-04-20',
    permissions: ['cobros', 'reportes']
  },
  {
    id: '5',
    name: 'María Fernández',
    email: 'maria.fernandez@sistema.com',
    role: 'viewer',
    status: 'active',
    lastLogin: '2024-01-14 15:30',
    avatar: '',
    phone: '+1-809-555-0104',
    department: 'Reportes',
    joinDate: '2023-06-01',
    permissions: ['reportes']
  },
  {
    id: '6',
    name: 'Pedro Martínez',
    email: 'pedro.martinez@sistema.com',
    role: 'viewer',
    status: 'inactive',
    lastLogin: '2024-01-10 12:15',
    avatar: '',
    phone: '+1-809-555-0105',
    department: 'Soporte',
    joinDate: '2023-05-15',
    permissions: ['reportes']
  }
];

export function UserManagement() {
  const [users, setUsers] = useState<MockUser[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<MockUser[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedRole, selectedStatus, users]);

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRole !== "all") {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(user => user.status === selectedStatus);
    }

    setFilteredUsers(filtered);
  };

  const handleAddUser = (newUserData: NewUserForm) => {
    const user: MockUser = {
      id: Date.now().toString(),
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      status: 'active',
      lastLogin: 'Nunca',
      avatar: '',
      phone: newUserData.phone || '',
      department: newUserData.department || '',
      joinDate: new Date().toISOString().split('T')[0],
      permissions: []
    };

    setUsers([...users, user]);
    setShowAddForm(false);
    toast.success("Usuario agregado exitosamente");
  };

  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setShowUserDetails(true);
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success("Usuario eliminado");
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
    toast.success("Estado del usuario actualizado");
  };

  const getRoleBadge = (role: UserRole) => {
    const variants = {
      admin: "bg-red-100 text-red-800",
      manager: "bg-blue-100 text-blue-800",
      viewer: "bg-gray-100 text-gray-800"
    };
    
    const labels = {
      admin: "Administrador",
      manager: "Gestor",
      viewer: "Visualizador"
    };

    return (
      <Badge className={variants[role]}>
        {labels[role]}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-green-100 text-green-800">Activo</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactivo</Badge>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
          <p className="text-muted-foreground mt-2">Administra usuarios, roles y permisos del sistema</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Agregar Usuario
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Usuarios</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Activos</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Administradores</p>
                <p className="text-2xl font-bold text-red-600">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Gestores</p>
                <p className="text-2xl font-bold text-blue-600">
                  {users.filter(u => u.role === 'manager').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Lista de Usuarios</TabsTrigger>
          <TabsTrigger value="roles">Gestión de Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permisos</TabsTrigger>
          <TabsTrigger value="activity">Actividad</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Filtros */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar usuarios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los roles</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="manager">Gestor</SelectItem>
                    <SelectItem value="viewer">Visualizador</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de usuarios */}
          <Card>
            <CardHeader>
              <CardTitle>Usuarios del Sistema ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {user.email}
                          {user.phone && (
                            <>
                              <span>•</span>
                              <Phone className="h-3 w-3" />
                              {user.phone}
                            </>
                          )}
                        </div>
                        {user.department && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            {user.department}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          {getRoleBadge(user.role)}
                          {getStatusBadge(user.status)}
                        </div>
                        <div className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {user.lastLogin}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserDetails(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          {user.status === 'active' ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-500" />
                  Administrador
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Acceso completo al sistema
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Gestión de usuarios</li>
                    <li>• Configuración del sistema</li>
                    <li>• Todos los reportes</li>
                    <li>• Gestión de cobros</li>
                  </ul>
                  <Badge className="bg-red-100 text-red-800">
                    {users.filter(u => u.role === 'admin').length} usuarios
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Gestor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Gestión operativa y reportes
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Registro de cobros</li>
                    <li>• Gestión de clientes</li>
                    <li>• Reportes operativos</li>
                    <li>• Dashboard ejecutivo</li>
                  </ul>
                  <Badge className="bg-blue-100 text-blue-800">
                    {users.filter(u => u.role === 'manager').length} usuarios
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-gray-500" />
                  Visualizador
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Solo visualización de reportes
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Ver reportes</li>
                    <li>• Dashboard básico</li>
                    <li>• Exportar datos</li>
                  </ul>
                  <Badge className="bg-gray-100 text-gray-800">
                    {users.filter(u => u.role === 'viewer').length} usuarios
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Matriz de Permisos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Funcionalidad</th>
                      <th className="text-center p-3">Administrador</th>
                      <th className="text-center p-3">Gestor</th>
                      <th className="text-center p-3">Visualizador</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Gestión de Usuarios', admin: true, manager: false, viewer: false },
                      { name: 'Configuración del Sistema', admin: true, manager: false, viewer: false },
                      { name: 'Registro de Cobros', admin: true, manager: true, viewer: false },
                      { name: 'Gestión de Clientes', admin: true, manager: true, viewer: false },
                      { name: 'Reportes Avanzados', admin: true, manager: true, viewer: true },
                      { name: 'Dashboard Ejecutivo', admin: true, manager: true, viewer: false },
                      { name: 'Exportar Datos', admin: true, manager: true, viewer: true }
                    ].map((permission, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{permission.name}</td>
                        <td className="p-3 text-center">
                          {permission.admin ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-200 mx-auto" />
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {permission.manager ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-200 mx-auto" />
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {permission.viewer ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-200 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente del Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: 'Steven Rosario', action: 'Creó un nuevo usuario', time: '2 min ago', type: 'user' },
                  { user: 'Ana López', action: 'Registró un cobro', time: '5 min ago', type: 'cobro' },
                  { user: 'Carlos Ruiz', action: 'Actualizó datos de cliente', time: '10 min ago', type: 'client' },
                  { user: 'Sistema', action: 'Backup automático completado', time: '30 min ago', type: 'system' },
                  { user: 'Luis Herrera', action: 'Generó reporte mensual', time: '1 hour ago', type: 'report' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'user' ? 'bg-blue-100' :
                      activity.type === 'cobro' ? 'bg-green-100' :
                      activity.type === 'client' ? 'bg-purple-100' :
                      activity.type === 'system' ? 'bg-orange-100' : 'bg-gray-100'
                    }`}>
                      {activity.type === 'user' && <Users className="h-5 w-5 text-blue-600" />}
                      {activity.type === 'cobro' && <Activity className="h-5 w-5 text-green-600" />}
                      {activity.type === 'client' && <Users className="h-5 w-5 text-purple-600" />}
                      {activity.type === 'system' && <Shield className="h-5 w-5 text-orange-600" />}
                      {activity.type === 'report' && <FileText className="h-5 w-5 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog para agregar usuario */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleAddUser({
              name: formData.get('name') as string,
              email: formData.get('email') as string,
              role: formData.get('role') as UserRole,
              phone: formData.get('phone') as string,
              department: formData.get('department') as string
            });
          }}>
            <div>
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" name="phone" type="tel" />
            </div>
            <div>
              <Label htmlFor="department">Departamento</Label>
              <Input id="department" name="department" />
            </div>
            <div>
              <Label htmlFor="role">Rol</Label>
              <Select name="role" required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="manager">Gestor</SelectItem>
                  <SelectItem value="viewer">Visualizador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                Crear Usuario
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog para detalles del usuario */}
      <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles del Usuario</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {selectedUser.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex gap-2 mt-2">
                    {getRoleBadge(selectedUser.role)}
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Teléfono</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.phone || 'No especificado'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Departamento</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.department || 'No especificado'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Fecha de Ingreso</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.joinDate || 'No especificado'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Último Acceso</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.lastLogin}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowUserDetails(false)}>
                  Cerrar
                </Button>
                <Button onClick={() => handleEditUser(selectedUser.id)}>
                  Editar Usuario
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
