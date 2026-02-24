import React, { useState, useEffect } from 'react';
import type { TeamActivity } from '../types';
import { fetchTeamActivity } from '../utils/api';

// ============================================
// COMPONENTE: TeamActivityIndicator
// Muestra la actividad del equipo en tiempo real mediante polling
// Se actualiza automáticamente cada 5 segundos
// ============================================

// QUÉ: intervalo de polling en milisegundos
// PARA: centralizar la configuración de temporización en un lugar
// IMPACTO: cambiar este valor modifica la frecuencia de actualización en todo el componente
const POLLING_INTERVAL = 5000; // 5 segundos

export const TeamActivityIndicator: React.FC = () => {
  // Snapshot de actividad del equipo recibido en cada polling
  const [activity, setActivity] = useState<TeamActivity | null>(null);
  // Indica si aún no hemos recibido el primer dato (loading inicial)
  const [loading, setLoading] = useState<boolean>(true);
  // Señal visual para el usuario de que se está actualizando en este momento
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // ============================================
  // EFECTO PRINCIPAL: Polling con setInterval
  // ============================================

  // QUÉ: efecto que configura un ciclo de polling cada 5 segundos
  // PARA: mantener la actividad del equipo actualizada en tiempo real
  //       sin que el usuario tenga que recargar la página manualmente
  // IMPACTO: sin el cleanup (clearInterval), el timer seguiría corriendo
  //          incluso después de navegar a otra página, causando memory leaks
  useEffect(() => {
    // Función que obtiene la actividad actual del equipo
    const loadActivity = async (): Promise<void> => {
      try {
        // Activamos el indicador visual de actualización
        setIsUpdating(true);
        const data = await fetchTeamActivity();
        setActivity(data);
        // Desactivamos el loading inicial en la primera carga exitosa
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener actividad del equipo:', err);
      } finally {
        // Siempre desactivamos el indicador de "actualizando" al terminar
        setIsUpdating(false);
      }
    };

    // Llamada inicial: no esperamos 5 segundos para la primera carga
    loadActivity();

    // Configuramos el polling para llamadas subsecuentes cada 5 segundos
    const intervalId = setInterval(() => {
      loadActivity();
    }, POLLING_INTERVAL);

    // CLEANUP MUY IMPORTANTE:
    // React ejecuta este return cuando el componente se desmonta.
    // Si no limpiamos el intervalo, el timer seguirá ejecutándose e intentará
    // hacer setState en un componente que ya no existe en el DOM → memory leak
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Array vacío: configurar polling solo una vez al montar

  // ============================================
  // Helper: formatea un timestamp ISO a hora local legible
  // ============================================
  const formatTime = (isoString: string): string => {
    return new Date(isoString).toLocaleTimeString('es', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // ============================================
  // Renderizado condicional: loading inicial
  // ============================================
  if (loading) {
    return (
      <div className="team-activity-indicator loading">
        <h2>👥 Actividad del Equipo</h2>
        <p>Conectando con el equipo...</p>
      </div>
    );
  }

  if (!activity) return null;

  // ============================================
  // Renderizado principal
  // ============================================
  return (
    <div className="team-activity-indicator">
      {/* Encabezado con indicador de estado */}
      <div className="indicator-header">
        <h2>👥 Actividad del Equipo</h2>
        {isUpdating ? (
          <span className="updating-badge">🔄 Actualizando...</span>
        ) : (
          <span className="live-badge">🟢 En vivo</span>
        )}
      </div>

      {/* Métricas principales */}
      <div className="activity-grid">
        <div className="activity-metric primary">
          <div className="metric-value">{activity.teamOnline}</div>
          <div className="metric-label">Personas online</div>
        </div>
        <div className="activity-metric">
          <div className="metric-value">{activity.activeSessions}</div>
          <div className="metric-label">Sesiones activas</div>
        </div>
        <div className="activity-metric success">
          <div className="metric-value">{activity.tasksCompletedToday}</div>
          <div className="metric-label">Tareas hoy</div>
        </div>
        <div className="activity-metric warning">
          <div className="metric-value">{activity.pendingTasks}</div>
          <div className="metric-label">Tareas pendientes</div>
        </div>
      </div>

      {/* Footer: timestamp y próxima actualización */}
      <div className="indicator-footer">
        <span className="last-updated">
          Actualizado: {formatTime(activity.lastUpdated)}
        </span>
        <span className="next-update">
          Next update in {POLLING_INTERVAL / 1000}s
        </span>
      </div>
    </div>
  );
};

