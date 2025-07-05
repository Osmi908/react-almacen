// src/dashboards/DashboardSolicitante.tsx
import React from 'react';
import {
  Paper
} from '@mui/material';
import ListadoProductos from '../productos/ListadoProductos';
import FloatingCartButton from '../utils/FloatingCartButton';
import { CarritoProvider } from '../carrito/CarritoContext';

const DashboardSolicitante: React.FC = () => {
  return (
    <CarritoProvider>
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <ListadoProductos onProductoAgregado={()=>{}}/>
      <FloatingCartButton />
    </Paper>
    </CarritoProvider>
  );
};

export default DashboardSolicitante;
