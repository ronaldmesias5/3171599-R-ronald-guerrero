// ============================================
// TIPOS E INTERFACES - PROYECTOS COLABORATIVOS
// ============================================
// Dominio: Sistema de gestión de proyectos colaborativos / Servicios Profesionales

// QUÉ: Define la forma de un proyecto del portafolio
// PARA: Garantizar que todos los proyectos tengan las mismas propiedades
// IMPACTO: TypeScript valida que no haya datos faltantes o incorrectos
export interface Project {
  id: number;
  name: string;           // Nombre del proyecto
  client: string;         // Cliente/organización
  serviceType: ServiceType; // Tipo de servicio
  status: ProjectStatus;  // Estado actual
  priority: ProjectPriority; // Prioridad
  budget: number;         // Presupuesto en USD
  progress: number;       // Porcentaje 0-100
  teamSize: number;       // Cantidad de miembros en el equipo
  startDate: string;      // Fecha inicio (ISO)
  endDate: string;        // Fecha fin (ISO)
  createdAt: string;      // Fecha de creación
}

// QUÉ: Tipos de servicios que ofrece la empresa
// PARA: Categorizar proyectos según el tipo
// IMPACTO: Permite filtrar proyectos por servicio
export type ServiceType = 'consulting' | 'development' | 'design' | 'audit' | 'training';

// QUÉ: Estados posibles de un proyecto
// PARA: Identificar en qué fase se encuentra cada proyecto
// IMPACTO: Permite filtros por estado y colorear tarjetas
export type ProjectStatus = 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';

// QUÉ: Nivel de urgencia del proyecto
// PARA: Identificar qué proyectos requieren atención inmediata
// IMPACTO: Permite ordenamiento por prioridad y destacar urgentes
export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical';

// Categorías para filtrado
export type Category = 'all' | 'consulting' | 'development' | 'design' | 'audit' | 'training';

// Opciones de ordenamiento
export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'budget-asc'
  | 'budget-desc'
  | 'progress-desc'
  | 'startDate-desc';

// Estado de los filtros
export interface FilterState {
  searchTerm: string;
  serviceType: Category;
  status: ProjectStatus | 'all';
  priority: ProjectPriority | 'all';
  sortBy: SortOption;
}
