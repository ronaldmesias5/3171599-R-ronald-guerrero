
# Sistema de Gestión de Proyectos Colaborativos

**Nombre**: Ronald Jefrey Guerrero Mesias  
**Ficha**: 3171599  
**Dominio Asignado**: Sistema de Gestión de Proyectos Colaborativos  

## Descripción

Aplicación web para gestionar proyectos colaborativos en servicios profesionales. Permite crear, editar, eliminar y visualizar proyectos, así como gestionar los miembros del equipo y el estado de cada proyecto.

### Entidad principal

```typescript
interface Project {
  id: number;
  name: string;
  description: string;
  client: string;
  status: 'active' | 'paused' | 'completed';
  teamMembers: string[];
}
```

## Componentes principales

- Header: título y descripción
- ItemForm: formulario para agregar/editar proyectos
- ItemList: lista de proyectos
- ItemCard: tarjeta individual de proyecto


## Flujo de usuario

1. El usuario accede a la aplicación y visualiza la lista de proyectos existentes (si hay).
2. Puede agregar un nuevo proyecto completando el formulario con nombre, descripción, cliente, estado y miembros del equipo.
3. Cada proyecto se muestra en una tarjeta con su información principal y botones para editar o eliminar.
4. Al editar, el formulario se prellena con los datos del proyecto seleccionado y permite guardar cambios o cancelar la edición.
5. Los miembros del equipo pueden agregarse y eliminarse dinámicamente desde el formulario.
6. El estado del proyecto se selecciona entre: Activo, Pausado o Completado.
7. Si no hay proyectos, se muestra un mensaje indicando el estado vacío.

## Estructura de carpetas

```
src/
  App.tsx
  types/
    index.ts
  components/
    Header.tsx
    ItemForm.tsx
    ItemList.tsx
    ItemCard.tsx
  styles/
    App.css
```

## Instalación y ejecución

1. Instala dependencias:
   ```bash
   pnpm install
   ```
2. Ejecuta en modo desarrollo:
   ```bash
   pnpm dev
   ```
3. Build para producción:
   ```bash
   pnpm build
   ```

## Decisiones de diseño

- Se priorizó la claridad y separación de componentes.
- El formulario permite agregar y quitar miembros del equipo dinámicamente.
- El estado del proyecto se gestiona con un select (Activo, Pausado, Completado).
- Se valida que los campos principales no estén vacíos.

