import { Project } from '../types';
import ItemCard from './ItemCard';

/**
 * PROPS: ItemList
 */
interface ItemListProps {
  items: Project[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

/**
 * COMPONENTE: ItemList
 *
 * Renderiza la lista de elementos usando .map()
 */
const ItemList: React.FC<ItemListProps> = ({ items, onDelete, onEdit }) => {
  // Manejar estado vacío
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 No hay proyectos para mostrar</p>
        <p className="empty-state__hint">
          Agrega tu primer proyecto usando el formulario de arriba
        </p>
      </div>
    );
  }

  // ============================================
  // RENDER: LISTA DE ELEMENTOS
  // ============================================

  return (
    <div className="item-list">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ItemList;
