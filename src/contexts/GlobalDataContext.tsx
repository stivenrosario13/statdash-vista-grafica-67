
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { addGlobalCobro, addGlobalClient, getGlobalCobros, getGlobalClients, updateGlobalClient } from '@/hooks/useRealtimeUpdates';

interface GlobalState {
  cobros: any[];
  clients: any[];
  employees: any[];
  teams: any[];
  notifications: any[];
  settings: GlobalSettings;
  metrics: GlobalMetrics;
  lastUpdate: number;
}

interface GlobalSettings {
  currency: string;
  dateFormat: string;
  autoRefresh: boolean;
  refreshInterval: number;
  notifications: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
    email: boolean;
  };
  dashboard: {
    theme: 'light' | 'dark' | 'auto';
    compactMode: boolean;
    showAnimations: boolean;
    defaultTimeframe: 'daily' | 'weekly' | 'monthly';
  };
  charts: {
    type: 'line' | 'bar' | 'area';
    colors: string[];
    showGrid: boolean;
    animate: boolean;
  };
  goals: {
    monthly: number;
    daily: number;
    alertThreshold: number;
  };
}

interface GlobalMetrics {
  totalRevenue: number;
  totalCobros: number;
  avgAmount: number;
  activeClients: number;
  growthRate: number;
  efficiency: number;
  collectionRate: number;
  trends: any[];
}

type GlobalAction = 
  | { type: 'ADD_COBRO'; payload: any }
  | { type: 'ADD_CLIENT'; payload: any }
  | { type: 'UPDATE_CLIENT'; payload: { id: string; updates: any } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<GlobalSettings> }
  | { type: 'REFRESH_DATA' }
  | { type: 'SET_METRICS'; payload: GlobalMetrics }
  | { type: 'ADD_NOTIFICATION'; payload: any };

const initialSettings: GlobalSettings = {
  currency: 'RD$',
  dateFormat: 'DD/MM/YYYY',
  autoRefresh: true,
  refreshInterval: 30000,
  notifications: {
    enabled: true,
    sound: true,
    desktop: true,
    email: false,
  },
  dashboard: {
    theme: 'light',
    compactMode: false,
    showAnimations: true,
    defaultTimeframe: 'daily',
  },
  charts: {
    type: 'line',
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    showGrid: true,
    animate: true,
  },
  goals: {
    monthly: 750000,
    daily: 25000,
    alertThreshold: 50,
  },
};

const initialState: GlobalState = {
  cobros: [],
  clients: [],
  employees: [],
  teams: [],
  notifications: [],
  settings: initialSettings,
  metrics: {
    totalRevenue: 0,
    totalCobros: 0,
    avgAmount: 0,
    activeClients: 0,
    growthRate: 0,
    efficiency: 0,
    collectionRate: 0,
    trends: [],
  },
  lastUpdate: Date.now(),
};

function globalReducer(state: GlobalState, action: GlobalAction): GlobalState {
  switch (action.type) {
    case 'ADD_COBRO':
      const newCobros = [...state.cobros, action.payload];
      return {
        ...state,
        cobros: newCobros,
        lastUpdate: Date.now(),
      };
    
    case 'ADD_CLIENT':
      return {
        ...state,
        clients: [...state.clients, action.payload],
        lastUpdate: Date.now(),
      };
    
    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map(client => 
          client.id === action.payload.id 
            ? { ...client, ...action.payload.updates }
            : client
        ),
        lastUpdate: Date.now(),
      };
    
    case 'UPDATE_SETTINGS':
      const newSettings = { ...state.settings, ...action.payload };
      localStorage.setItem('app-settings', JSON.stringify(newSettings));
      return {
        ...state,
        settings: newSettings,
        lastUpdate: Date.now(),
      };
    
    case 'REFRESH_DATA':
      return {
        ...state,
        cobros: getGlobalCobros(),
        clients: getGlobalClients(),
        lastUpdate: Date.now(),
      };
    
    case 'SET_METRICS':
      return {
        ...state,
        metrics: action.payload,
        lastUpdate: Date.now(),
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications.slice(0, 49)],
        lastUpdate: Date.now(),
      };
    
    default:
      return state;
  }
}

const GlobalDataContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
  addCobro: (cobro: any) => void;
  addClient: (client: any) => void;
  updateSettings: (settings: Partial<GlobalSettings>) => void;
  calculateMetrics: () => void;
} | null>(null);

