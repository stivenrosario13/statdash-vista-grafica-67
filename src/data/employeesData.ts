
export type TimeframeType = 'daily' | 'weekly' | 'monthly';

export interface Employee {
  id: number;
  name: string;
  teamId: number;
  avatar: string;
  role: string;
  dailyTarget: number;
  weeklyTarget: number;
  monthlyTarget: number;
  totalCollected: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

export interface Team {
  id: number;
  name: string;
  color: string;
  target: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

export interface Cobro {
  id: number;
  empleadoId: number;
  monto: number;
  descripcion: string;
  fecha: Date;
}

export const teams: Team[] = [
  {
    id: 1,
    name: 'Turno Mañana',
    color: '#3B82F6',
    target: { daily: 2400, weekly: 16800, monthly: 72000 }
  },
  {
    id: 2,
    name: 'Turno Noche',
    color: '#06B6D4',
    target: { daily: 2400, weekly: 16800, monthly: 72000 }
  },
  {
    id: 3,
    name: 'Turno Calle',
    color: '#0EA5E9',
    target: { daily: 2000, weekly: 14000, monthly: 60000 }
  },
  {
    id: 4,
    name: 'Call Center',
    color: '#1E40AF',
    target: { daily: 1800, weekly: 12600, monthly: 54000 }
  }
];

// Generar 12 gestores por cada equipo (48 total)
export const employees: Employee[] = [
  // Turno Mañana (12 gestores)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Gestor Mañana ${i + 1}`,
    teamId: 1,
    avatar: `GM${i + 1}`,
    role: 'Gestor',
    dailyTarget: 200,
    weeklyTarget: 1400,
    monthlyTarget: 6000,
    totalCollected: {
      daily: Math.floor(Math.random() * 300) + 150,
      weekly: Math.floor(Math.random() * 2100) + 1050,
      monthly: Math.floor(Math.random() * 9000) + 4500
    }
  })),
  // Turno Noche (12 gestores)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 13,
    name: `Gestor Noche ${i + 1}`,
    teamId: 2,
    avatar: `GN${i + 1}`,
    role: 'Gestor',
    dailyTarget: 200,
    weeklyTarget: 1400,
    monthlyTarget: 6000,
    totalCollected: {
      daily: Math.floor(Math.random() * 300) + 150,
      weekly: Math.floor(Math.random() * 2100) + 1050,
      monthly: Math.floor(Math.random() * 9000) + 4500
    }
  })),
  // Turno Calle (12 gestores)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 25,
    name: `Gestor Calle ${i + 1}`,
    teamId: 3,
    avatar: `GC${i + 1}`,
    role: 'Gestor de Campo',
    dailyTarget: 167,
    weeklyTarget: 1167,
    monthlyTarget: 5000,
    totalCollected: {
      daily: Math.floor(Math.random() * 250) + 120,
      weekly: Math.floor(Math.random() * 1750) + 875,
      monthly: Math.floor(Math.random() * 7500) + 3750
    }
  })),
  // Call Center (12 gestores)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 37,
    name: `Agente CC ${i + 1}`,
    teamId: 4,
    avatar: `CC${i + 1}`,
    role: 'Agente Call Center',
    dailyTarget: 150,
    weeklyTarget: 1050,
    monthlyTarget: 4500,
    totalCollected: {
      daily: Math.floor(Math.random() * 200) + 100,
      weekly: Math.floor(Math.random() * 1400) + 700,
      monthly: Math.floor(Math.random() * 6000) + 3000
    }
  }))
];

// Storage for cobros
let cobros: Cobro[] = [];
let nextCobroId = 1;

// Enhanced cobro registration with real-time updates
export const registrarCobro = (empleadoId: number, monto: number, descripcion: string = ''): Cobro => {
  const nuevoCobro: Cobro = {
    id: nextCobroId++,
    empleadoId,
    monto,
    descripcion,
    fecha: new Date()
  };
  
  cobros.push(nuevoCobro);
  
  // Update employee totals
  const employee = employees.find(emp => emp.id === empleadoId);
  if (employee) {
    employee.totalCollected.daily += monto;
    employee.totalCollected.weekly += monto;
    employee.totalCollected.monthly += monto;
    
    // Trigger real-time updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cobroRegistered', {
        detail: { empleadoId, monto, descripcion, teamId: employee.teamId }
      }));
    }
  }
  
  return nuevoCobro;
};

