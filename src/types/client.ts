
export interface Province {
  id: string;
  name: string;
}

export interface Municipality {
  id: string;
  name: string;
  provinceId: string;
}

export interface Address {
  id: string;
  street: string;
  number: string;
  sector: string;
  municipality: string;
  province: string;
  postalCode?: string;
}

export interface Property {
  id: string;
  propertyId: string;
  address: Address;
  clientId: string;
  services: Service[];
  apartments?: number; // Para residenciales
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  type: 'aseo' | 'permiso_operacion' | 'letrero' | 'rampa';
  periodicity: 'indefinida' | 'anual' | 'mensual';
  periodicityCode: 4 | 5 | 6;
  rate: number;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  // Campos específicos para letreros
  width?: number;
  height?: number;
}

export interface Client {
  id: string;
  clientId: string;
  name: string;
  email: string;
  phone: string;
  rnc?: string;
  documentId?: string;
  debt: number;
  status: 'Activo' | 'Pendiente' | 'Moroso' | 'Inactivo';
  manager: string;
  lastContact: string;
  invoices: number;
  clientType: 'residencial' | 'casa' | 'negocio_pequeno' | 'negocio_mediano' | 'negocio_grande' | 'negocio_muy_grande' | 'negocio_super_grande';
  properties: Property[];
  registeredBy: string;
  registeredAt: string;
  serviceCobrado: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  propertyId: string;
  services: Service[];
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  generatedAutomatically: boolean;
}

export interface Payment {
  id: string;
  invoiceId: string;
  clientId: string;
  managerId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'efectivo' | 'transferencia' | 'cheque';
  notes?: string;
}
