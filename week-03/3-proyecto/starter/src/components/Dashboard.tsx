import React from 'react';
import { ProjectList } from './ItemList';
import { ProjectStatsCard } from './StatsCard';
import { TeamActivityIndicator } from './RealTimeIndicator';

// ============================================
// COMPONENTE: Dashboard
// Panel principal del Sistema de Gestión de Proyectos Colaborativos
// Integra: estadísticas, actividad en tiempo real y portafolio de proyectos
// ============================================

export const Dashboard: React.FC = () => {
  // Fecha de hoy formateada para mostrar en el header
  const today = new Date().toLocaleDateString('es', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="dashboard">
      {/* Encabezado principal */}
      <header className="dashboard-header">
        <div className="header-brand">
          <h1>🗂️ ProManager</h1>
          <span className="header-subtitle">
            Sistema de Gestión de Proyectos Colaborativos · Servicios Profesionales
          </span>
        </div>
        <div className="header-date">
          <span>{today}</span>
        </div>
      </header>

      {/* Cuerpo principal del dashboard */}
      <main className="dashboard-main">
        {/* Fila 1: Estadísticas del portafolio + Actividad en tiempo real */}
        <div className="dashboard-row top-row">
          <section className="dashboard-section stats-section">
            <ProjectStatsCard />
          </section>

          <section className="dashboard-section realtime-section">
            <TeamActivityIndicator />
          </section>
        </div>

        {/* Fila 2: Lista completa de proyectos con búsqueda y filtros */}
        <div className="dashboard-row">
          <section className="dashboard-section full-width">
            <ProjectList />
          </section>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="dashboard-footer">
        <p>
          ProManager Dashboard · Week 03 ·{' '}
          <a
            href="https://react.dev/reference/react/useEffect"
            target="_blank"
            rel="noreferrer"
          >
            useEffect Docs
          </a>
        </p>
      </footer>
    </div>
  );
};


