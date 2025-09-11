
import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState } = useAuth();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    
    // Si no está logueado y no está en la página de login, redirigir
    if (!isLoggedIn && location.pathname !== "/login") {
      console.log("Usuario no autenticado, redirigiendo a login");
      navigate("/login", { replace: true });
    }
    
    // Si está logueado y está en la página de login, redirigir al dashboard
    if (isLoggedIn && location.pathname === "/login") {
      console.log("Usuario ya autenticado, redirigiendo a dashboard");
      navigate("/", { replace: true });
    }
  }, [navigate, location, authState.isLoggedIn]);
  
  // Verificar estado de autenticación
  const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
  
  // Si no está logueado y no está en login, no mostrar nada (el useEffect se encargará de redirigir)
  if (!isLoggedIn && location.pathname !== "/login") {
    return null;
  }
  
  // Si está en login, mostrar siempre (para permitir el acceso a la página de login)
  if (location.pathname === "/login") {
    return <>{children}</>;
  }
  
  // Si está logueado, mostrar el contenido
  return <>{children}</>;
};

export default AuthGuard;
