# Sistema de Gestión de Proyectos Colaborativos

**Nombre**: Ronald Jefrey Guerrero Mesias  
**Ficha**: 3171599  
**Dominio Asignado**: Sistema de Gestión de Proyectos Colaborativos  

---

## Descripción del Dominio

Este proyecto modela un **sistema de gestión de proyectos colaborativos** que permite:

- Crear y gestionar proyectos con información clave (nombre, descripción, presupuesto, fechas)
- Asignar estados a los proyectos (planning, in-progress, completed)
- Definir prioridades (low, medium, high)
- Gestionar tareas asociadas a cada proyecto
- Filtrar y listar proyectos según criterios específicos

---

## Decisiones de Diseño

### Entidades Principales

#### 1. **Project** (Proyecto)
Representa un proyecto con sus características fundamentales:
- `id`: Identificador único
- `name`: Nombre del proyecto
- `description`: Descripción detallada
- `status`: Estado actual (ProjectStatus)
- `priority`: Nivel de prioridad (Priority)
- `startDate`: Fecha de inicio
- `budget`: Presupuesto asignado

#### 2. **Task** (Tarea)
Representa tareas asociadas a proyectos:
- `id`: Identificador único
- `projectId`: Referencia al proyecto padre
- `title`: Título de la tarea
- `status`: Estado actual (ProjectStatus)
- `priority`: Nivel de prioridad (Priority)
- `assignedTo`: Usuario asignado (puede ser null)

### Type Unions

#### **ProjectStatus**
Se definieron solo 3 estados para mantener simplicidad:
- `'planning'`: Proyecto en fase de planificación
- `'in-progress'`: Proyecto en ejecución
- `'completed'`: Proyecto finalizado

#### **Priority**
Tres niveles de prioridad para clasificar proyectos y tareas:
- `'low'`: Prioridad baja
- `'medium'`: Prioridad media
- `'high'`: Prioridad alta

### Funciones Implementadas

1. **`createProject()`**: Crea nuevos proyectos con validación de tipos
2. **`listProjects()`**: Retorna el listado completo de proyectos
3. **`filterProjectsByStatus()`**: Filtra proyectos por estado específico

---

## Conceptos Aplicados

-  **Interfaces** para definir la estructura de entidades
-  **Type unions** para limitar valores válidos
-  **Funciones tipadas** con parámetros y retornos explícitos
-  **Type literals** para estados y prioridades
-  **Comentarios QUÉ/PARA/IMPACTO** en todo el código
-  **Nomenclatura clara** (camelCase para funciones, PascalCase para tipos)

---

##  Ejecución

```bash
cd 3-proyecto/starter
pnpm install
pnpm start
```

**Salida esperada:**
- Creación de 3 proyectos de ejemplo
- Listado de todos los proyectos
- Filtrado de proyectos en progreso

---
