// ============================================
// COMPONENTE: ItemCard
// ============================================
// Muestra una tarjeta con información detallada de un proyecto

import React from 'react';
import { Project } from '../types';

interface ItemCardProps {
  item: Project;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

// Mapa de colores para estados
const STATUS_COLORS: Record<string, string> = {
  planning: '#fbbf24',      // Amarillo
  in_progress: '#60a5fa',   // Azul
  on_hold: '#f97316',       // Naranja
  completed: '#10b981',     // Verde
  cancelled: '#ef4444',     // Rojo
};

// Mapa de emojis para estados
const STATUS_EMOJIS: Record<string, string> = {
  planning: '📋',
  in_progress: '⚙️',
  on_hold: '⏸️',
  completed: '✅',
  cancelled: '❌',
};

// Mapa de emojis para tipos de servicio
const SERVICE_EMOJIS: Record<string, string> = {
  consulting: '📊',
  development: '💻',
  design: '🎨',
  audit: '🔍',
  training: '📚',
};

/**
 * Tarjeta individual de proyecto con información detallada
 */
export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onDelete,
  onView,
}) => {
  // QUÉ: Calcula los colores dinámicos según la prioridad
  // PARA: Mostrar visualmente qué proyectos son críticos
  // IMPACTO: Mejora la legibilidad y experiencia del usuario
  const getPriorityColor = (): string => {
    switch (item.priority) {
      case 'critical':
        return '#dc2626';
      case 'high':
        return '#ea580c';
      case 'medium':
        return '#eab308';
      case 'low':
        return '#6ee7b7';
    }
  };

  const getPriorityLabel = (): string => {
    switch (item.priority) {
      case 'critical':
        return '🔥 Crítica';
      case 'high':
        return '⚠️ Alta';
      case 'medium':
        return '⭐ Media';
      case 'low':
        return '💚 Baja';
    }
  };

  return (
    <div className="item-card" style={{ borderLeftColor: getPriorityColor() }}>
      {/* Header: Nombre y estado */}
      <div className="card-header">
        <div>
          <h3 className="card-title">{item.name}</h3>
          <p className="card-client">por <strong>{item.client}</strong></p>
        </div>
        <div className="card-status" style={{ backgroundColor: STATUS_COLORS[item.status] }}>
          <span>{STATUS_EMOJIS[item.status]}</span>
          <span>{item.status.replace('_', ' ').charAt(0).toUpperCase() + item.status.slice(1).replace('_', ' ')}</span>
        </div>
      </div>

      {/* Badges: Tipo de servicio y prioridad */}
      <div className="card-badges">
        <span className="badge service">{SERVICE_EMOJIS[item.serviceType]} {item.serviceType}</span>
        <span className="badge priority" style={{ backgroundColor: getPriorityColor() }}>
          {getPriorityLabel()}
        </span>
      </div>

      {/* Información: Presupuesto y equipo */}
      <div className="card-info">
        <div className="info-item">
          <span className="info-label">💰 Presupuesto:</span>
          <span className="info-value">${item.budget.toLocaleString()}</span>
        </div>
        <div className="info-item">
          <span className="info-label">👥 Equipo:</span>
          <span className="info-value">{item.teamSize} personas</span>
        </div>
        <div className="info-item">
          <span className="info-label">📅 Duración:</span>
          <span className="info-value">{new Date(item.startDate).toLocaleDateString('es')} - {new Date(item.endDate).toLocaleDateString('es')}</span>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${item.progress}%` }}></div>
        </div>
        <span className="progress-label">{item.progress}% completado</span>
      </div>

      {/* Acciones */}
      <div className="card-actions">
        {onView && (
          <button onClick={() => onView(item.id)} className="btn btn-primary">
            👁️ Ver detalles
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(item.id)} className="btn btn-danger">
            🗑️ Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
