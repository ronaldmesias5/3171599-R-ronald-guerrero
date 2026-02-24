import React, { useState, useEffect } from 'react';
import type { ProjectStats } from '../types';
import { fetchProjectStats } from '../utils/api';

// ============================================
// COMPONENTE: ProjectStatsCard
// Muestra métricas clave del portafolio de proyectos
// con múltiples useEffect independientes para cada grupo de stats
// ============================================

// QUÉ: helper para formatear valores monetarios en USD de forma legible
// PARA: mostrar el presupuesto total sin notación científica
// IMPACTO: mejora la legibilidad de cifras grandes (ej: "$1.2M" en vez de "$1219000")
const formatCurrency = (amount: number): string => {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount}`;
};

export const ProjectStatsCard: React.FC = () => {
  // ============================================
  // Estados para métricas de volumen
  // ============================================
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [activeProjects, setActiveProjects] = useState<number>(0);
  const [completedThisMonth, setCompletedThisMonth] = useState<number>(0);

  // ============================================
  // Estados para métricas de rendimiento
  // ============================================
  const [completionRate, setCompletionRate] = useState<number>(0);
  const [utilizationRate, setUtilizationRate] = useState<number>(0);
  const [totalBudget, setTotalBudget] = useState<number>(0);

  // Estados de carga por grupo de stats
  const [loadingVolume, setLoadingVolume] = useState<boolean>(true);
  const [loadingPerformance, setLoadingPerformance] = useState<boolean>(true);

  // ============================================
  // EFECTO 1: Métricas de volumen (cuántos proyectos)
  // ============================================

  // QUÉ: carga las métricas de cantidad al montar el componente
  // PARA: mostrar cuántos proyectos existen en total, activos y completados
  // IMPACTO: permite saber de un vistazo el tamaño del portafolio actual
  useEffect(() => {
    const loadVolumeStats = async (): Promise<void> => {
      try {
        setLoadingVolume(true);
        const stats: ProjectStats = await fetchProjectStats();
        setTotalProjects(stats.totalProjects);
        setActiveProjects(stats.activeProjects);
        setCompletedThisMonth(stats.completedThisMonth);
      } catch (err) {
        console.error('Error cargando métricas de volumen:', err);
      } finally {
        setLoadingVolume(false);
      }
    };

    loadVolumeStats();
  }, []); // Sin dependencias: carga solo al montar

  // ============================================
  // EFECTO 2: Métricas de rendimiento y presupuesto
  // ============================================

  // QUÉ: carga las métricas de eficiencia y presupuesto de forma independiente
  // PARA: separar responsabilidades y permitir que cada sección cargue a su ritmo
  // IMPACTO: si una sección falla, la otra sigue funcionando correctamente
  useEffect(() => {
    const loadPerformanceStats = async (): Promise<void> => {
      try {
        setLoadingPerformance(true);
        const stats: ProjectStats = await fetchProjectStats();
        setCompletionRate(stats.completionRate);
        setUtilizationRate(stats.utilizationRate);
        setTotalBudget(stats.totalBudget);
      } catch (err) {
        console.error('Error cargando métricas de rendimiento:', err);
      } finally {
        setLoadingPerformance(false);
      }
    };

    loadPerformanceStats();
  }, []); // Efecto independiente del primero

  // ============================================
  // Renderizado principal
  // ============================================
  return (
    <div className="stats-card">
      <h2>📊 Estadísticas del Portafolio</h2>

      {/* Sección 1: Volumen de proyectos */}
      <div className="stats-section">
        <h3 className="stats-section-title">Volumen</h3>
        {loadingVolume ? (
          <p className="stats-loading">Cargando métricas...</p>
        ) : (
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{totalProjects}</div>
              <div className="stat-label">Total Proyectos</div>
            </div>
            <div className="stat-item stat-highlight">
              <div className="stat-value">{activeProjects}</div>
              <div className="stat-label">En Progreso</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{completedThisMonth}</div>
              <div className="stat-label">Completados</div>
            </div>
          </div>
        )}
      </div>

      {/* Sección 2: Rendimiento y presupuesto */}
      <div className="stats-section">
        <h3 className="stats-section-title">Rendimiento</h3>
        {loadingPerformance ? (
          <p className="stats-loading">Cargando métricas...</p>
        ) : (
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{completionRate}%</div>
              <div className="stat-label">Tasa Completitud</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{utilizationRate}%</div>
              <div className="stat-label">Utilización Equipo</div>
            </div>
            <div className="stat-item stat-budget">
              <div className="stat-value">{formatCurrency(totalBudget)}</div>
              <div className="stat-label">Presupuesto Total</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
