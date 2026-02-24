#  ProManager — Sistema de Gestión de Proyectos Colaborativos

> **Dominio asignado**: Sistema de gestión de proyectos colaborativos · Servicios Profesionales  
> **Semana**: Week-03 · React Fundamentos — Hooks `useEffect`

---

##  Descripción del Dominio

**ProManager** es el panel de control de una consultora de servicios profesionales.  
La empresa gestiona proyectos de tipo: consultoría estratégica, desarrollo de software, diseño UX/UI, auditoría tecnológica y formación especializada.

El dashboard centraliza:

- Estadísticas del portafolio de proyectos
- Actividad del equipo en tiempo real
- Lista completa de proyectos con búsqueda y filtros

---

##  Estructura del Proyecto

```
starter/
└── src/
    ├── types/
    │   └── index.ts            # Tipos del dominio (Project, ProjectStats, TeamActivity…)
    ├── utils/
    │   └── api.ts              # Datos mock y funciones de fetch simuladas
    ├── components/
    │   ├── Dashboard.tsx       # Componente raíz — orquesta los 3 componentes
    │   ├── ItemList.tsx        # ProjectList — portafolio con búsqueda y filtros
    │   ├── StatsCard.tsx       # ProjectStatsCard — KPIs del portafolio en 2 grupos
    │   └── RealTimeIndicator.tsx # TeamActivityIndicator — actividad con polling
    ├── App.tsx
    └── main.tsx
```

---

##  Cómo ejecutar

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

##  Componentes implementados

### `Dashboard` (Dashboard.tsx)
Componente raíz. Muestra:
- Header con nombre de la app, subtítulo y fecha de hoy
- Primera fila: `ProjectStatsCard` + `TeamActivityIndicator` en paralelo
- Segunda fila: `ProjectList` a ancho completo
- Footer con enlace a la documentación de `useEffect`

### `ProjectList` (ItemList.tsx)
Lista el portafolio de proyectos con:
- Búsqueda por texto (nombre, cliente, descripción)
- Filtro por estado (Todos, En progreso, Planificación, En espera, Completado, Cancelado)
- Tarjetas con: barra de progreso, avatares del equipo, presupuesto y fechas

**Patrones `useEffect`:**
| # | Dependencias | Patrón |
|---|---|---|
| 1 | `[]` (montaje) | Fetch inicial con `AbortController` — carga los 8 proyectos |
| 2 | `[searchQuery, statusFilter]` | Búsqueda debounced (400 ms) + `AbortController` — recancela peticiones anteriores |

### `ProjectStatsCard` (StatsCard.tsx)
Muestra 6 KPIs del portafolio divididos en 2 grupos independientes:

**Grupo 1 — Volumen** (useEffect propio):
- Total de proyectos
- Proyectos activos
- Completados este mes

**Grupo 2 — Rendimiento** (useEffect propio):
- Tasa de completitud (%)
- Tasa de utilización (%)
- Presupuesto total gestionado

**Patrón clave**: dos `useEffect` independientes con estados de carga separados (`loadingVolume`, `loadingPerformance`), lo que permite renderizado progresivo.

### `TeamActivityIndicator` (RealTimeIndicator.tsx)
Panel de actividad del equipo que se actualiza automáticamente cada 5 segundos:
- Personas online ahora
- Sesiones activas
- Tareas completadas hoy
- Tareas pendientes
- Timestamp de la última actualización

**Patrón `useEffect`:**
```typescript
useEffect(() => {
  const intervalId = setInterval(loadActivity, POLLING_INTERVAL);
  return () => clearInterval(intervalId); // cleanup para evitar memory leak
}, []);
```

---

##  Tipos del Dominio

```typescript
// Tipos enumerados del dominio
type ProjectPriority = 'low' | 'medium' | 'high' | 'critical';
type ProjectStatus   = 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
type ServiceType     = 'consulting' | 'development' | 'design' | 'audit' | 'training';

// Entidades principales
interface Project {
  id: number;
  name: string;
  client: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  serviceType: ServiceType;
  progress: number;         // 0-100
  budget: number;           // USD
  teamMembers: TeamMember[];
  tasksTotal: number;
  tasksCompleted: number;
}
```

---

## 📋 Patrones de `useEffect` implementados

| Patrón | Dónde | Descripción |
|---|---|---|
| Fetch con AbortController | `ProjectList` efecto 1 | Evita actualizar estado de componente desmontado |
| Búsqueda debounced + AbortController | `ProjectList` efecto 2 | Cancela la petición anterior si el usuario sigue escribiendo |
| Dos efectos independientes | `ProjectStatsCard` | Cada grupo de métricas carga de forma autónoma |
| Polling con `setInterval` + cleanup | `TeamActivityIndicator` | Refresca cada 5 s y limpia el interval al desmontar |

---

##  Criterios de evaluación cubiertos

| Criterio | Implementado |
|---|---|
| useEffect con array de dependencias vacío (montaje) | ✅ |
| useEffect con dependencias reactivas | ✅ |
| Cleanup correcto (AbortController / clearInterval) | ✅ |
| Estados de carga (loading) y error manejados | ✅ |
| Múltiples efectos independientes | ✅ |
| Adaptación coherente al dominio asignado | ✅ |
| Componentes con responsabilidad única | ✅ |
| TypeScript estricto (sin `any`) | ✅ |
