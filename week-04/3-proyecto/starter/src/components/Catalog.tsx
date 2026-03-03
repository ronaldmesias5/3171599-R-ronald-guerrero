// ============================================
// COMPONENTE: Catalog (Principal)
// ============================================
// Orquesta todos los componentes del catálogo de proyectos

import React, { useState, useMemo } from 'react';
import { Project, Category, SortOption, ProjectStatus, ProjectPriority } from '../types';
import { projects as initialProjects } from '../data/items';
import { useDebounce } from '../hooks/useDebounce';
import { SearchBar } from './SearchBar';
import { FilterPanel } from './FilterPanel';
import { SortSelector } from './SortSelector';
import { ItemList } from './ItemList';
import '../styles/catalog.css';

/**
 * Componente principal del catálogo de proyectos
 */
export const Catalog: React.FC = () => {
  // ============================================
  // ESTADOS
  // ============================================

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedServiceType, setSelectedServiceType] = useState<Category>('all');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<ProjectPriority | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  // Debounce para búsqueda (300ms)
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // ============================================
  // PROCESAMIENTO DE DATOS CON FILTROS
  // ============================================

  // QUÉ: Procesa proyectos aplicando búsqueda, filtros y ordenamiento
  // PARA: Mostrar solo los proyectos que cumplen los criterios del usuario
  // IMPACTO: useMemo evita recalcular innecesariamente en cada render
  const processedProjects = useMemo(() => {
    let result = [...projects];

    // 1. Filtrar por búsqueda (nombre y cliente)
    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter((project) =>
        project.name.toLowerCase().includes(term) ||
        project.client.toLowerCase().includes(term)
      );
    }

    // 2. Filtrar por tipo de servicio
    if (selectedServiceType !== 'all') {
      result = result.filter((project) => project.serviceType === selectedServiceType);
    }

    // 3. Filtrar por estado
    if (selectedStatus !== 'all') {
      result = result.filter((project) => project.status === selectedStatus);
    }

    // 4. Filtrar por prioridad
    if (selectedPriority !== 'all') {
      result = result.filter((project) => project.priority === selectedPriority);
    }

    // 5. Ordenar (sin mutar array original)
    const sortedResult = [...result];
    switch (sortBy) {
      case 'name-asc':
        sortedResult.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedResult.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'budget-asc':
        sortedResult.sort((a, b) => a.budget - b.budget);
        break;
      case 'budget-desc':
        sortedResult.sort((a, b) => b.budget - a.budget);
        break;
      case 'progress-desc':
        sortedResult.sort((a, b) => b.progress - a.progress);
        break;
      case 'startDate-desc':
        sortedResult.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        break;
    }

    return sortedResult;
  }, [projects, debouncedSearchTerm, selectedServiceType, selectedStatus, selectedPriority, sortBy]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleDelete = (id: number): void => {
    if (window.confirm('¿Estás seguro de eliminar este proyecto?')) {
      setProjects((prev) => prev.filter((project) => project.id !== id));
    }
  };

  const handleView = (id: number): void => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      alert(`Proyecto: ${project.name}\nCliente: ${project.client}\nPresupuesto: $${project.budget.toLocaleString()}`);
    }
  };

  const clearFilters = (): void => {
    setSearchTerm('');
    setSelectedServiceType('all');
    setSelectedStatus('all');
    setSelectedPriority('all');
    setSortBy('name-asc');
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="catalog">
      <header className="catalog-header">
        <h1>🗂️ ProCatalog - Portafolio de Proyectos</h1>
        <p className="header-subtitle">Sistema de Gestión de Proyectos Colaborativos · Servicios Profesionales</p>
      </header>

      {/* Barra de búsqueda */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar proyectos por nombre, cliente..."
      />

      {/* Filtros y ordenamiento */}
      <div className="controls">
        <FilterPanel
          selectedServiceType={selectedServiceType}
          onServiceTypeChange={setSelectedServiceType}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          onClearFilters={clearFilters}
        />

        <SortSelector
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      {/* Contador de resultados */}
      <p className="results-count">
        📊 Mostrando <strong>{processedProjects.length}</strong> de <strong>{projects.length}</strong> proyectos
        {debouncedSearchTerm && ` para "${debouncedSearchTerm}"`}
      </p>

      {/* Lista de proyectos */}
      <ItemList
        items={processedProjects}
        isLoading={isLoading}
        error={error}
        onDelete={handleDelete}
        onView={handleView}
        onClearFilters={clearFilters}
      />
    </div>
  );
};

export default Catalog;
