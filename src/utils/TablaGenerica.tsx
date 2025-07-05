// src/components/GenericTable.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableFooter,
  TablePagination,
  useTheme,
  styled
} from "@mui/material";
// Estilos personalizados para celdas y filas
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: 14,
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  }));
  
// Definición del tipo para cada columna
export interface Column<T> {
  id: string;
  label: string;
  // Función que extrae el contenido de la celda, a partir de la fila
  accessor: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
}

// Props del componente genérico
export interface GenericTableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  // Función para renderizar acciones personalizadas en cada fila (opcional)
  actions?: (row: T) => React.ReactNode;
  rowsPerPageOptions?: number[];
}

function TablaGenerica<T>({
  title,
  data,
  columns,
  actions,
  rowsPerPageOptions = [5, 10, 25]
}: GenericTableProps<T>): React.ReactElement {
    const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Datos paginados
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper elevation={3} sx={{ margin: theme.spacing(2), padding: theme.spacing(2) }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <StyledTableCell key={col.id} align={col.align || "left"}>
                  {col.label}
                </StyledTableCell>
              ))}
              {actions && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <StyledTableRow key={index}>
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.align || "left"}>
                    {col.accessor(row)}
                  </TableCell>
                ))}
                {actions && <TableCell>{actions(row)}</TableCell>}
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default TablaGenerica;
