/**
 * Cliente API para backend PHP/XAMPP
 * Configura VITE_API_URL en .env (por defecto: http://localhost/backend/api)
 */
const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost/backend/api";

function getToken() {
  return localStorage.getItem("erp_token");
}

async function request<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const json = await res.json().catch(() => ({ success: false, message: "Respuesta inválida" }));
  if (!res.ok || !json.success) {
    throw new Error(json.message || `Error ${res.status}`);
  }
  return json.data;
}

export const api = {
  url: API_URL,
  get: <T = any>(p: string) => request<T>(p),
  post: <T = any>(p: string, body: any) =>
    request<T>(p, { method: "POST", body: JSON.stringify(body) }),
  put: <T = any>(p: string, body: any) =>
    request<T>(p, { method: "PUT", body: JSON.stringify(body) }),
  del: <T = any>(p: string) => request<T>(p, { method: "DELETE" }),

  // Auth
  login: (email: string, password: string) =>
    request<{ token: string; user: any }>("/auth/login.php", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).then((data) => {
      localStorage.setItem("erp_token", data.token);
      localStorage.setItem("erp_user", JSON.stringify(data.user));
      return data;
    }),
  logout: () => {
    localStorage.removeItem("erp_token");
    localStorage.removeItem("erp_user");
  },
  currentUser: () => {
    const u = localStorage.getItem("erp_user");
    return u ? JSON.parse(u) : null;
  },

  // CRUD genérico por recurso
  list: <T = any>(resource: string, params: Record<string, any> = {}) => {
    const q = new URLSearchParams(params as any).toString();
    return request<{ items: T[]; total: number }>(`/${resource}/${q ? `?${q}` : ""}`);
  },
  getOne: <T = any>(resource: string, id: number | string) =>
    request<T>(`/${resource}/?id=${id}`),
  create: <T = any>(resource: string, body: any) =>
    request<T>(`/${resource}/`, { method: "POST", body: JSON.stringify(body) }),
  update: <T = any>(resource: string, id: number | string, body: any) =>
    request<T>(`/${resource}/?id=${id}`, { method: "PUT", body: JSON.stringify(body) }),
  remove: (resource: string, id: number | string) =>
    request(`/${resource}/?id=${id}`, { method: "DELETE" }),
};
