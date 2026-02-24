#  Proyecto Week 03: Dashboard con Datos en Tiempo Real

##  Descripción General

Construirás un **dashboard interactivo** que utiliza `useEffect` para gestionar múltiples fuentes de datos, actualizar información en tiempo real y manejar efectos secundarios complejos.

##  Duración Estimada

**2-2.5 horas** de trabajo enfocado

---

## 🏛️ Tu Dominio Asignado

**Dominio**: `[El instructor te asignará tu dominio único]`

Este proyecto debe adaptarse a tu dominio específico. Las instrucciones son genéricas, tú debes contextualizarlas.

###  Ejemplos de Adaptación por Dominio

| Dominio                   | Componente Lista           | Componente Stats  | Dato en Tiempo Real     |
| ------------------------- | -------------------------- | ----------------- | ----------------------- |
| 📖 **Biblioteca**         | Lista de libros            | Préstamos activos | Disponibilidad de salas |
| 💊 **Farmacia**           | Inventario de medicamentos | Ventas del día    | Stock bajo              |
| 🏋️ **Gimnasio**           | Lista de miembros          | Asistencias hoy   | Ocupación actual        |
| 🏫 **Escuela**            | Lista de estudiantes       | Promedio de notas | Clases en progreso      |
| 🏬 **Tienda de mascotas** | Productos disponibles      | Ventas del mes    | Mascotas en adopción    |
| 🏪 **Restaurante**        | Menú del día               | Pedidos activos   | Mesas ocupadas          |

---

## 🎯 Objetivos de Aprendizaje

Al completar este proyecto, demostrarás que sabes:

- ✅ Usar `useEffect` para fetch de datos iniciales
- ✅ Implementar polling con `setInterval` y cleanup
- ✅ Manejar múltiples efectos en un componente
- ✅ Gestionar estados de loading, error y data
- ✅ Cancelar peticiones con `AbortController`
- ✅ Crear custom hooks con `useEffect`
- ✅ Limpiar event listeners y timers correctamente

---

## 📐 Arquitectura del Proyecto

### Componentes Requeridos (4)

#### 1. **Dashboard** (Componente Principal)

- Contenedor que orquesta todos los componentes
- Maneja el estado global del dashboard
- Layout responsivo

#### 2. **ItemList** (Lista de Elementos)

- Muestra lista de elementos principales de tu dominio
- Fetch inicial con `useEffect`
- Estados: loading, error, data
- Búsqueda/filtrado opcional

#### 3. **StatsCard** (Tarjeta de Estadísticas)

- Muestra métricas clave de tu dominio
- Múltiples `useEffect` para diferentes stats
- Visualización clara de números

#### 4. **RealTimeIndicator** (Indicador en Tiempo Real)

- Actualiza datos cada X segundos (polling)
- `setInterval` con cleanup apropiado
- Indicador visual de última actualización

---

## 📋 Requisitos Funcionales

### ✅ Requisito 1: Fetch de Datos Inicial

**ItemList** debe:

- Cargar datos desde un endpoint al montar
- Mostrar "Cargando..." mientras se obtienen
- Manejar errores de red gracefully
- Usar `AbortController` para cancelación

**Ejemplo (Biblioteca)**:

```typescript
// Fetch inicial de libros al montar el componente
useEffect(() => {
  const controller = new AbortController();
  fetchBooks(controller.signal);
  return () => controller.abort();
}, []);
```

### ✅ Requisito 2: Polling en Tiempo Real

**RealTimeIndicator** debe:

- Actualizar datos cada 5-10 segundos
- Usar `setInterval` con cleanup
- Mostrar timestamp de última actualización
- Parar el polling al desmontar

**Ejemplo (Gimnasio)**:

```typescript
// Actualizar ocupación actual cada 5 segundos
useEffect(() => {
  const fetchOccupancy = async () => {
    /* ... */
  };
  fetchOccupancy(); // Llamada inicial
  const intervalId = setInterval(fetchOccupancy, 5000);
  return () => clearInterval(intervalId);
}, []);
```

### ✅ Requisito 3: Múltiples Estadísticas

**StatsCard** debe:

- Mostrar al menos 3 métricas diferentes
- Cada métrica con su propio `useEffect`
- Actualización independiente de cada stat
- Formato numérico claro (ej: "127 items", "85%")

**Ejemplo (Farmacia)**:

