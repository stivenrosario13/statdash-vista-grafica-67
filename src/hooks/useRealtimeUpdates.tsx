import { useState, useEffect, useCallback } from 'react';
import { employees, teams, registrarCobro } from '@/data/employeesData';

export interface SystemEvent {
  type: 'COBRO_REGISTERED' | 'EMPLOYEE_UPDATED' | 'TEAM_STATS_CHANGED' | 'ALERT_GENERATED' | 'WORKFLOW_UPDATED' | 'CLIENT_ADDED' | 'CLIENT_UPDATED' | 'FILTERS_APPLIED' | 'FILTERS_RESET' | 'DASHBOARD_REFRESH' | 'METRICS_UPDATE';
  data: any;
  timestamp: Date;
}

class EventBus {
  private listeners: { [key: string]: Function[] } = {};

  subscribe(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  emit(event: string, data: any) {
    console.log('EventBus emitting:', event, data);
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }

    // Emitir también evento global para componentes web nativos
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(`system-${event.toLowerCase()}`, {
        detail: data
      }));
    }
  }
}

export const eventBus = new EventBus();

// Sistema de almacenamiento global mejorado con persistencia
let globalClients: any[] = JSON.parse(localStorage.getItem('app-clients') || '[]').length > 0 
  ? JSON.parse(localStorage.getItem('app-clients') || '[]')
  : [
  {
    id: '1',
    clientId: 'CLI-001',
    name: 'Juan Pérez García',
    email: 'juan.perez@email.com',
    phone: '+1-809-555-0123',
    address: 'Av. Winston Churchill #45, Piantini',
    clientType: 'residencial',
    debt: 15750.00,
    status: 'Activo',
    manager: 'Ana López',
    lastContact: '2024-01-15',
    totalInvoices: 24,
    totalPaid: 125000.00,
    creditScore: 720,
    registrationDate: '2023-03-15',
    riskLevel: 'low',
    services: [
      { id: 's1', type: 'aseo', rate: 2500, periodicity: 'Mensual', status: 'active', startDate: '2023-03-15' },
      { id: 's2', type: 'permiso_operacion', rate: 1200, periodicity: 'Anual', status: 'active', startDate: '2023-03-15' }
    ],
    properties: [
      { id: 'p1', address: 'Apt. 301, Torre Vista', type: 'Apartamento', apartments: 1 }
    ],
    paymentHistory: [
      { date: '2024-01-15', amount: 2500, method: 'Transferencia' },
      { date: '2023-12-15', amount: 2500, method: 'Efectivo' }
    ]
  },
  {
    id: '2',
    clientId: 'CLI-002',
    name: 'María González Rodríguez',
    email: 'maria.gonzalez@email.com',
    phone: '+1-809-555-0124',
    address: 'Calle Mercedes #78, Zona Colonial',
    clientType: 'casa',
    debt: 8900.00,
    status: 'Pendiente',
    manager: 'Carlos Ruiz',
    lastContact: '2024-01-10',
    totalInvoices: 18,
    totalPaid: 95000.00,
    creditScore: 650,
    registrationDate: '2023-01-20',
    riskLevel: 'medium',
    services: [
      { id: 's3', type: 'aseo', rate: 1800, periodicity: 'Mensual', status: 'active', startDate: '2023-01-20' },
      { id: 's4', type: 'letrero', rate: 500, periodicity: 'Indefinida', status: 'active', startDate: '2023-06-01' }
    ],
    properties: [
      { id: 'p2', address: 'Casa Villa Verde', type: 'Casa Residencial' }
    ],
    paymentHistory: [
      { date: '2024-01-10', amount: 1800, method: 'Cheque' },
      { date: '2023-12-10', amount: 1800, method: 'Transferencia' }
    ]
  }
];

let globalCobros: any[] = JSON.parse(localStorage.getItem('app-cobros') || '[]').length > 0 
  ? JSON.parse(localStorage.getItem('app-cobros') || '[]')
  : [
  {
    id: 'COB-001',
    clientId: '1',
    clientName: 'Juan Pérez García',
    amount: 2500,
    date: '2024-01-15',
    employeeId: 'EMP-001',
    employeeName: 'Ana López',
    method: 'Transferencia',
    status: 'Completado',
    description: 'Pago mensual servicio de aseo',
    invoiceNumber: 'INV-2024-001'
  },
  {
    id: 'COB-002',
    clientId: '2',
    clientName: 'María González Rodríguez',
    amount: 1800,
    date: '2024-01-10',
    employeeId: 'EMP-002',
    employeeName: 'Carlos Ruiz',
    method: 'Cheque',
    status: 'Completado',
    description: 'Pago mensual servicio de aseo',
    invoiceNumber: 'INV-2024-002'
  }
];

// Funciones de persistencia
const saveToStorage = () => {
  localStorage.setItem('app-clients', JSON.stringify(globalClients));
  localStorage.setItem('app-cobros', JSON.stringify(globalCobros));
};

export const getGlobalClients = () => {
  console.log('getGlobalClients called, returning:', globalClients.length, 'clients');
  return [...globalClients];
};

export const getGlobalCobros = () => {
  console.log('getGlobalCobros called, returning:', globalCobros.length, 'cobros');
  return [...globalCobros];
};

