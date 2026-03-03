// ============================================
// COMPONENTE: ItemList
// ============================================
// Renderiza la lista de proyectos con renderizado condicional

import React from 'react';
import { Project } from '../types';
import { ItemCard } from './ItemCard';
import { EmptyState } from './EmptyState';

interface ItemListProps {
  items: Project[];
  isLoading?: boolean;
  error?: string | null;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
  onClearFilters?: () => void;
}

/**
 * Lista de proyectos del catálogo
 * Implementa renderizado condicional: loading, error, vacío
 */
export const ItemList: React.FC<ItemListProps> = ({
  items,
  isLoading = false,
  error = null,
  onDelete,
  onView,
  onClearFilters,
}) => {
  // Renderizado condicional 1: Si está cargando
  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>⏳ Cargando proyectos...</p>
      </div>
    );
  }

  // Renderizado condicional 2: Si hay error
  if (error) {
    return (
      <div className="error">
        <p>❌ {error}</p>
      </div>
    );
  }

  // Renderizado condicional 3: Si no hay proyectos
  if (items.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  // Renderizado condicional 4: Mostrar lista con .map() y keys únicas
  return (
    <div className="item-list">
      {items.map((project) => (
        <ItemCard
          key={project.id}  // ← Key única basada en id, nunca index
          item={project}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};
