import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { SolicitudDTO, DetalleSolicitudDTO } from "./solicitudes.model";

interface DetalleSolicitudProps {
  solicitud: SolicitudDTO | null;
  detalles: DetalleSolicitudDTO[];
  isOpen: boolean;
  toggle: () => void;
}

export default function DetalleSolicitud({
  solicitud,
  detalles,
  isOpen,
  toggle,
}: DetalleSolicitudProps) {
  if (!solicitud){console.log("es nulo");return null;} 

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>Detalle de la Solicitud</ModalHeader>
      <ModalBody>
        <div>
          <p><strong>ID:</strong> {solicitud.id_solicitud}</p>
          <p><strong>Descripción:</strong> {solicitud.descripcion}</p>
          <p><strong>Estado:</strong> {solicitud.cla_estado_solicitud}</p>
          <p><strong>Fecha:</strong> {new Date(solicitud.fecha_solicitud).toLocaleDateString()}</p>
        </div>

        <hr />

        <h5>Productos solicitados</h5>
        {detalles.length > 0 ? (
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((detalle, index) => (
                <tr key={detalle.id_detalle_solicitud}>
                  <td>{index + 1}</td>
                  <td>{detalle.nombre_producto}</td>
                  <td>{detalle.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay detalles disponibles para esta solicitud.</p>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
}
