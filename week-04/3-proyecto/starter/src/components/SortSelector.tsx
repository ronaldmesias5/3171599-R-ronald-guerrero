// ============================================
// COMPONENTE: SortSelector
// ============================================
// Selector de criterio de ordenamiento sin mutar array

import React from 'react';
import { SortOption } from '../types';
import { sortOptions } from '../data/items';

interface SortSelectorProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

/**
 * Selector de ordenamiento
 * Implementa diferentes criterios de orden para proyectos
 */
export const SortSelector: React.FC<SortSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="sort-selector">
      <label htmlFor="sort">Ordenar por:</label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="sort-select"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
