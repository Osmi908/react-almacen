import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"; // Componente que muestra los productos disponibles
import { CarritoDTO } from "../carrito/carrito.model";
import ListadoProductos from "../productos/ListadoProductos";

interface ModalAgregarProductosProps {
  open: boolean;
  onClose: () => void;
  onAgregarProducto: (producto: CarritoDTO) => void;
}

const ModalAgregarProductos: React.FC<ModalAgregarProductosProps> = ({ open, onClose, onAgregarProducto }) => {
  

  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Agregar Producto</DialogTitle>
      <DialogContent>
        <ListadoProductos onProductoAgregado={onAgregarProducto} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAgregarProductos;
