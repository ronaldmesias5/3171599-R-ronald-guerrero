// ============================================
// COMPONENTE: SearchBar
// ============================================
// Barra de búsqueda en tiempo real con debounce

import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Barra de búsqueda implementando patrón controlado
 * El debounce se aplicará en el componente padre con useDebounce
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
}) => {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
        aria-label="Búsqueda de proyectos"
      />

      {/* Botón para limpiar búsqueda - renderizado condicional */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="clear-button"
          aria-label="Limpiar búsqueda"
          title="Limpiar"
        >
          ✕
        </button>
      )}
    </div>
  );
};
