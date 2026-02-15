import { useState } from 'react';
import { Project } from './types';
import Header from './components/Header';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

/**
 * COMPONENTE PRINCIPAL: App
 *
 * Este componente gestiona el estado global de la aplicación
 * y coordina la comunicación entre componentes hijos.
 */
const App = () => {
  // ============================================
  // ESTADO PRINCIPAL
  // ============================================

  // Estado para la lista de proyectos
  const [projects, setProjects] = useState<Project[]>([]);

  // Estado para edición (id del proyecto siendo editado)
  const [editingId, setEditingId] = useState<number | null>(null);

  // ============================================
  // FUNCIONES CRUD
  // ============================================

  /**
   * Agregar nuevo proyecto
   * @param project - Datos del nuevo proyecto (sin id)
   */
  const addProject = (project: Omit<Project, 'id'>): void => {
    const newProject: Project = {
      ...project,
      id: Date.now(),
    };
    setProjects([...projects, newProject]);
  };

  /**
   * Actualizar proyecto existente
   * @param id - ID del proyecto a actualizar
   * @param updates - Propiedades a actualizar
   */
  const updateProject = (id: number, updates: Partial<Project>): void => {
    setProjects(
      projects.map((project) => (project.id === id ? { ...project, ...updates } : project)),
    );
  };

  /**
   * Eliminar proyecto
   * @param id - ID del proyecto a eliminar
   */
  const deleteProject = (id: number): void => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  /**
   * Preparar proyecto para edición
   * @param id - ID del proyecto a editar
   */
  const startEdit = (id: number): void => {
    setEditingId(id);
  };

  /**
   * Cancelar edición
   */
  const cancelEdit = (): void => {
    setEditingId(null);
  };

  // ============================================
  // ELEMENTO SIENDO EDITADO
  // ============================================

  // Encontrar el proyecto que se está editando
  const projectToEdit = editingId
    ? projects.find((project) => project.id === editingId)
    : undefined;

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="app">
      {/* Header con título y descripción */}
      <Header />

      <div className="container">
        {/* Formulario para agregar/editar proyectos */}
        <ItemForm
          onAdd={addProject}
          onUpdate={updateProject}
          editingItem={projectToEdit}
          onCancelEdit={cancelEdit}
        />

        {/* Lista de proyectos */}
        <ItemList
          items={projects}
          onDelete={deleteProject}
          onEdit={startEdit}
        />
      </div>
    </div>
  );
};

export default App;
