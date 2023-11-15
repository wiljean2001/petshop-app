export function exclude<T extends object>(obj: T, keys: string[]): T {
  // Se hace una copia superficial del objeto o array para evitar mutaciones en el objeto original.
  const result = Array.isArray(obj) ? obj.slice() : { ...obj };

  // Función recursiva que elimina propiedades anidadas basándose en una ruta dada.
  function deleteNestedProperty(obj: any, path: string[]) {
    // Si la ruta está vacía, no hay nada que eliminar.
    if (path.length === 0) return;

    // Obtiene la primera parte de la ruta, que podría ser el nombre de una propiedad o un array.
    const key = path[0];

    // Si la clave termina con '[]', entonces se refiere a un array de objetos.
    if (key.endsWith('[]')) {
      // Elimina los corchetes para obtener el nombre de la propiedad del array.
      const newKey = key.slice(0, -2);

      // Comprueba si el objeto tiene esta propiedad y si es un array.
      if (obj[newKey] && Array.isArray(obj[newKey])) {
        // Itera sobre cada objeto dentro del array.
        obj[newKey].forEach((item: any) => {
          // Llama recursivamente a la función para la siguiente parte de la ruta.
          deleteNestedProperty(item, path.slice(1));
        });
      }
    } else {
      // Si estamos al final de la ruta, elimina la propiedad del objeto.
      if (path.length === 1) {
        delete obj[key];
        return;
      }

      // Si la propiedad aún tiene subpropiedades, llama recursivamente a la función para el siguiente nivel.
      if (obj[key] !== undefined) {
        deleteNestedProperty(obj[key], path.slice(1));
      }
    }
  }

  // Itera sobre cada clave que debe ser excluida.
  keys.forEach((key) => {
    // Divide la clave en partes basándose en el punto para crear una ruta de acceso.
    const path = key.split('.');

    // Llama a la función para eliminar la propiedad o subpropiedad.
    deleteNestedProperty(result, path);
  });

  // Devuelve el objeto resultante sin las propiedades excluidas.
  return result as T;
}
