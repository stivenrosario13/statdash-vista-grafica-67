
export const dominicanProvinces = [
  { id: '01', name: 'Distrito Nacional' },
  { id: '02', name: 'Azua' },
  { id: '03', name: 'Baoruco' },
  { id: '04', name: 'Barahona' },
  { id: '05', name: 'Dajabón' },
  { id: '06', name: 'Duarte' },
  { id: '07', name: 'Elías Piña' },
  { id: '08', name: 'El Seibo' },
  { id: '09', name: 'Espaillat' },
  { id: '10', name: 'Hato Mayor' },
  { id: '11', name: 'Hermanas Mirabal' },
  { id: '12', name: 'Independencia' },
  { id: '13', name: 'La Altagracia' },
  { id: '14', name: 'La Romana' },
  { id: '15', name: 'La Vega' },
  { id: '16', name: 'María Trinidad Sánchez' },
  { id: '17', name: 'Monseñor Nouel' },
  { id: '18', name: 'Monte Cristi' },
  { id: '19', name: 'Monte Plata' },
  { id: '20', name: 'Pedernales' },
  { id: '21', name: 'Peravia' },
  { id: '22', name: 'Puerto Plata' },
  { id: '23', name: 'Samaná' },
  { id: '24', name: 'San Cristóbal' },
  { id: '25', name: 'San José de Ocoa' },
  { id: '26', name: 'San Juan' },
  { id: '27', name: 'San Pedro de Macorís' },
  { id: '28', name: 'Sánchez Ramírez' },
  { id: '29', name: 'Santiago' },
  { id: '30', name: 'Santiago Rodríguez' },
  { id: '31', name: 'Santo Domingo' },
  { id: '32', name: 'Valverde' }
];

export const serviceRates = {
  aseo: {
    residencial: 325, // Por apartamento en residenciales
    casa: 325,
    negocio_pequeno: 541,
    negocio_mediano: 650,
    negocio_grande: 1083
  },
  permiso_operacion: {
    negocio_pequeno: 3000,
    negocio_mediano: 5000,
    negocio_grande: 8000,
    negocio_muy_grande: 10000,
    negocio_super_grande: 20000
  },
  letrero: {
    base_rate: 100, // Tarifa base por metro cuadrado
    min_rate: 500   // Tarifa mínima
  },
  rampa: {
    standard_rate: 800 // Tarifa estándar para rampas
  }
};

// Servicios permitidos por tipo de cliente
export const allowedServices = {
  residencial: ['aseo'], // Solo aseo, no letrero, rampa o permiso
  casa: ['aseo'], // Solo aseo, no letrero, rampa o permiso
  negocio_pequeno: ['aseo', 'permiso_operacion', 'letrero', 'rampa'],
  negocio_mediano: ['aseo', 'permiso_operacion', 'letrero', 'rampa'],
  negocio_grande: ['aseo', 'permiso_operacion', 'letrero', 'rampa'],
  negocio_muy_grande: ['aseo', 'permiso_operacion', 'letrero', 'rampa'],
  negocio_super_grande: ['aseo', 'permiso_operacion', 'letrero', 'rampa']
};

// Función para calcular tarifa de letrero basada en dimensiones
export const calculateLetreroRate = (width: number, height: number): number => {
  const area = width * height;
  const calculatedRate = area * serviceRates.letrero.base_rate;
  return Math.max(calculatedRate, serviceRates.letrero.min_rate);
};

// Función para calcular tarifa de aseo para residenciales
export const calculateAseoResidencialRate = (apartments: number): number => {
  return apartments * serviceRates.aseo.residencial;
};
