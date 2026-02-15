import { Project } from '../types';

/**
 * PROPS: ItemCard
 */
interface ItemCardProps {
  item: Project;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

/**
 * COMPONENTE: ItemCard
 *
 * Tarjeta individual para mostrar un elemento.
 * Adapta la visualización a tu dominio específico.
 */
const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete, onEdit }) => {
  // ============================================
  // HANDLER: CONFIRMAR ELIMINACIÓN
  // ============================================

  const handleDelete = () => {
    // TODO (Opcional): Agregar confirmación antes de eliminar
    // Ejemplo:
    // if (window.confirm(`¿Eliminar "${item.name}"?`)) {
    //   onDelete(item.id);
    // }

    onDelete(item.id);
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="item-card">
      {/* Información principal */}
      <div className="item-card__header">
        <h3 className="item-card__title">{item.name}</h3>
        {/* Badge de estado */}
        <span className={`badge badge--${item.status}`} style={{ marginLeft: 8 }}>
          {item.status === 'active' && 'Activo'}
          {item.status === 'paused' && 'Pausado'}
          {item.status === 'completed' && 'Completado'}
        </span>
      </div>

      {/* Información detallada */}
      <div className="item-card__body">
        <p><strong>Descripción:</strong> {item.description}</p>
        <p><strong>Cliente:</strong> {item.client}</p>
        <p><strong>Miembros del equipo:</strong> {item.teamMembers.length > 0 ? item.teamMembers.join(', ') : <span style={{ color: '#888' }}>Sin miembros</span>}</p>
      </div>

      {/* Acciones */}
      <div className="item-card__actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(item.id)}
          aria-label={`Editar ${item.name}`}>
          ✏️ Editar
        </button>

        <button
          className="btn btn-delete"
          onClick={handleDelete}
          aria-label={`Eliminar ${item.name}`}>
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