export const addGlobalClient = (client: any) => {
  console.log('Adding new client:', client);
  const newClient = {
    ...client,
    id: client.id || `CLI-${Date.now()}`,
    clientId: client.clientId || `CLI-${String(globalClients.length + 1).padStart(3, '0')}`,
    registrationDate: client.registrationDate || new Date().toISOString().split('T')[0],
    services: client.services || [],
    properties: client.properties || [],
    paymentHistory: client.paymentHistory || []
  };
  
  globalClients.push(newClient);
  saveToStorage();
  
  eventBus.emit('CLIENT_ADDED', newClient);
  eventBus.emit('SYSTEM_UPDATE', { type: 'CLIENT_ADDED', data: newClient, timestamp: new Date() });
  eventBus.emit('DASHBOARD_REFRESH', { type: 'CLIENT_ADDED', timestamp: new Date() });
  
  return newClient;
};

export const addGlobalCobro = (cobro: any) => {
  console.log('Adding new cobro:', cobro);
  const newCobro = {
    ...cobro,
    id: cobro.id || `COB-${Date.now()}`,
    date: cobro.date || new Date().toISOString().split('T')[0],
    status: cobro.status || 'Completado'
  };
  
  globalCobros.push(newCobro);
  
  // Actualizar el cliente relacionado
  const clientIndex = globalClients.findIndex(c => c.id === cobro.clientId || c.clientId === cobro.clientId);
  if (clientIndex !== -1) {
    globalClients[clientIndex] = {
      ...globalClients[clientIndex],
      debt: Math.max(0, globalClients[clientIndex].debt - cobro.amount),
      totalPaid: globalClients[clientIndex].totalPaid + cobro.amount,
      lastContact: cobro.date,
      paymentHistory: [
        ...globalClients[clientIndex].paymentHistory,
        { date: cobro.date, amount: cobro.amount, method: cobro.method }
      ]
    };
    
    eventBus.emit('CLIENT_UPDATED', globalClients[clientIndex]);
  }
  
  saveToStorage();
  
  // Emitir múltiples eventos para actualización completa
  eventBus.emit('COBRO_REGISTERED', newCobro);
  eventBus.emit('SYSTEM_UPDATE', { type: 'COBRO_REGISTERED', data: newCobro, timestamp: new Date() });
  eventBus.emit('DASHBOARD_REFRESH', { type: 'COBRO_REGISTERED', timestamp: new Date() });
  eventBus.emit('METRICS_UPDATE', { type: 'COBRO_REGISTERED', timestamp: new Date() });
  
  // Emitir evento personalizado para notificaciones
  window.dispatchEvent(new CustomEvent('cobroRegistered', {
    detail: {
      empleadoId: cobro.employeeId,
      monto: cobro.amount,
      teamId: cobro.teamId,
      clientName: cobro.clientName,
      employeeName: cobro.employeeName,
      fecha: cobro.date
    }
  }));

  return newCobro;
};

export const updateGlobalClient = (clientId: string, updates: any) => {
  console.log('Updating client:', clientId, 'with updates:', updates);
  const clientIndex = globalClients.findIndex(c => c.id === clientId || c.clientId === clientId);
  if (clientIndex !== -1) {
    globalClients[clientIndex] = { ...globalClients[clientIndex], ...updates };
    saveToStorage();
    
    console.log('Client updated successfully:', globalClients[clientIndex]);
    eventBus.emit('CLIENT_UPDATED', globalClients[clientIndex]);
    eventBus.emit('SYSTEM_UPDATE', { type: 'CLIENT_UPDATED', data: globalClients[clientIndex], timestamp: new Date() });
    eventBus.emit('DASHBOARD_REFRESH', { type: 'CLIENT_UPDATED', timestamp: new Date() });
  } else {
    console.log('Client not found for update:', clientId);
  }
};

export function useRealtimeUpdates() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const forceUpdate = useCallback(() => {
    console.log('Forcing update...');
    setLastUpdate(Date.now());
  }, []);

  useEffect(() => {
    console.log('Setting up real-time updates subscription');
    const unsubscribes = [
      eventBus.subscribe('SYSTEM_UPDATE', (event) => {
        console.log('System update received:', event);
        forceUpdate();
      }),
      eventBus.subscribe('DASHBOARD_REFRESH', (event) => {
        console.log('Dashboard refresh requested:', event);
        forceUpdate();
      }),
      eventBus.subscribe('METRICS_UPDATE', (event) => {
        console.log('Metrics update requested:', event);
        forceUpdate();
      })
    ];

    return () => {
      unsubscribes.forEach(unsubscribe => unsubscribe());
    };
  }, [forceUpdate]);

  const triggerUpdate = useCallback((eventType: SystemEvent['type'], data: any) => {
    console.log('Triggering update:', eventType, data);
    const event: SystemEvent = {
      type: eventType,
      data,
      timestamp: new Date()
    };
    
    eventBus.emit('SYSTEM_UPDATE', event);
    eventBus.emit(eventType, event);
    eventBus.emit('DASHBOARD_REFRESH', event);
    
    // Emitir alerta del sistema para componentes que la necesiten
    if (eventType === 'COBRO_REGISTERED') {
      window.dispatchEvent(new CustomEvent('systemAlert', {
        detail: {
          type: 'success',
          title: 'Cobro Registrado',
          message: `Nuevo cobro de RD$ ${data.amount?.toLocaleString()} registrado exitosamente`,
          data: event
        }
      }));
    }
  }, []);

  return {
    lastUpdate,
    triggerUpdate,
    forceUpdate
  };
}
