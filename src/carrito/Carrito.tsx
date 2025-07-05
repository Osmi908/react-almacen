import React from "react";
import { Producto } from "../productos/productos.model";

interface CarritoProductosProps {
  carrito: { producto: Producto; cantidad: number }[];
  onEliminar: (id_producto: number) => void;
  onActualizarCantidad: (id_producto: number, cantidad: number) => void;
}

export default function CarritoProductos({ carrito, onEliminar, onActualizarCantidad }: CarritoProductosProps) {
  return (
    <div>
      <h4>Carrito de Productos</h4>
      <ul className="list-group">
        {carrito.map(({ producto, cantidad }) => (
          <li key={producto.id_producto} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {producto.nombre} - Cantidad:{" "}
              <input title="imput"
                type="number"
                value={cantidad}
                min={1}
                onChange={(e) => onActualizarCantidad(producto.id_producto, Number(e.target.value))}
                style={{ width: "60px" }}
              />
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => onEliminar(producto.id_producto)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
