
export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'client' | 'invoice' | 'payment' | 'employee';
  route: string;
  icon: React.ComponentType<any>;
}

export interface ClientProfile {
  id: string;
  clientId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  clientType: 'residencial' | 'casa' | 'negocio_pequeno' | 'negocio_mediano' | 'negocio_grande';
  debt: number;
  status: 'Activo' | 'Pendiente' | 'Moroso' | 'Inactivo';
  manager: string;
  lastContact: string;
  totalInvoices: number;
  totalPaid: number;
  creditScore: number;
  registrationDate: string;
  services: Array<{
    id: string;
    type: 'aseo' | 'permiso_operacion' | 'letrero' | 'rampa';
    rate: number;
    periodicity: string;
    status: 'active' | 'inactive';
    startDate: string;
    endDate?: string;
  }>;
  properties: Array<{
    id: string;
    address: string;
    type: string;
    apartments?: number;
  }>;
  paymentHistory: Array<{
    date: string;
    amount: number;
    method: string;
  }>;
  riskLevel: 'low' | 'medium' | 'high';
  avatar?: string;
}
