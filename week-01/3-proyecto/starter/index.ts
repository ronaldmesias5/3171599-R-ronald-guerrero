// ============================================
// PROYECTO SEMANAL: MODELADO DE ENTIDADES
// DOMINIO: Sistema de Gestión de Proyectos Colaborativos
// ESTUDIANTE: Ronald Jefrey Guerrero Mesias
// ============================================

// Imprime el título del sistema en la consola al ejecutar el archivo
console.log('--SISTEMA DE GESTIÓN DE PROYECTOS COLABORATIVOS--\n');

// INSTRUCCIONES:
// Adapta este archivo a tu dominio asignado (ej: biblioteca, farmacia, gimnasio, restaurante, etc.)
// Implementa las entidades, tipos y funciones siguiendo los TODOs y comentarios.
// Usa interfaces, types, type unions y literales. Comenta el código con qué/para/impacto.

// ============================================
// 1. Define las entidades principales de tu dominio
// ============================================

// TODO: Define una interface para la entidad principal (ej: Book, Medicine, Member, Dish)
// QUÉ: interface que define la estructura de un Project
// PARA: modelar los proyectos del sistema de gestión
// IMPACTO: TypeScript valida que todos los proyectos tengan estas propiedades
interface Project {
    id: number;              // Identificador único numérico del proyecto
    name: string;            // Nombre descriptivo del proyecto
    description: string;     // Descripción detallada del proyecto
    status: ProjectStatus;   // Estado actual del proyecto (planning, in-progress, completed)
    priority: Priority;      // Nivel de prioridad del proyecto (low, medium, high)
    startDate: string;       // Fecha de inicio en formato string
    budget: number;          // Presupuesto asignado al proyecto en valor numérico
}

// TODO: Define al menos otra interface relacionada (ej: Author, Sale, Routine, Table)
// QUÉ: interface que define la estructura de una Task
// PARA: modelar las tareas asignadas a los proyectos
// IMPACTO: permite gestionar el trabajo y asignaciones
interface Task {
    id: number;              // Identificador único de la tarea
    projectId: number;       // ID del proyecto al que pertenece esta tarea
    title: string;           // Título descriptivo de la tarea
    status: ProjectStatus;   // Estado actual de la tarea
    priority: Priority;      // Nivel de prioridad de la tarea
    assignedTo: number | null; // ID del usuario asignado, null si no está asignada
}

// ============================================
// 2. Usa type unions y literales para propiedades clave
// ============================================

// TODO: Define un type union para un estado, categoría o rol relevante
// QUÉ: type union para estados de proyecto
// PARA: limitar los estados válidos a solo estas opciones
// IMPACTO: previene errores al asignar estados inválidos
type ProjectStatus = 'planning' | 'in-progress' | 'completed';

// TODO: Usa un type literal para limitar valores permitidos
// QUÉ: type union de literales para prioridad
// PARA: clasificar proyectos y tareas por importancia
// IMPACTO: facilita la toma de decisiones de recursos
type Priority = 'low' | 'medium' | 'high';

// ============================================
// 3. Implementa funciones tipadas para operaciones básicas
// ============================================

// TODO: Implementa una función que cree una entidad
// QUÉ: función que crea un objeto Project
// PARA: facilitar la creación de proyectos con validación de tipos
// IMPACTO: garantiza que los datos cumplan la estructura definida
function createProject(
    id: number,              // Parámetro: identificador del proyecto
    name: string,            // Parámetro: nombre del proyecto
    description: string,     // Parámetro: descripción del proyecto
    status: ProjectStatus,   // Parámetro: estado inicial del proyecto
    priority: Priority,      // Parámetro: prioridad del proyecto
    startDate: string,       // Parámetro: fecha de inicio
    budget: number           // Parámetro: presupuesto asignado
): Project {                 // Retorna un objeto tipo Project
    // Crea y retorna un objeto literal con todos los parámetros
    return { id, name, description, status, priority, startDate, budget };
}

