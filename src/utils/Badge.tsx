import { Badge as BadgeR } from "reactstrap";

export default function Badge(props: BadgeProps) {
  // Arrays con estados y colores
  const estados = [
    "Nuevo",
    "Usado",
    "Reparación",
    "Mantenimiento",
    "Obsoleto",
    "Retirado",
    "Dañado",
    "Préstamo",
  ];

  const coloresEstado = [
    "success",    // Nuevo
    "secondary",  // Usado
    "warning",    // Reparación
    "info",       // Mantenimiento
    "dark",       // Obsoleto
    "light",      // Retirado
    "danger",     // Dañado
    "primary",    // Préstamo
  ];

  // Validar id_estado y asignar valores por defecto si está fuera de rango
  const estado_descripcion = estados[props.estado] || "Desconocido";
  const color = coloresEstado[props.estado] || "secondary";

  return (
    <BadgeR pill color={color}>
      {props.nombre}
    </BadgeR>
  );
}

interface BadgeProps {
  estado: number; // Índice del estado
  nombre:string;
}
