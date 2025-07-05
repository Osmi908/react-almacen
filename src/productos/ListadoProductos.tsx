import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ProductoDTO as Producto } from "./productos.model";
import { urlProductos } from "../utils/endpoints";
import axios from "axios";
import ListadoGenerico from "../utils/ListadoGenerico";
import ProductoIndividual from "./ProductoIndividual";
import { Carrito, CarritoDTO } from "../carrito/carrito.model";
import FiltroProductos from "./FiltroProductos";
interface ListadoProductosProps {
  onProductoAgregado: (Producto:CarritoDTO) => void;
}
const ListadoProductos:FC<ListadoProductosProps>=({onProductoAgregado})=> {
  const [Productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(false);
  const [esCargaInicial, setEsCargaInicial] = useState(true);
  
  const filtrarProductos = (filtros: any) => {
    setCargando(true);
    let query = `${urlProductos}?`;
    if (filtros.nombre) query += `nombre=${filtros.nombre}&`;
    if (filtros.categoriaId) query += `categoriaId=${filtros.categoriaId}&`;
    if (filtros.estado) query += `estado=${filtros.estado}&`;
    axios
      .get(query)
      .then((response) => {
        setProductos(response.data);
        setEsCargaInicial(false); // Finaliza la carga inicial
      })
      .catch((error) => console.log("ops", error))
      .finally(() => setCargando(false));
  };
  useEffect(() => {
    axios
      .get(`${urlProductos}`)
      .then((response) => setProductos(response.data))
      .catch(() => console.log("No se pudieron cargar las categorías."))
      .finally(() => setEsCargaInicial(false));
  }, []);
  return (
    <div>
      <FiltroProductos onFiltrar={filtrarProductos} />

      {cargando || esCargaInicial ? (
        <div className="row">
          {/* Skeleton Loader */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="col-md-4 p-5">
              <div className="card">
                <Skeleton height={150} />
                <div className="card-body">
                  <Skeleton width={`80%`} />
                  <Skeleton width={`60%`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
          <ListadoGenerico listado={Productos}>
            <div className="row">
              {Productos.map((Producto,index) => (
                <div className="col-md-4 p-5" key={index}>
                <ProductoIndividual key={index} producto={Producto} onAgregarProducto={onProductoAgregado} />
                </div>
              ))}
            </div>
          </ListadoGenerico>
          
        
      )}
      </div>
  );
}
export default ListadoProductos;