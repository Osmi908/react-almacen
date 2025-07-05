export default function CampoFecha(props:CampoFechaProps){
    const formatter = new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
const fecha=formatter.format(new Date(props.fecha));
    return (<>{fecha}</>)
}

interface CampoFechaProps {
    fecha: string; // Índice del estado
  }
