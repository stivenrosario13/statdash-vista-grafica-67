
import { User, FileText, DollarSign, Users } from "lucide-react";
import { SearchResult, ClientProfile } from "./types";
import { getGlobalClients } from '@/hooks/useRealtimeUpdates';

export const mockSearchData: SearchResult[] = [
  { id: '1', title: 'Juan Pérez', subtitle: 'Cliente - Apartamento 301', type: 'client', route: '/clients', icon: User },
  { id: '2', title: 'María González', subtitle: 'Cliente - Casa Villa Verde', type: 'client', route: '/clients', icon: User },
  { id: '3', title: 'Carlos Mendoza', subtitle: 'Cliente - Local Comercial', type: 'client', route: '/clients', icon: User },
  { id: '4', title: 'Ana Rodríguez', subtitle: 'Cliente - Casa Los Jardines', type: 'client', route: '/clients', icon: User },
  { id: '5', title: 'Factura #001234', subtitle: 'RD$ 2,500 - Pendiente', type: 'invoice', route: '/invoice-templates', icon: FileText },
  { id: '6', title: 'Pago #P-5678', subtitle: 'RD$ 1,200 - Completado', type: 'payment', route: '/payments', icon: DollarSign },
  { id: '7', title: 'Carlos Rodríguez', subtitle: 'Gestor - Turno Mañana', type: 'employee', route: '/employees', icon: Users },
];

export const getMockClientProfiles = (): ClientProfile[] => {
  const globalClients = getGlobalClients();
  console.log('mockData: Getting client profiles, found:', globalClients.length, 'clients');
  return globalClients.map(client => ({
    ...client,
    // Asegurar que todos los campos requeridos estén presentes
    services: client.services || [],
    properties: client.properties || [],
    paymentHistory: client.paymentHistory || []
  }));
};
