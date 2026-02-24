// ============================================
// FUNCIONES DE API Y DATOS MOCK
// Sistema de Gestión de Proyectos Colaborativos
// Servicios Profesionales
// ============================================

import type {
  Project,
  ProjectStats,
  TeamActivity,
  ProjectFilters,
} from '../types';

// ============================================
// HELPER: Simula latencia de red
// ============================================

// QUÉ: función helper que retorna una promesa que resuelve después de 'ms' milisegundos
// PARA: simular la latencia real de una API en los datos mock
// IMPACTO: los componentes experimentan estados de loading realistas
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ============================================
// DATOS MOCK: Proyectos
// ============================================

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Transformación Digital Banca Retail',
    client: 'Grupo Financiero Atlántico',
    description:
      'Modernización completa de la plataforma core bancaria, migración a microservicios y rediseño de la experiencia de cliente en canales digitales.',
    status: 'in_progress',
    priority: 'critical',
    serviceType: 'consulting',
    startDate: '2026-01-10',
    endDate: '2026-07-31',
    budget: 280000,
    progress: 42,
    teamMembers: [
      { id: 1, name: 'Sofía Ramírez', role: 'Project Manager', avatarInitials: 'SR' },
      { id: 2, name: 'Diego Torres', role: 'Tech Lead', avatarInitials: 'DT' },
      { id: 3, name: 'Valeria Núñez', role: 'Consultora Senior', avatarInitials: 'VN' },
    ],
    tasksTotal: 120,
    tasksCompleted: 50,
  },
  {
    id: 2,
    name: 'Plataforma E-Learning Corporativo',
    client: 'Constructora Meridian S.A.',
    description:
      'Desarrollo de plataforma LMS a medida para capacitación de 2,000 empleados con módulos de seguridad industrial, liderazgo y normativas.',
    status: 'in_progress',
    priority: 'high',
    serviceType: 'development',
    startDate: '2026-02-01',
    endDate: '2026-06-15',
    budget: 95000,
    progress: 68,
    teamMembers: [
      { id: 4, name: 'Carlos Herrera', role: 'Full-Stack Developer', avatarInitials: 'CH' },
      { id: 5, name: 'Mariana Lozano', role: 'UX Designer', avatarInitials: 'ML' },
    ],
    tasksTotal: 64,
    tasksCompleted: 43,
  },
  {
    id: 3,
    name: 'Auditoría de Seguridad Cloud',
    client: 'Aseguradora Nacional',
    description:
      'Revisión integral de infraestructura AWS: análisis de vulnerabilidades, pruebas de penetración y entrega de plan de remediación.',
    status: 'planning',
    priority: 'high',
    serviceType: 'audit',
    startDate: '2026-03-01',
    endDate: '2026-04-30',
    budget: 48000,
    progress: 10,
    teamMembers: [
      { id: 6, name: 'Andrés Molina', role: 'Security Analyst', avatarInitials: 'AM' },
    ],
    tasksTotal: 38,
    tasksCompleted: 4,
  },
  {
    id: 4,
    name: 'Rediseño de Sistema ERP Logístico',
    client: 'Distribuidora Pacífico Norte',
    description:
      'Actualización y rediseño de módulos de inventario, despacho y trazabilidad en SAP B1 para optimizar los flujos de 12 centros de distribución.',
    status: 'in_progress',
    priority: 'medium',
    serviceType: 'consulting',
    startDate: '2025-11-01',
    endDate: '2026-04-15',
    budget: 130000,
    progress: 81,
    teamMembers: [
      { id: 7, name: 'Lorena Castillo', role: 'ERP Consultant', avatarInitials: 'LC' },
      { id: 3, name: 'Valeria Núñez', role: 'Consultora Senior', avatarInitials: 'VN' },
    ],
    tasksTotal: 92,
    tasksCompleted: 74,
  },
  {
    id: 5,
    name: 'Design System Corporativo',
    client: 'Holding Tecnología Andina',
    description:
      'Creación de un design system unificado (tokens, componentes, guidelines) aplicable a las 6 unidades de negocio del holding.',
    status: 'in_progress',
    priority: 'medium',
    serviceType: 'design',
    startDate: '2026-01-20',
    endDate: '2026-05-20',
    budget: 62000,
    progress: 55,
    teamMembers: [
      { id: 5, name: 'Mariana Lozano', role: 'UX Designer', avatarInitials: 'ML' },
      { id: 8, name: 'Tomás Vega', role: 'UI Developer', avatarInitials: 'TV' },
    ],
    tasksTotal: 48,
    tasksCompleted: 26,
  },
  {
    id: 6,
    name: 'Migración a Azure DevOps',
    client: 'Minera Cóndor S.A.',
    description:
      'Migración de 30+ repositorios SVN a Git, configuración de pipelines CI/CD y capacitación del equipo interno en prácticas DevOps.',
    status: 'completed',
    priority: 'high',
    serviceType: 'training',
    startDate: '2025-10-01',
    endDate: '2026-01-31',
    budget: 74000,
    progress: 100,
    teamMembers: [
      { id: 2, name: 'Diego Torres', role: 'Tech Lead', avatarInitials: 'DT' },
      { id: 9, name: 'Camila Reyes', role: 'DevOps Engineer', avatarInitials: 'CR' },
    ],
    tasksTotal: 56,
    tasksCompleted: 56,
  },
  {
    id: 7,
    name: 'Consultoría Agile a Escala',
    client: 'Empresa de Telecomunicaciones Cenit',
    description:
      'Implementación del marco SAFe (Scaled Agile Framework) en 4 trenes de 60 personas cada uno. Incluye coaching y certificación.',
    status: 'on_hold',
    priority: 'high',
    serviceType: 'consulting',
    startDate: '2026-02-10',
    endDate: '2026-09-30',
    budget: 210000,
    progress: 15,
    teamMembers: [
      { id: 1, name: 'Sofía Ramírez', role: 'Project Manager', avatarInitials: 'SR' },
      { id: 10, name: 'Rodrigo Pinto', role: 'Agile Coach', avatarInitials: 'RP' },
    ],
    tasksTotal: 100,
    tasksCompleted: 15,
  },
  {
    id: 8,
    name: 'App Móvil de Turnos y Servicios',
    client: 'Red de Clínicas Salud Total',
    description:
      'Desarrollo de app iOS/Android para agendamiento de citas, resultados de exámenes y teleconsulta para 250,000 pacientes.',
    status: 'planning',
    priority: 'critical',
    serviceType: 'development',
    startDate: '2026-03-15',
    endDate: '2026-11-15',
    budget: 320000,
    progress: 5,
    teamMembers: [
      { id: 4, name: 'Carlos Herrera', role: 'Full-Stack Developer', avatarInitials: 'CH' },
      { id: 8, name: 'Tomás Vega', role: 'UI Developer', avatarInitials: 'TV' },
      { id: 9, name: 'Camila Reyes', role: 'DevOps Engineer', avatarInitials: 'CR' },
    ],
    tasksTotal: 160,
    tasksCompleted: 8,
  },
];