```typescript
// Tres efectos independientes para tres stats
useEffect(() => {
  fetchTotalProducts();
}, []);
useEffect(() => {
  fetchDailySales();
}, []);
useEffect(() => {
  fetchLowStock();
}, []);
```

### ✅ Requisito 4: Búsqueda/Filtrado (Opcional)

**ItemList** puede incluir:

- Input de búsqueda con debounce
- `useEffect` que depende del término de búsqueda
- Re-fetch cuando el término cambia
- Clear button para resetear

---

## 🛠️ Estructura de Archivos

```
3-proyecto/
├── README.md                          # Este archivo
├── starter/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx         # TODO: Implementar
│   │   │   ├── ItemList.tsx          # TODO: Implementar
│   │   │   ├── StatsCard.tsx         # TODO: Implementar
│   │   │   └── RealTimeIndicator.tsx # TODO: Implementar
│   │   ├── hooks/
│   │   │   └── useFetch.ts           # TODO: Custom hook
│   │   ├── types/
│   │   │   └── index.ts              # TODO: Interfaces
│   │   └── utils/
│   │       └── api.ts                # TODO: Funciones de API
│   └── package.json
└── ejemplo-biblioteca/                # Implementación de referencia
    └── ...
```

---

## 📝 Instrucciones de Implementación

### Paso 1: Definir Tipos (15 min)

En `types/index.ts`, define las interfaces para tu dominio:

```typescript
// NOTA: Adapta estos tipos a tu dominio asignado

// Ejemplo: Biblioteca
export interface Book {
  id: number;
  title: string;
  author: string;
  // TODO: Agregar propiedades específicas de tu dominio
}

export interface Stats {
  // TODO: Definir estructura de estadísticas
  total: number;
  active: number;
  percentage: number;
}

export interface RealTimeData {
  // TODO: Definir datos en tiempo real
  value: number;
  lastUpdated: string;
}
```

### Paso 2: Crear Funciones de API (20 min)

En `utils/api.ts`, simula o conecta a APIs:

```typescript
// TODO: Implementar funciones de fetch para tu dominio
export const fetchItems = async (signal: AbortSignal): Promise<Item[]> => {
  // Puedes usar JSONPlaceholder, mockapi.io o datos mock locales
};

export const fetchStats = async (): Promise<Stats> => {
  // TODO: Implementar
};

export const fetchRealTimeData = async (): Promise<RealTimeData> => {
  // TODO: Implementar
};
```

### Paso 3: Implementar ItemList (30 min)

Componente que muestra la lista principal:

```typescript
export const ItemList: React.FC = () => {
  // TODO: Estados para data, loading, error
  // TODO: useEffect para fetch inicial con AbortController
  // TODO: Renderizado condicional (loading/error/data)
  // TODO: Mapear items y mostrar en lista
};
```

### Paso 4: Implementar StatsCard (25 min)

Componente de estadísticas:

```typescript
export const StatsCard: React.FC = () => {
  // TODO: Estados para diferentes stats
  // TODO: Múltiples useEffect para cargar cada stat
  // TODO: Renderizar métricas en cards
};
```

### Paso 5: Implementar RealTimeIndicator (30 min)

Componente con polling:

```typescript
export const RealTimeIndicator: React.FC = () => {
  // TODO: Estado para dato en tiempo real
  // TODO: useEffect con setInterval para polling
  // TODO: Cleanup del interval
  // TODO: Mostrar timestamp de última actualización
};
```

### Paso 6: Ensamblar Dashboard (15 min)

Componente principal:

```typescript
export const Dashboard: React.FC = () => {
  // TODO: Integrar ItemList, StatsCard, RealTimeIndicator
  // TODO: Layout responsivo
  // TODO: Título personalizado a tu dominio
};
```

### Paso 7: Custom Hook (Opcional, 15 min)

Extrae lógica común a `hooks/useFetch.ts`:

```typescript
export const useFetch = <T>(url: string) => {
  // TODO: Implementar hook genérico de fetch
  // TODO: Retornar { data, loading, error, refetch }
};
```

---

## 🎨 Estilos (Opcional)

Puedes usar:

- CSS puro con clases
- CSS Modules
- Styled Components
- Tailwind CSS (si está configurado)

**Mínimo requerido**: Diseño limpio y legible.

---

## ✅ Criterios de Evaluación

### Funcionalidad (50%)

