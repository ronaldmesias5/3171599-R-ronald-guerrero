// ============================================
// TIPOS E INTERFACES DEL DOMINIO
// Sistema de Gestión de Proyectos Colaborativos
// Servicios Profesionales
// ============================================

// QUÉ: tipos que modelan las entidades del sistema de gestión de proyectos
// PARA: garantizar que TypeScript valide la estructura de datos en tiempo de compilación
// IMPACTO: cualquier componente que use estos tipos recibirá autocompletado y errores claros

/**
 * Prioridad de un proyecto en la organización
 */
export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical';

/**
 * Estado actual del ciclo de vida de un proyecto
 */
export type ProjectStatus =
  | 'planning'
  | 'in_progress'
  | 'on_hold'
  | 'completed'
  | 'cancelled';

/**
 * Tipo de servicio profesional que ofrece el proyecto
 */
export type ServiceType =
  | 'consulting'
  | 'development'
  | 'design'
  | 'audit'
  | 'training';

/**
 * Representa un miembro del equipo asignado a un proyecto
 */
export interface TeamMember {
  id: number;
  name: string;
  role: string;        // ej: "Tech Lead", "Diseñador UX", "Consultor Senior"
  avatarInitials: string; // ej: "MS" para María Sánchez
}

/**
 * Entidad principal: un proyecto de servicios profesionales
 */
export interface Project {
  id: number;
  name: string;
  client: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  serviceType: ServiceType;
  startDate: string;        // formato ISO "YYYY-MM-DD"
  endDate: string;          // formato ISO "YYYY-MM-DD"
  budget: number;           // en USD
  progress: number;         // porcentaje 0-100
  teamMembers: TeamMember[];
  tasksTotal: number;
  tasksCompleted: number;
}

/**
 * Estadísticas globales del portafolio de proyectos
 */
export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedThisMonth: number;
  completionRate: number;   // porcentaje global de tareas completadas
  totalBudget: number;      // presupuesto total gestionado en USD
  utilizationRate: number;  // porcentaje de capacidad del equipo utilizada
}

/**
 * Actividad del equipo en tiempo real
 * Se actualiza mediante polling cada 5 segundos
 */
export interface TeamActivity {
  activeSessions: number;       // colaboradores conectados ahora
  pendingTasks: number;         // tareas sin asignar o bloqueadas
  tasksCompletedToday: number;  // tareas cerradas en las últimas 24h
  teamOnline: number;           // personas trabajando en este momento
  lastUpdated: string;          // timestamp ISO de la última actualización
}

/**
 * Tipo genérico para manejar estados de peticiones asíncronas
 * Reutilizable en todos los componentes que hacen fetch
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Filtros para buscar y filtrar la lista de proyectos
 */
export interface ProjectFilters {
  query: string;
  status: ProjectStatus | 'all';
  priority: ProjectPriority | 'all';
}
