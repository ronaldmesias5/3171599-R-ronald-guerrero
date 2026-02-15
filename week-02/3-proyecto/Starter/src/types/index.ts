// ============================================
// TYPES: INTERFACES Y TIPOS
// ============================================
// Define aquí las interfaces para tu dominio

/**
 * NOTA PARA EL APRENDIZ:
 * Adapta esta interface a tu dominio asignado.
 *
 * Ejemplos:
 * - Biblioteca: Book { id, title, author, isbn, available, category }
 * - Farmacia: Medicine { id, name, price, stock, requiresPrescription, category }
 * - Gimnasio: Member { id, name, email, plan, startDate, active }
 * - Restaurante: Dish { id, name, category, price, available, description }
 */


// ============================================
// INTERFACE PRINCIPAL: Project
// ============================================
/**
 * QUÉ: Define la estructura de un proyecto colaborativo
 * PARA: Gestionar proyectos en servicios profesionales
 * IMPACTO: TypeScript valida que los objetos cumplan esta estructura
 */
export interface Project {
  id: number;
  name: string;
  description: string;
  client: string;
  status: 'active' | 'paused' | 'completed';
  teamMembers: string[];
}

// TODO: Si necesitas tipos adicionales, defínelos aquí
// Ejemplos:
// export type Category = 'fiction' | 'non-fiction' | 'science'; // Biblioteca
// export type MedicineCategory = 'analgésico' | 'antibiótico' | 'vitamina'; // Farmacia
// export type MembershipPlan = 'básico' | 'premium' | 'vip'; // Gimnasio

// TODO: Interface para props de formulario (opcional)
export interface FormData {
  // Mismos campos que Item pero sin el id (se genera al agregar)
  name: string;
  // TODO: Agregar resto de propiedades
}