- [ ] Fetch inicial de datos funciona correctamente
- [ ] Estados de loading y error se manejan apropiadamente
- [ ] Polling actualiza datos en tiempo real
- [ ] Cleanup de efectos previene memory leaks
- [ ] AbortController cancela peticiones correctamente
- [ ] Múltiples efectos funcionan independientemente

### Código (30%)

- [ ] Tipos TypeScript correctos y completos
- [ ] Nomenclatura en inglés (código) + español (comentarios)
- [ ] Componentes bien estructurados
- [ ] TODOs implementados completamente
- [ ] Cleanup functions presentes donde necesario
- [ ] Sin errores de compilación

### Adaptación al Dominio (20%)

- [ ] Implementación coherente con dominio asignado
- [ ] Nombres de variables/componentes contextualizados
- [ ] Datos mockados acordes al dominio
- [ ] UI representa correctamente el contexto

---

## 🧪 Testing Sugerido

Verifica manualmente:

1. **Montaje**: Datos se cargan al abrir el dashboard
2. **Polling**: RealTimeIndicator se actualiza automáticamente
3. **Desmontaje**: No hay errores al cerrar/navegar fuera
4. **Errores de red**: Se muestran mensajes apropiados
5. **Cancelación**: Cambiar de página cancela peticiones pendientes

---

## 📚 Recursos de Referencia

- [React Docs: useEffect](https://react.dev/reference/react/useEffect)
- [MDN: AbortController](https://developer.mozilla.org/es/docs/Web/API/AbortController)
- Teoría Week 03:
  - [01-useeffect-introduccion.md](../1-teoria/01-useeffect-introduccion.md)
  - [03-cleanup-limpieza.md](../1-teoria/03-cleanup-limpieza.md)
  - [04-casos-uso-comunes.md](../1-teoria/04-casos-uso-comunes.md)

---

## 🚀 Entregables

1. **Código fuente completo** en carpeta con tu nombre
2. **README.md** describiendo tu dominio y decisiones técnicas
3. **Screenshots** del dashboard funcionando (opcional)
4. **Commits** con mensajes claros en Git (si aplica)

---

## 💡 Tips de Implementación

### Para Datos Mock

Si no tienes un backend real, usa:

```typescript
// Simular delay de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Datos mock
export const fetchItems = async (): Promise<Item[]> => {
  await delay(1000); // Simular latencia
  return MOCK_ITEMS;
};
```

### Para Polling

```typescript
useEffect(() => {
  const fetchData = async () => {
    /* ... */
  };

  fetchData(); // ← Llamada inicial (no esperar 5 seg)
  const intervalId = setInterval(fetchData, 5000);

  return () => clearInterval(intervalId);
}, []);
```

### Para Timestamps

```typescript
const [lastUpdated, setLastUpdated] = useState<string>('');

useEffect(() => {
  const updateData = async () => {
    // ... fetch data
    setLastUpdated(new Date().toLocaleTimeString());
  };
  // ...
}, []);
```

---

## ⚠️ Errores Comunes a Evitar

❌ **No limpiar timers**: Causa memory leaks  
❌ **No usar AbortController**: Peticiones obsoletas actualizan estado  
❌ **Olvidar array de dependencias**: Efectos se ejecutan en cada render  
❌ **Actualizar estado en componente desmontado**: Warnings de React  
❌ **No manejar estados de loading/error**: Mala UX

✅ **Siempre return cleanup** en efectos con timers/listeners  
✅ **Usar AbortController** en todas las peticiones  
✅ **Especificar dependencias** correctamente en el array  
✅ **Validar componente montado** antes de actualizar estado  
✅ **Manejar todos los estados** posibles (idle/loading/success/error)

---

## 🎯 Desafíos Extras (Opcional)

Si terminas antes y quieres más práctica:

1. **Búsqueda con Debounce**: Filtrado en tiempo real optimizado
2. **Refetch Button**: Botón para recargar datos manualmente
3. **Error Retry**: Botón para reintentar después de error
4. **Notifications**: Toast cuando datos se actualizan
5. **Offline Detection**: Mostrar banner cuando no hay conexión

---

## 📞 Soporte

Si tienes dudas:

- Revisa los ejercicios de la semana
- Consulta la teoría
- Pregunta al instructor
- Colabora con compañeros (sin copiar código)

**¡Recuerda**: Cada estudiante debe tener una implementación única adaptada a su dominio.

---

**¡Éxito en tu proyecto! 🚀**
