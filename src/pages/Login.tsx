
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { UserRole } from "@/types/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Eye, EyeOff, Shield, Lock, User, Building2, Sparkles, CheckCircle, Mail, Zap, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("viewer");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La imagen debe ser menor a 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
        toast.success("Imagen de perfil cargada correctamente");
      };
      reader.readAsDataURL(file);
    }
  };

  const validateCredentials = (email: string, password: string, role: UserRole): boolean => {
    const credentials = {
      admin: { emails: ["admin@test.com", "admin@steven.com"], password: "12345678s" },
      manager: { emails: ["manager@test.com", "gestor@steven.com"], password: "manager123" },
      viewer: { emails: ["viewer@test.com", "view@steven.com"], password: "viewer123" }
    };

    const roleCredentials = credentials[role];
    return roleCredentials.emails.includes(email) && password === roleCredentials.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !role) {
      toast.error("Por favor complete todos los campos obligatorios");
      return;
    }

    setIsLoading(true);
    
    // Simular delay de autenticación
    setTimeout(() => {
      if (validateCredentials(email, password, role)) {
        if (profileImage) {
          localStorage.setItem("userProfileImage", profileImage);
        }
        
        login(email, role);
        
        const roleNames = {
          admin: 'Administrador',
          manager: 'Gestor',
          viewer: 'Visualizador'
        };
        
        toast.success(`¡Bienvenido ${roleNames[role]}!`, {
          description: `Acceso concedido al sistema Steven Rosario`,
        });
        
        navigate("/", { replace: true });
      } else {
        toast.error("Credenciales incorrectas", {
          description: "Verifica tu email, contraseña y nivel de acceso.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Control total del sistema, configuraciones avanzadas y gestión completa';
      case 'manager':
        return 'Gestión de equipos, cobros y análisis de rendimiento empresarial';
      case 'viewer':
        return 'Visualización de estadísticas, reportes y métricas en tiempo real';
      default:
        return '';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin': return <Shield className="h-5 w-5" />;
      case 'manager': return <User className="h-5 w-5" />;
      case 'viewer': return <Eye className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'from-red-500 to-red-600';
      case 'manager': return 'from-blue-500 to-blue-600';
      case 'viewer': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-6000"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/20 rounded-full animate-bounce`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3000}ms`,
              animationDuration: `${3000 + Math.random() * 2000}ms`
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-lg shadow-2xl border-0 backdrop-blur-sm bg-white/10 relative z-10 animate-fade-in">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-10 rounded-t-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm ring-4 ring-white/30">
                <Building2 className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold mb-3 flex items-center justify-center gap-3">
              Steven Rosario
              <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
            </CardTitle>
            <CardDescription className="text-blue-100 text-xl font-medium mb-2">
              Sistema de Gestión Empresarial
            </CardDescription>
            <div className="flex items-center justify-center gap-4 text-sm text-blue-200">
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                <span>Premium</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>Profesional</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>Seguro</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse animation-delay-200"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse animation-delay-400"></div>
            </div>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="p-8 space-y-6 bg-white/95 backdrop-blur-sm">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className={`absolute -inset-2 bg-gradient-to-r ${getRoleColor(role)} rounded-full opacity-75 blur group-hover:opacity-100 transition duration-300`}></div>
                <Avatar className="relative h-32 w-32 ring-4 ring-white shadow-xl transition-all duration-300 group-hover:scale-105">
                  <AvatarImage src={profileImage || ""} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-200 text-blue-700 text-4xl font-bold">
                    {email ? email.charAt(0).toUpperCase() : 'SR'}
                  </AvatarFallback>
                </Avatar>
                <label className={`absolute bottom-0 right-0 bg-gradient-to-r ${getRoleColor(role)} text-white p-3 rounded-full cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <Upload className="h-5 w-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-semibold flex items-center gap-2 text-base">
                <Mail className="h-5 w-5 text-blue-600" />
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@steven.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300 text-base bg-white/90 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-semibold flex items-center gap-2 text-base">
                <Lock className="h-5 w-5 text-blue-600" />
                Contraseña Segura
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14 border-2 border-gray-200 focus:border-blue-500 rounded-xl pr-14 transition-all duration-300 text-base bg-white/90 backdrop-blur-sm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="role" className="text-gray-700 font-semibold flex items-center gap-2 text-base">
                {getRoleIcon(role)}
                Nivel de Acceso Profesional
              </Label>
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-blue-500 rounded-xl bg-white/90 backdrop-blur-sm">
                  <SelectValue placeholder="Seleccione su nivel de acceso" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm">
                  <SelectItem value="admin">
                    <div className="flex items-center gap-3 p-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Shield className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-red-600 text-base">Administrador</span>
                        <span className="text-sm text-gray-500">Control total del sistema</span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="manager">
                    <div className="flex items-center gap-3 p-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-blue-600 text-base">Gestor</span>
                        <span className="text-sm text-gray-500">Gestión avanzada de equipos</span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="viewer">
                    <div className="flex items-center gap-3 p-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Eye className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-green-600 text-base">Visualizador</span>
                        <span className="text-sm text-gray-500">Acceso de solo lectura</span>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className={`bg-gradient-to-r ${getRoleColor(role).replace('to-', 'to-').replace('from-', 'from-')}/10 p-4 rounded-xl border border-current/20`}>
                <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  {getRoleDescription(role)}
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t bg-gradient-to-r from-gray-50 to-blue-50 p-8 flex flex-col gap-6 rounded-b-lg">
            <Button
              type="submit"
              className={`w-full bg-gradient-to-r ${getRoleColor(role)} hover:opacity-90 text-white font-bold py-6 rounded-xl h-16 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verificando credenciales...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5" />
                  Acceder al Sistema
                </div>
              )}
            </Button>

            <div className="text-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg">
                <p className="text-base font-semibold text-gray-700 mb-4 flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Credenciales Demo - Sistema Profesional
                </p>
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Shield className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-red-700">Administrador</div>
                        <div className="text-xs text-red-600">Control total</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">admin@test.com</div>
                      <div className="font-mono text-red-600 font-bold">12345678s</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-blue-700">Gestor</div>
                        <div className="text-xs text-blue-600">Gestión avanzada</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">manager@test.com</div>
                      <div className="font-mono text-blue-600 font-bold">manager123</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Eye className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-green-700">Visualizador</div>
                        <div className="text-xs text-green-600">Solo lectura</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">viewer@test.com</div>
                      <div className="font-mono text-green-600 font-bold">viewer123</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
