import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SolicitudDTO, DetalleSolicitudDTO } from "./solicitudes.model";
import { urlSolicitudes } from "../utils/endpoints";
import { obtenerSolicitudesPorUsuario, obtenerSolicitudes, obtenerDetallesSolicitud } from "../api/solicitudes";
import CampoFecha from "../utils/CampoFecha";
import AutenticacionContext from "../auth/AutenticacionContext";
import { obtenerClaims } from "../auth/manejadorJWT";
import DetalleSolicitud from "./DetalleSolicitud";
import Autorizado from "../auth/Autorizado";
import { Link } from "react-router-dom";
import { url } from "node:inspector";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TextField, Paper, TablePagination
} from "@mui/material";
import Button from "../utils/Button";
export interface listaSolicitudesProps{
  admin:boolean;
  titulo:String;
}
const comparar = (a: any, b: any, orderBy: keyof SolicitudDTO, order: "asc" | "desc") => {
  if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
  if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
  return 0;
};
export default function ListadoSolicitudes(props:listaSolicitudesProps) {

  const { claims } = useContext(AutenticacionContext);
  const [solicitudes, setSolicitudes] = useState<SolicitudDTO[]>([]);
  const [cargando, setCargando] = useState(false);
  const [esCargaInicial, setEsCargaInicial] = useState(true);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<SolicitudDTO | null>(null);
  const [detalles, setDetalles] = useState<DetalleSolicitudDTO[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [orderBy, setOrderBy] = useState<keyof SolicitudDTO>("estado");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [pagina, setPagina] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(5);

  const SolicitudesFiltradas = solicitudes
  .filter((a) => (a.nombre_usuario_solicitud ?? '').toLowerCase().includes(busqueda.toLowerCase()))
  .sort((a, b) => comparar(a, b, orderBy, order));

  const cargarDetalles = (idSolicitud: number, solicitud: SolicitudDTO) => {
    setSolicitudSeleccionada(solicitud);
    setCargando(true);
    obtenerDetallesSolicitud(idSolicitud)
      .then((detalles) => {
        setDetalles(detalles);
        setModalAbierto(true);
      })
      .catch((error) => console.log("Error al cargar detalles:", error))
      .finally(() => setCargando(false));
  };
  
  const cerrarModal = () => {
    setSolicitudSeleccionada(null);
    setModalAbierto(false);
  };
  useEffect(() => {
    if (props.admin) {
      obtenerSolicitudes()
        .then(setSolicitudes)
        .catch(() => console.log("No se pudieron cargar las solicitudes."))
        .finally(() => setEsCargaInicial(false));
    } else {
      const id_usuario = claims.find((claim) => claim.nombre === "sub")?.valor;
      if (id_usuario) {
        obtenerSolicitudesPorUsuario(id_usuario)
          .then(setSolicitudes)
          .catch(() => console.log("No se pudieron cargar las solicitudes."))
          .finally(() => setEsCargaInicial(false));
      }
    }
  }, [claims]);

  return (
    <div>
            {cargando || esCargaInicial ? (
        <div className="row">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th><Skeleton /></th>
                <th><Skeleton /></th>
                <th><Skeleton /></th>
                <th><Skeleton /></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, index) => (
                <tr key={index}>
                  <td><Skeleton /></td>
                  <td><Skeleton /></td>
                  <td><Skeleton /></td>
                  <td><Skeleton /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Paper sx={{ padding: 2 }}>
    {/* 🔍 Filtro de búsqueda */}
    <TextField
      label="Buscar solicitud"
      variant="outlined"
      fullWidth
      onChange={(e) => setBusqueda(e.target.value)}
      sx={{ marginBottom: 2 }}
    />
        <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "prioridad"}
                  direction={order}
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                >
                  PRIORIDAD
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "nombre_usuario_solicitud"}
                  direction={order}
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                >
                  USUARIO
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "fecha_solicitud"}
                  direction={order}
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                >
                  FECHA 
                </TableSortLabel>
              </TableCell>
              <TableCell>ESTADO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SolicitudesFiltradas
              .slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina)
              .map((solicitud,index) => (
                <TableRow key={index}>
                  <TableCell>{solicitud.prioridad}</TableCell>
                  <TableCell>{solicitud.nombre_usuario_solicitud}</TableCell>
                  <TableCell><CampoFecha fecha={solicitud.fecha_solicitud}/></TableCell>
                  
                  <TableCell>{solicitud.estado}</TableCell>
                  <TableCell>                      <Button
                        onClick={() => cargarDetalles(solicitud.id_solicitud,solicitud)}
                      >
                        Ver Detalle
                      </Button>
                      </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={SolicitudesFiltradas.length}
        page={pagina}
        rowsPerPage={filasPorPagina}
        onPageChange={(_, nuevaPagina) => setPagina(nuevaPagina)}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={(e) => {
          setFilasPorPagina(parseInt(e.target.value, 10));
          setPagina(0);
        }}
      />
              </Paper>
        
      )}

<DetalleSolicitud
  solicitud={solicitudSeleccionada}
  detalles={detalles}
  isOpen={modalAbierto}
  toggle={cerrarModal}
/>
 </div>
  );
}