export const obtenerCobros = (): Cobro[] => {
  return [...cobros];
};

export const calculateEmployeeTotal = (employeeId: number, timeframe: TimeframeType): number => {
  const employee = employees.find(emp => emp.id === employeeId);
  if (!employee) return 0;
  
  return employee.totalCollected[timeframe];
};

export const calculateTeamTotal = (teamId: number, timeframe: TimeframeType): number => {
  return employees
    .filter(emp => emp.teamId === teamId)
    .reduce((total, emp) => total + emp.totalCollected[timeframe], 0);
};

export const calculateGlobalTotal = (timeframe: TimeframeType): number => {
  return employees.reduce((total, emp) => total + emp.totalCollected[timeframe], 0);
};

export const getTeamStats = () => {
  return teams.map(team => ({
    ...team,
    employees: employees.filter(emp => emp.teamId === team.id).length,
    totalDaily: calculateTeamTotal(team.id, 'daily'),
    totalWeekly: calculateTeamTotal(team.id, 'weekly'),
    totalMonthly: calculateTeamTotal(team.id, 'monthly'),
    progressDaily: (calculateTeamTotal(team.id, 'daily') / team.target.daily) * 100,
    progressWeekly: (calculateTeamTotal(team.id, 'weekly') / team.target.weekly) * 100,
    progressMonthly: (calculateTeamTotal(team.id, 'monthly') / team.target.monthly) * 100
  }));
};

export const generatePerformanceData = (timeframe: TimeframeType) => {
  const periods = timeframe === 'daily' ? 7 : timeframe === 'weekly' ? 4 : 12;
  const data = [];
  
  for (let i = 0; i < periods; i++) {
    const period = timeframe === 'daily' ? `Día ${i + 1}` : 
                   timeframe === 'weekly' ? `Sem ${i + 1}` : `Mes ${i + 1}`;
    
    const entry: any = { period };
    
    teams.forEach(team => {
      entry[team.name] = Math.floor(Math.random() * 3000) + 1000;
    });
    
    data.push(entry);
  }
  
  return data;
};

export const getManagersList = (): string[] => {
  return employees.map(emp => emp.name);
};

export const getTeamPerformanceAnalytics = (teamId: number, timeframe: TimeframeType) => {
  const teamEmployees = employees.filter(emp => emp.teamId === teamId);
  const total = calculateTeamTotal(teamId, timeframe);
  const average = total / teamEmployees.length;
  const target = teams.find(t => t.id === teamId)?.target[timeframe] || 0;
  const progress = (total / target) * 100;
  
  return {
    total,
    average,
    target,
    progress: Math.min(progress, 100),
    employeeCount: teamEmployees.length,
    topPerformer: teamEmployees.reduce((best, emp) => 
      calculateEmployeeTotal(emp.id, timeframe) > calculateEmployeeTotal(best.id, timeframe) ? emp : best
    )
  };
};

export const getSystemAlerts = () => {
  const alerts = [];
  const now = new Date();
  
  teams.forEach(team => {
    const analytics = getTeamPerformanceAnalytics(team.id, 'daily');
    if (analytics.progress < 50) {
      alerts.push({
        id: `team-${team.id}-low`,
        type: 'warning',
        title: `${team.name} bajo rendimiento`,
        message: `Solo ${analytics.progress.toFixed(1)}% de la meta diaria`,
        timestamp: now
      });
    }
  });
  
  employees.forEach(emp => {
    if (calculateEmployeeTotal(emp.id, 'daily') === 0) {
      alerts.push({
        id: `emp-${emp.id}-inactive`,
        type: 'info',
        title: 'Gestor inactivo',
        message: `${emp.name} no ha registrado cobros hoy`,
        timestamp: now
      });
    }
  });
  
  return alerts.slice(0, 5);
};
