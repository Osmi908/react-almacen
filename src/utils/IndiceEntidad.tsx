import { ReactElement, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Button from "./Button";
import confirmar from "./Confirmar";
import Paginacion from "./Paginacion";
import ListadoGenerico from "./ListadoGenerico";

export default function IndiceEntidad<T>({
  url,
  urlCrear,
  titulo,
  nombreEntidad,
  children,
}: IndiceEntidadProps<T>) {
  const [entidades, setEntidades] = useState<T[]>([]);
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [recordsPorPagina, setRecordsPorPagina] = useState(10);
  const [pagina, setPagina] = useState(1);

  // Función para cargar datos desde el servidor
  const cargarDatos = useCallback(async () => {
    try {
      const respuesta: AxiosResponse<T[]> = await axios.get(url,
        {
          params: { pagina, recordsPorPagina },
        }
      );
      console.log(respuesta.headers);

      const totalDeRegistros = parseInt(
        respuesta.headers["cantidadtotalregistros"] || "0",
        10
      );
      setTotalDePaginas(Math.ceil(totalDeRegistros / recordsPorPagina));
      setEntidades(respuesta.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  }, [pagina, recordsPorPagina]);

  // Cargar datos cuando cambian página o registros por página
  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  // Función para eliminar una entidad
  async function borrar(id: number) {
    try {
      await axios.delete(`${url}/${id}`);
      cargarDatos(); // Refrescar los datos después de eliminar
    } catch (error) {
      console.error("Error al eliminar la entidad:", error);
    }
  }

  // Generador de botones de acción (editar/borrar)
  const botones = (urlEditar: string, id: number) => (
    <>
      <Link className="btn btn-success" to={urlEditar}>
        Editar
      </Link>
      <Button
        onClick={() => confirmar(() => borrar(id))}
        className="btn btn-danger"
      >
        Borrar
      </Button>
    </>
  );

  // Renderizado del componente
  return (
    <>
      <h3>{titulo}</h3>

      {urlCrear && (
        <Link className="btn btn-primary" to={urlCrear}>
          Crear {nombreEntidad}
        </Link>
      )}

      <div className="form-group" style={{ width: "150px" }}>
        <label>Registros por página</label>
        <select
          name="s"
          title="s"
          className="form-control"
          defaultValue={10}
          onChange={(e) => {
            setPagina(1); // Reiniciar a la primera página
            setRecordsPorPagina(parseInt(e.currentTarget.value, 10));
          }}
        >
          {[5, 10, 25, 50].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <Paginacion
        cantidadTotaldePaginas={totalDePaginas}
        paginaActual={pagina}
        onchange={(nuevaPagina) => setPagina(nuevaPagina)}
      />

      <ListadoGenerico listado={entidades}>
        <table className="table table-striped">
          {children(entidades, botones)}
        </table>
      </ListadoGenerico>
    </>
  );
}

interface IndiceEntidadProps<T> {
  url: string;
  urlCrear?: string;
  titulo: string;
  nombreEntidad?: string;
  children(
    entidades: T[],
    botones: (urlEditar: string, id: number) => ReactElement
  ): ReactElement;
}
