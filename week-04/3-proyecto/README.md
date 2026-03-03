# Proyecto Week 04: Catálogo de Proyectos Colaborativos

## 🎯 Objetivo

Crear un catálogo interactivo de proyectos que implemente renderizado condicional, listas con keys, filtrado, ordenamiento y búsqueda en tiempo real con debounce.

---

**Dominio**: Sistema de gestión de proyectos colaborativos | Servicios Profesionales

Este catálogo gestiona un portafolio de **12 proyectos reales** de diferentes tipos de servicios:
- 📊 Consultoría estratégica
- 💻 Desarrollo de software
- 🎨 Diseño UX/UI
- 🔍 Auditoría tecnológica
- 📚 Capacitación especializada

---

## ✨ Características Implementadas

### 1. Renderizado Condicional ✅

- [x] **Loading**: Spinner mientras se cargan datos
- [x] **Error**: Mensaje de error si hay problemas
- [x] **Estado vacío**: Mensaje cuando no hay resultados
- [x] **Badges condicionales**: Estado, tipo de servicio, prioridad coloridos
- [x] **Estados dinámicos**: Renderizado en base a filtros aplicados

### 2. Listas con Keys Correctas ✅

- [x] Renderizado con `.map()` tipado con TypeScript
- [x] **Keys únicas basadas en `id`** (nunca `index`)
- [x] Componentes extraídos (`ItemCard` para cada proyecto)
- [x] Propiedades del dominio específicas (name, client, budget, teamSize, etc.)

### 3. Filtrado Múltiple ✅

- [x] **Filtro 1**: Tipo de servicio (Consultoría, Desarrollo, Diseño, Auditoría, Capacitación)
- [x] **Filtro 2**: Estado (Planificación, En progreso, En espera, Completado, Cancelado)
- [x] **Filtro 3**: Prioridad (Baja, Media, Alta, Crítica)
- [x] **Botón limpiar**: Resetea todos los filtros a valores por defecto

### 4. Ordenamiento sin Mutación ✅

- [x] Nombre (A-Z, Z-A)
- [x] Presupuesto (menor a mayor, mayor a menor)
- [x] Progreso (más avanzados primero)
- [x] Fecha de inicio (más recientes primero)
- [x] **Implementado sin mutar array original** usando spread operator

### 5. Búsqueda en Tiempo Real ✅

- [x] Input de búsqueda debounced (300ms)
- [x] Búsqueda case-insensitive
- [x] Búsqueda en: nombre del proyecto Y cliente
- [x] Botón para limpiar búsqueda (renderizado condicional)
- [x] Integración con `useDebounce` hook

---

## 📊 Datos: 12 Proyectos Reales

Cada proyecto incluye:

```typescript
{
  id: number;                    // ID único
  name: string;                  // Nombre del proyecto
  client: string;                // Cliente
  serviceType: ServiceType;      // Tipo de servicio
  status: ProjectStatus;         // Estado actual
  priority: ProjectPriority;     // Prioridad
  budget: number;                // Presupuesto USD
  progress: number;              // 0-100%
  teamSize: number;              // Miembros del equipo
  startDate: string;             // Fecha inicio (ISO)
  endDate: string;               // Fecha fin (ISO)
  createdAt: string;             // Fecha de creación
}
```

### Ejemplo de proyectos incluidos:

1. 🏦 Transformación Digital - Banca Retail ($250k) - Crítica
2. 💻 Backend API RESTful - E-Learning ($180k) - Alta
3. 🔍 Auditoría de Seguridad Cloud ($95k) - Completada
4. 🎨 Rediseño UX/UI - Portal Logístico ($65k) - Planificación
5. 📦 ERP Logístico - Implementación ($420k) - Crítica
6. 📚 Capacitación Agile SAFe ($45k) - Completada
7. Y 6 proyectos más...

---

## 🏗️ Estructura del Proyecto

```
starter/
├── src/
│   ├── components/
│   │   ├── Catalog.tsx           # Orquestador principal
│   │   ├── ItemCard.tsx          # Tarjeta de proyecto
│   │   ├── ItemList.tsx          # Lista con renderizado condicional
│   │   ├── SearchBar.tsx         # Búsqueda con debounce
│   │   ├── FilterPanel.tsx       # 3 filtros
│   │   ├── SortSelector.tsx      # Ordenamiento
│   │   └── EmptyState.tsx        # Estado vacío
│   ├── hooks/
│   │   └── useDebounce.ts        # Hook personalizado
│   ├── types/
│   │   └── index.ts              # Types del dominio
│   ├── data/
│   │   └── items.ts              # 12 proyectos mock + opciones
│   ├── styles/
│   │   └── catalog.css           # Estilos completos
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎯 Patrones de React Implementados

### 1. Renderizado Condicional

```typescript
// Loading
if (isLoading) return <Loading />;

// Error
if (error) return <Error message={error} />;

// Vacío
if (items.length === 0) return <EmptyState />;

// Normal
return <List items={items} />;
```

### 2. Listas con Keys Únicas

```typescript
{items.map((project) => (
  <ItemCard
    key={project.id}  // ← NUNCA usar index
    item={project}
    onDelete={onDelete}
  />
))}
```

### 3. Filtrado con useMemo

```typescript
const processedProjects = useMemo(() => {
  let result = [...projects];
  
  // Filtros
  if (searchTerm) result = result.filter(...);
  if (serviceType !== 'all') result = result.filter(...);
  // más filtros...
  
  // Ordenamiento sin mutar
  const sorted = [...result];
  sorted.sort((a, b) => ...);
  
  return sorted;
}, [projects, searchTerm, serviceType, ...deps]);
```

### 4. Debounce para Búsqueda

```typescript
const debouncedSearchTerm = useDebounce(searchTerm, 300);
// El hook espera 300ms antes de actualizar
```

### 5. Renderizado Condicional de UI

```typescript
{/* Botón para limpiar solo si hay búsqueda */}
{value && (
  <button onClick={() => onChange('')}>✕</button>
)}

{/* Badge de estado con color dinámico */}
<span style={{ backgroundColor: STATUS_COLORS[status] }}>
  {status}
</span>
```

---

## 🚀 Cómo Ejecutar

### 1. Instalar dependencias

```bash
cd starter
pnpm install
```

### 2. Iniciar servidor de desarrollo

```bash
pnpm dev
```

### 3. Abrir en navegador

```
http://localhost:5173
```

---

## 🎯 Conceptos de React Cubiertos

✅ Renderizado condicional (if, ternario, &&, ||)  
✅ Renderizado de listas con `.map()`  
✅ Keys correctas (id, no index)  
✅ Componentes extraídos  
✅ Props tipadas con TypeScript  
✅ Eventos controlados (onChange)  
✅ useMemo para optimización  
✅ useDebounce custom hook  
✅ Estados múltiples  
✅ Filtrado y ordenamiento sin mutación  

---

## 📚 Recursos

- [React Docs - Rendering Lists](https://react.dev/learn/rendering-lists)
- [React Docs - Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [React Docs - useMemo](https://react.dev/reference/react/useMemo)
- [TypeScript - Record Type](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)

---

_Week 04 - Sistema de gestión de proyectos colaborativos · Servicios Profesionales_
