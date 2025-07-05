import React, { ReactElement } from "react";

export default function ListadoGenerico(props: ListadoGenericoProps) {
  if (!props.listado) {
    return props.cargandoUI || <p>Cargando...</p>;
  } else if (props.listado.length === 0) {
    return props.listadoVacioUI || <p>No hay elementos para mostrar.</p>;
  } else {
    return props.children;
  }
}

interface ListadoGenericoProps {
  listado: any;
  children: ReactElement;
  cargandoUI?: ReactElement;
  listadoVacioUI?: ReactElement;
}
