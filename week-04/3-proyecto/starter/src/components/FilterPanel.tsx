// ============================================
// COMPONENTE: FilterPanel
// ============================================
// Panel con  todos los filtros: tipo de servicio, estado, prioridad

import React from 'react';
import { Category, ProjectStatus, ProjectPriority } from '../types';
import { serviceTypeOptions, statusOptions, priorityOptions } from '../data/items';

interface FilterPanelProps {
  selectedServiceType: Category;
  onServiceTypeChange: (category: Category) => void;
  selectedStatus: ProjectStatus | 'all';
  onStatusChange: (status: ProjectStatus | 'all') => void;
  selectedPriority: ProjectPriority | 'all';
  onPriorityChange: (priority: ProjectPriority | 'all') => void;
  onClearFilters: () => void;
}

/**
 * Panel de filtros del catálogo de proyectos
 */
export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedServiceType,
  onServiceTypeChange,
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  onClearFilters,
}) => {
  return (
    <div className="filter-panel">
      {/* Filtro 1: Tipo de servicio */}
      <div className="filter-group">
        <label htmlFor="serviceType">Tipo de Servicio:</label>
        <select
          id="serviceType"
          value={selectedServiceType}
          onChange={(e) => onServiceTypeChange(e.target.value as Category)}
          className="filter-select"
        >
          {serviceTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro 2: Estado del proyecto */}
      <div className="filter-group">
        <label htmlFor="status">Estado:</label>
        <select
          id="status"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value as ProjectStatus | 'all')}
          className="filter-select"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro 3: Prioridad */}
      <div className="filter-group">
        <label htmlFor="priority">Prioridad:</label>
        <select
          id="priority"
          value={selectedPriority}
          onChange={(e) => onPriorityChange(e.target.value as ProjectPriority | 'all')}
          className="filter-select"
        >
          {priorityOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Botón para limpiar todos los filtros */}
      <button onClick={onClearFilters} className="btn-clear">
        🔄 Limpiar filtros
      </button>
    </div>
  );
};