// ============================================
// FUNCIONES DE FETCH
// ============================================

/**
 * Obtiene la lista completa de proyectos
 * Soporta AbortController para cancelar la petición si el componente se desmonta
 *
 * @param signal - AbortSignal para cancelar la petición en cleanup de useEffect
 * @returns Promise con array de proyectos
 */
export const fetchProjects = async (
  signal?: AbortSignal,
): Promise<Project[]> => {
  // Simula latencia de red realista (600-1000ms)
  await delay(900);

  // Si el componente fue desmontado antes de completar, aborta silenciosamente
  if (signal?.aborted) {
    throw new DOMException('Request aborted', 'AbortError');
  }

  return MOCK_PROJECTS;
};

/**
 * Busca y filtra proyectos según criterios
 * Se usa cuando el usuario escribe en el buscador o aplica filtros
 *
 * @param filters - Filtros de búsqueda: query, status, priority
 * @param signal  - AbortSignal para cancelación (útil con debounce)
 * @returns Promise con proyectos que coinciden con los filtros
 */
export const searchProjects = async (
  filters: ProjectFilters,
  signal?: AbortSignal,
): Promise<Project[]> => {
  // Simula latencia de búsqueda
  await delay(400);

  if (signal?.aborted) {
    throw new DOMException('Request aborted', 'AbortError');
  }

  return MOCK_PROJECTS.filter((project) => {
    // Filtro por texto: busca en nombre, cliente y descripción
    const matchesQuery =
      filters.query.trim() === '' ||
      project.name.toLowerCase().includes(filters.query.toLowerCase()) ||
      project.client.toLowerCase().includes(filters.query.toLowerCase());

    // Filtro por estado
    const matchesStatus =
      filters.status === 'all' || project.status === filters.status;

    // Filtro por prioridad
    const matchesPriority =
      filters.priority === 'all' || project.priority === filters.priority;

    return matchesQuery && matchesStatus && matchesPriority;
  });
};

/**
 * Obtiene el resumen estadístico del portafolio
 * Llamado por StatsCard con múltiples useEffect independientes
 *
 * @returns Promise con estadísticas calculadas del portafolio
 */
export const fetchProjectStats = async (): Promise<ProjectStats> => {
  await delay(700);

  const totalProjects = MOCK_PROJECTS.length;
  const activeProjects = MOCK_PROJECTS.filter(
    (p) => p.status === 'in_progress',
  ).length;
  const completedThisMonth = MOCK_PROJECTS.filter(
    (p) => p.status === 'completed',
  ).length;

  const totalTasks = MOCK_PROJECTS.reduce((sum, p) => sum + p.tasksTotal, 0);
  const completedTasks = MOCK_PROJECTS.reduce(
    (sum, p) => sum + p.tasksCompleted,
    0,
  );
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalBudget = MOCK_PROJECTS.reduce((sum, p) => sum + p.budget, 0);

  // Simula utilización del equipo (varía ligeramente en cada llamada)
  const utilizationRate = Math.min(
    100,
    Math.round(75 + (Math.random() * 10 - 5)),
  );

  return {
    totalProjects,
    activeProjects,
    completedThisMonth,
    completionRate,
    totalBudget,
    utilizationRate,
  };
};

/**
 * Obtiene actividad del equipo en tiempo real
 * Llamado cada 5 segundos por RealTimeIndicator mediante polling
 * Los valores varían aleatoriamente para simular actividad real
 *
 * @returns Promise con snapshot de actividad actual del equipo
 */
export const fetchTeamActivity = async (): Promise<TeamActivity> => {
  await delay(300);

  // Simula variaciones naturales de actividad del equipo
  const activeSessions = Math.floor(Math.random() * 5) + 6;     // 6-10 sesiones
  const pendingTasks = Math.floor(Math.random() * 8) + 3;        // 3-10 tareas pendientes
  const tasksCompletedToday = Math.floor(Math.random() * 10) + 8; // 8-17 tareas hoy
  const teamOnline = Math.floor(Math.random() * 4) + 5;           // 5-8 personas online

  return {
    activeSessions,
    pendingTasks,
    tasksCompletedToday,
    teamOnline,
    lastUpdated: new Date().toISOString(),
  };
};