// TODO: Implementa una función que liste entidades
// QUÉ: función que retorna un array de proyectos
// PARA: visualizar todos los proyectos disponibles
// IMPACTO: permite acceder al listado completo de proyectos
function listProjects(projects: Project[]): Project[] { // Recibe array de proyectos y retorna array de proyectos
    return projects; // Retorna el array completo de proyectos sin modificaciones
}

// TODO: Implementa una función que filtre entidades por status/categoría
// QUÉ: función que filtra proyectos por estado
// PARA: obtener solo proyectos con un estado específico
// IMPACTO: facilita búsquedas y reportes por estado
function filterProjectsByStatus(projects: Project[], status: ProjectStatus): Project[] {
    // Usa el método filter para recorrer cada proyecto del array
    // y retornar solo aquellos cuyo status coincida con el buscado
    return projects.filter(project => project.status === status);
}
// ============================================
// 4. Prueba tus funciones con datos de ejemplo
// ============================================

// TODO: Crea algunos objetos de ejemplo y prueba las funciones
// QUÉ: pruebas de las funciones implementadas
// PARA: verificar que createProject, listProjects y filterProjectsByStatus funcionen
// IMPACTO: valida la implementación antes de usar en producción

// Declara e inicializa un array vacío de tipo Project[] para almacenar todos los proyectos
const projects: Project[] = [];

// Imprime encabezado de la sección de pruebas para createProject
console.log('\n--- PROBANDO createProject() ---');
// Crea el primer proyecto con todos sus datos y lo almacena en la constante project1
const project1 = createProject(1, 'Rediseño Web', 'Actualizar sitio web', 'in-progress', 'high', '2026-01-15', 50000);
// Agrega project1 al final del array projects usando el método push
projects.push(project1);
// Imprime el objeto project1 completo en la consola
console.log('Proyecto 1:', project1);

// Crea el segundo proyecto en estado de planificación con prioridad media
const project2 = createProject(2, 'App Móvil', 'Desarrollar app de gestión', 'planning', 'medium', '2026-02-01', 75000);
// Agrega project2 al array de proyectos
projects.push(project2);
// Muestra project2 en consola
console.log('Proyecto 2:', project2);

// Crea el tercer proyecto ya completado con prioridad baja
const project3 = createProject(3, 'Sistema de Reportes', 'Módulo de reportes', 'completed', 'low', '2025-12-01', 30000);
// Agrega project3 al array de proyectos
projects.push(project3);
// Muestra project3 en consola
console.log('Proyecto 3:', project3);

// Imprime encabezado para la sección de prueba de listProjects
console.log('\n--- PROBANDO listProjects() ---');
// Llama a listProjects pasando el array projects y guarda el resultado en allProjects
const allProjects = listProjects(projects);
// Imprime el número total de proyectos usando la propiedad length del array
console.log(`Total de proyectos: ${allProjects.length}`);
// Recorre cada proyecto del array usando forEach e imprime nombre y estado
allProjects.forEach(p => console.log(`- ${p.name} (${p.status})`));

// Imprime encabezado para la sección de prueba de filterProjectsByStatus
console.log('\n--- PROBANDO filterProjectsByStatus() ---');
// Filtra el array projects para obtener solo los que están 'in-progress'
const inProgress = filterProjectsByStatus(projects, 'in-progress');
// Muestra cuántos proyectos están en progreso
console.log(`Proyectos en progreso: ${inProgress.length}`);
// Recorre e imprime el nombre de cada proyecto que está en progreso
inProgress.forEach(p => console.log(`- ${p.name}`));

// ============================================
// 5. Comenta tu código explicando qué/para/impacto
// ============================================

// QUÉ: proyecto completo de modelado de entidades con TypeScript
// PARA: aplicar interfaces, types unions, literales y funciones tipadas al dominio de gestión de proyectos
// IMPACTO: código robusto con validación de tipos en tiempo de compilación que previene errores

// Imprime mensaje final recordando adaptar el código al dominio específico
console.log('\n🚦 Recuerda: Adapta TODO a tu dominio y comenta tu código.');