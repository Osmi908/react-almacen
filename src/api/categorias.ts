import axios from "../utils/axiosConfig";
import { categoriaDTO, categoriaCreacionDTO } from "../categorias/Categorias.model";
import { urlCategorias } from "../utils/endpoints";
const baseUrl=urlCategorias;

export async function GetCategorias(){
    const response = await axios.get<categoriaDTO[]>(urlCategorias);
    return {
        datos:response.data
    }
}


// Obtener todas las categorías (paginadas)
export async function obtenerCategorias(pagina: number, registrosPorPagina: number) {
  const response = await axios.get<categoriaDTO[]>(`${urlCategorias}?pagina=${pagina}&registrosPorPagina=${registrosPorPagina}`);
  return {
    datos: response.data,
    totalPaginas: parseInt(response.headers["cantidadtotalpaginas"]),
    totalRegistros: parseInt(response.headers["cantidadtotalregistros"]),
  };
}

// Obtener una categoría por ID
export async function obtenerCategoria(id: number) {
  const response = await axios.get<categoriaDTO>(`${baseUrl}/${id}`);
  return response.data;
}

// Crear nueva categoría
export async function crearCategoria(categoria: categoriaCreacionDTO) {
  try {
    const response = await axios.post("/Categorias", categoria);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 409) {
        throw new Error("La categoría ya existe.");
      }

      if (status === 400 && data?.errors) {
        const errores = Object.values(data.errors).flat().join(" ");
        throw new Error(errores);
      }

      throw new Error(data?.mensaje || "Error desconocido");
    } else {
      throw new Error("No se pudo conectar con el servidor.");
    }
  }
}


// Actualizar categoría existente
export async function actualizarCategoria(id: number, categoria: categoriaDTO) {
  await axios.patch(`${baseUrl}/${id}`, categoria);
}

// Eliminar categoría
export async function eliminarCategoria(id: number) {
  await axios.delete(`${baseUrl}/${id}`);
}

// Verifica si existe una categoría por ID
export async function existeCategoriaPorId(id: number) {
  try {
    await axios.get(`${baseUrl}/${id}`);
    return true;
  } catch {
    return false;
  }
}
