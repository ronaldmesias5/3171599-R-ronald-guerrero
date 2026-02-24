import React, { useState, useEffect } from 'react';
import type { Project, ProjectStatus } from '../types';
import { fetchProjects, searchProjects } from '../utils/api';

// ============================================
// COMPONENTE: ProjectList
// Muestra la lista de proyectos del portafolio con búsqueda y filtros
// ============================================

// QUÉ: mapa de etiquetas legibles para cada estado de proyecto
// PARA: evitar mostrar valores internos como "in_progress" en la UI
// IMPACTO: la interfaz muestra texto claro en español para el usuario
const STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: 'En Planificación',
  in_progress: 'En Progreso',
  on_hold: 'En Pausa',
  completed: 'Completado',
  cancelled: 'Cancelado',
};

// QUÉ: mapa de colores para el badge de estado de cada proyecto
// PARA: dar retroalimentación visual inmediata del estado del proyecto
// IMPACTO: el usuario identifica el estado de un vistazo sin leer el texto
const STATUS_COLORS: Record<ProjectStatus, string> = {
  planning: '#3498db',
  in_progress: '#2ecc71',
  on_hold: '#f39c12',
  completed: '#9b59b6',
  cancelled: '#e74c3c',
};

export const ProjectList: React.FC = () => {
  // Estado principal: lista de proyectos recibidos del servidor
  const [projects, setProjects] = useState<Project[]>([]);
  // Estado de carga inicial (primera vez que montamos el componente)
  const [loading, setLoading] = useState<boolean>(true);
  // Estado de error para mostrar mensajes descriptivos al usuario
  const [error, setError] = useState<string | null>(null);
  // Estado del campo de búsqueda libre
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Estado del filtro de estado del proyecto
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');

  // ============================================
  // EFECTO 1: Carga inicial de proyectos
  // ============================================

  // QUÉ: efecto que ejecuta el fetch de proyectos al montar el componente
  // PARA: poblar la lista tan pronto como el componente aparece en pantalla
  // IMPACTO: sin este efecto, el dashboard estaría vacío al abrir la app
  useEffect(() => {
    // Creamos un AbortController para poder cancelar el fetch si el componente
    // se desmonta antes de que llegue la respuesta (evita memory leaks y
    // updates en componentes desmontados)
    const controller = new AbortController();

    const loadProjects = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProjects(controller.signal);
        setProjects(data);
      } catch (err) {
        // Si el error es un AbortError, es porque navegamos a otra página:
        // no mostramos error al usuario, simplemente ignoramos
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message || 'Error al cargar los proyectos');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProjects();

    // Cleanup: cancela el fetch si el componente se desmonta
    return () => {
      controller.abort();
    };
  }, []); // Array vacío: solo se ejecuta al montar

  // ============================================
  // EFECTO 2: Búsqueda y filtrado reactivo
  // ============================================

  // QUÉ: efecto que reactiva la búsqueda cuando cambian query o filtro de estado
  // PARA: actualizar la lista automáticamente mientras el usuario escribe sin
  //       tener que presionar un botón de "Buscar"
  // IMPACTO: experiencia de búsqueda en tiempo real con debounce de 400ms
  useEffect(() => {
    // Si no hay query ni filtro activo, mostramos todos los proyectos originales
    if (searchQuery.trim() === '' && statusFilter === 'all') return;

    const controller = new AbortController();
    let debounceTimer: ReturnType<typeof setTimeout>;

    const runSearch = (): void => {
      // Debounce: esperamos 400ms después del último keystroke para hacer el fetch
      // Esto evita hacer una petición por cada letra que escribe el usuario
      debounceTimer = setTimeout(async () => {
        try {
          const results = await searchProjects(
            { query: searchQuery, status: statusFilter, priority: 'all' },
            controller.signal,
          );
          setProjects(results);
        } catch (err) {
          if (err instanceof Error && err.name !== 'AbortError') {
            setError(err.message);
          }
        }
      }, 400);
    };

    runSearch();

    // Cleanup: cancela debounce y abort controller al cambiar params
    return () => {
      clearTimeout(debounceTimer);
      controller.abort();
    };
  }, [searchQuery, statusFilter]); // Se re-ejecuta cuando cambia la búsqueda o el filtro

  // ============================================
  // Handlers
  // ============================================

  // Resetea la búsqueda y recarga todos los proyectos
  const handleClearSearch = (): void => {
    setSearchQuery('');
    setStatusFilter('all');
    // Recargamos todos los proyectos cuando se limpia la búsqueda
    setLoading(true);
    fetchProjects()
      .then(setProjects)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // ============================================
  // Renderizado condicional: loading inicial
  // ============================================
  if (loading) {
    return (
      <div className="project-list">
        <h2>📂 Portafolio de Proyectos</h2>
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Cargando proyectos del portafolio...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // Renderizado condicional: error
  // ============================================
  if (error) {
    return (
      <div className="project-list">
        <h2>📂 Portafolio de Proyectos</h2>
        <div className="error-state">
          <p>⚠️ {error}</p>
          <button
            className="btn-retry"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // Renderizado principal
  // ============================================
  return (
    <div className="project-list">
      <div className="project-list-header">
        <h2>📂 Portafolio de Proyectos</h2>
        <span className="project-count">{projects.length} proyectos</span>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="project-filters">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre o cliente..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="status-select"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as ProjectStatus | 'all')
          }
        >
          <option value="all">Todos los estados</option>
          {(Object.keys(STATUS_LABELS) as ProjectStatus[]).map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>

        {(searchQuery || statusFilter !== 'all') && (
          <button className="btn-clear" onClick={handleClearSearch}>
            ✕ Limpiar
          </button>
        )}
      </div>

      {/* Lista de tarjetas de proyecto */}
      {projects.length === 0 ? (
        <p className="no-results">
          No se encontraron proyectos con los filtros actuales.
        </p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              {/* Encabezado: nombre y badge de estado */}
              <div className="project-card-header">
                <h3 className="project-name">{project.name}</h3>
                <span
                  className="status-badge"
                  style={{
                    backgroundColor: STATUS_COLORS[project.status],
                  }}
                >
                  {STATUS_LABELS[project.status]}
                </span>
              </div>

              {/* Cliente y tipo de servicio */}
              <p className="project-client">🏢 {project.client}</p>
              <p className="project-description">{project.description}</p>

              {/* Barra de progreso */}
              <div className="progress-container">
                <div className="progress-info">
                  <span>Progreso</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p className="tasks-info">
                  {project.tasksCompleted} / {project.tasksTotal} tareas completadas
                </p>
              </div>

              {/* Equipo asignado */}
              <div className="team-section">
                <span className="team-label">Equipo:</span>
                <div className="team-avatars">
                  {project.teamMembers.map((member) => (
                    <span
                      key={member.id}
                      className="avatar"
                      title={`${member.name} — ${member.role}`}
                    >
                      {member.avatarInitials}
                    </span>
                  ))}
                </div>
              </div>

              {/* Presupuesto y fechas */}
              <div className="project-meta">
                <span>💰 ${project.budget.toLocaleString()}</span>
                <span>
                  📅 {project.startDate} → {project.endDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