export function GlobalDataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(globalReducer, {
    ...initialState,
    settings: {
      ...initialSettings,
      ...JSON.parse(localStorage.getItem('app-settings') || '{}')
    }
  });

  const addCobro = (cobro: any) => {
    const savedCobro = addGlobalCobro(cobro);
    dispatch({ type: 'ADD_COBRO', payload: savedCobro });
    
    // Add notification
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now(),
        type: 'success',
        title: 'Nuevo Cobro Registrado',
        message: `${cobro.employeeName} registró ${state.settings.currency} ${cobro.amount?.toLocaleString()}`,
        timestamp: new Date(),
        read: false,
      }
    });

    // Recalculate metrics
    calculateMetrics();
  };

  const addClient = (client: any) => {
    const savedClient = addGlobalClient(client);
    dispatch({ type: 'ADD_CLIENT', payload: savedClient });
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now(),
        type: 'info',
        title: 'Nuevo Cliente Registrado',
        message: `Cliente ${client.name} agregado al sistema`,
        timestamp: new Date(),
        read: false,
      }
    });
  };

  const updateSettings = (settings: Partial<GlobalSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const calculateMetrics = () => {
    const cobros = getGlobalCobros();
    const clients = getGlobalClients();
    
    const totalRevenue = cobros.reduce((sum, cobro) => sum + (cobro.amount || cobro.monto || 0), 0);
    const totalCobros = cobros.length;
    const avgAmount = totalCobros > 0 ? totalRevenue / totalCobros : 0;
    const activeClients = clients.filter(c => c.status === 'Activo').length;
    
    // Calculate growth rate (last 7 days vs previous 7 days)
    const today = new Date();
    const last7Days = cobros.filter(c => {
      const cobroDate = new Date(c.date || c.fecha);
      const daysDiff = Math.floor((today.getTime() - cobroDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff <= 7;
    });
    
    const previous7Days = cobros.filter(c => {
      const cobroDate = new Date(c.date || c.fecha);
      const daysDiff = Math.floor((today.getTime() - cobroDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff > 7 && daysDiff <= 14;
    });
    
    const last7Revenue = last7Days.reduce((sum, c) => sum + (c.amount || c.monto || 0), 0);
    const prev7Revenue = previous7Days.reduce((sum, c) => sum + (c.amount || c.monto || 0), 0);
    const growthRate = prev7Revenue > 0 ? ((last7Revenue - prev7Revenue) / prev7Revenue) * 100 : 0;
    
    const efficiency = activeClients > 0 ? (totalCobros / activeClients) * 10 : 0;
    
    // Calculate collection rate (successful collections vs total attempts)
    const collectionRate = totalCobros > 0 ? (totalCobros / (totalCobros + clients.filter(c => c.status === 'Moroso').length)) * 100 : 0;
    
    const metrics: GlobalMetrics = {
      totalRevenue,
      totalCobros,
      avgAmount,
      activeClients,
      growthRate,
      efficiency: Math.min(100, efficiency),
      collectionRate: Math.min(100, collectionRate),
      trends: generateTrends(cobros),
    };
    
    dispatch({ type: 'SET_METRICS', payload: metrics });
  };

  const generateTrends = (cobros: any[]) => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last30Days.map(date => {
      const dayCobros = cobros.filter(c => (c.date || c.fecha)?.startsWith(date));
      const dayRevenue = dayCobros.reduce((sum, c) => sum + (c.amount || c.monto || 0), 0);
      
      return {
        date,
        cobros: dayCobros.length,
        revenue: dayRevenue,
        avgAmount: dayCobros.length > 0 ? dayRevenue / dayCobros.length : 0,
      };
    });
  };

  useEffect(() => {
    dispatch({ type: 'REFRESH_DATA' });
    calculateMetrics();
  }, []);

  useEffect(() => {
    if (state.settings.autoRefresh) {
      const interval = setInterval(() => {
        dispatch({ type: 'REFRESH_DATA' });
        calculateMetrics();
      }, state.settings.refreshInterval);
      
      return () => clearInterval(interval);
    }
  }, [state.settings.autoRefresh, state.settings.refreshInterval]);

  return (
    <GlobalDataContext.Provider value={{
      state,
      dispatch,
      addCobro,
      addClient,
      updateSettings,
      calculateMetrics,
    }}>
      {children}
    </GlobalDataContext.Provider>
  );
}

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error('useGlobalData must be used within GlobalDataProvider');
  }
  return context;
};
