import { useState, useEffect } from 'react';
import { Project } from '../types';

/**
 * PROPS: ItemForm
 */
interface ItemFormProps {
  onAdd: (project: Omit<Project, 'id'>) => void;
  onUpdate: (id: number, updates: Partial<Project>) => void;
  editingItem?: Project;
  onCancelEdit: () => void;
}

/**
 * COMPONENTE: ItemForm
 *
 * Formulario para agregar o editar elementos.
 * Se adapta automáticamente según si hay un elemento siendo editado.
 */
const ItemForm: React.FC<ItemFormProps> = ({
  onAdd,
  onUpdate,
  editingItem,
  onCancelEdit,
}) => {
  // ============================================
  // ESTADO DEL FORMULARIO
  // ============================================

  // Estado inicial del formulario para Project
  const initialState = {
    name: '',
    description: '',
    client: '',
    status: 'active' as 'active' | 'paused' | 'completed',
    teamMembers: [] as string[],
  };

  const [formData, setFormData] = useState<typeof initialState>(initialState);
  const [teamInput, setTeamInput] = useState('');

  // ============================================
  // EFECTO: PRE-LLENAR FORMULARIO AL EDITAR
  // ============================================

  useEffect(() => {
    if (editingItem) {
      // Pre-llenar el formulario con los datos del proyecto a editar (sin id)
      const { id, ...rest } = editingItem;
      setFormData({ ...initialState, ...rest });
    } else {
      setFormData(initialState);
    }
    setTeamInput('');
  }, [editingItem]);

  // ============================================
  // HANDLERS
  // ============================================

  /**
   * Manejar cambios en inputs de texto
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Manejar cambios en selects
   */
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar input de miembros del equipo (agregar a array)
  const handleAddTeamMember = () => {
    const member = teamInput.trim();
    if (member && !formData.teamMembers.includes(member)) {
      setFormData({ ...formData, teamMembers: [...formData.teamMembers, member] });
      setTeamInput('');
    }
  };

  const handleRemoveTeamMember = (member: string) => {
    setFormData({ ...formData, teamMembers: formData.teamMembers.filter(m => m !== member) });
  };

  /**
   * Manejar cambios en checkboxes
   */
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  /**
   * Validar datos del formulario
   */
  const validate = (): boolean => {
    // TODO: Implementar validación según tu dominio
    // Ejemplos:
    // - Campos requeridos no vacíos
    // - Números positivos
    // - Emails válidos
    // - Fechas válidas

    if (!formData.name.trim()) {
      alert('El nombre del proyecto es requerido');
      return false;
    }
    if (!formData.description.trim()) {
      alert('La descripción es requerida');
      return false;
    }
    if (!formData.client.trim()) {
      alert('El cliente es requerido');
      return false;
    }
    // Opcional: puedes requerir al menos un miembro
    // if (formData.teamMembers.length === 0) {
    //   alert('Agrega al menos un miembro al equipo');
    //   return false;
    // }
    return true;
  };

  /**
   * Manejar submit del formulario
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Validar datos
    if (!validate()) return;

    // TODO: Agregar o actualizar según corresponda
    if (editingItem) {
      // Modo edición: actualizar
      onUpdate(editingItem.id, formData);
      onCancelEdit();
    } else {
      // Modo agregar: crear nuevo
      onAdd(formData);
    }

    // TODO: Limpiar formulario
    setFormData(initialState);
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="form-container">
      <h2>{editingItem ? '✏️ Editar Proyecto' : '➕ Agregar Proyecto'}</h2>

      <form
        onSubmit={handleSubmit}
        className="item-form">
        {/* Campo: Nombre del proyecto */}
        <div className="form-group">
          <label htmlFor="name">Nombre del Proyecto *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Rediseño Web Corporativa"
            required
          />
        </div>

        {/* Campo: Descripción */}
        <div className="form-group">
          <label htmlFor="description">Descripción *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe el proyecto"
            required
          />
        </div>

        {/* Campo: Cliente */}
        <div className="form-group">
          <label htmlFor="client">Cliente *</label>
          <input
            type="text"
            id="client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            placeholder="Nombre del cliente"
            required
          />
        </div>

        {/* Campo: Estado */}
        <div className="form-group">
          <label htmlFor="status">Estado</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleSelectChange}
          >
            <option value="active">Activo</option>
            <option value="paused">Pausado</option>
            <option value="completed">Completado</option>
          </select>
        </div>

        {/* Campo: Miembros del equipo */}
        <div className="form-group">
          <label>Miembros del equipo</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={teamInput}
              onChange={e => setTeamInput(e.target.value)}
              placeholder="Nombre del miembro"
            />
            <button type="button" onClick={handleAddTeamMember} className="btn btn-secondary">Agregar</button>
          </div>
          <div style={{ marginTop: 8 }}>
            {formData.teamMembers.length === 0 && <span style={{ color: '#888' }}>Sin miembros</span>}
            {formData.teamMembers.map(member => (
              <span key={member} style={{ display: 'inline-block', background: '#222', color: '#fff', borderRadius: 4, padding: '2px 8px', marginRight: 4, marginBottom: 4 }}>
                {member}
                <button type="button" onClick={() => handleRemoveTeamMember(member)} style={{ marginLeft: 4, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>×</button>
              </span>
            ))}
          </div>
        </div>
        {/* Ejemplos:
          
          Biblioteca:
          <div className="form-group">
            <label htmlFor="author">Autor *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="isbn">ISBN *</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleSelectChange}
            >
              <option value="fiction">Ficción</option>
              <option value="non-fiction">No Ficción</option>
              <option value="science">Ciencia</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleCheckboxChange}
              />
              Disponible
            </label>
          </div>
        */}

        {/* Botones */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary">
            {editingItem ? 'Actualizar' : 'Agregar'}
          </button>

          {editingItem && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onCancelEdit();
                setFormData(initialState);
              }}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
