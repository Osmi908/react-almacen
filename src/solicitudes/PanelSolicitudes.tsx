import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";


export default function PanelSolicitudes(Props:panelSolicitudesProps){
    const solicitudes = [
        { id: 101, fecha: '2025-02-01', estado: 'Pendiente', descripcion: 'Solicitud de 10 lápices' },
        { id: 102, fecha: '2025-02-02', estado: 'Aprobada', descripcion: 'Solicitud de 5 resmas de papel' },
        { id: 103, fecha: '2025-02-03', estado: 'Rechazada', descripcion: 'Solicitud de 3 sillas' }
      ];
    
      // Calcular estadísticas de solicitudes
      const total = solicitudes.length;
      const pendientes = solicitudes.filter(s => s.estado === 'Pendiente').length;
      const aprobadas = solicitudes.filter(s => s.estado === 'Aprobada').length;
      const rechazadas = solicitudes.filter(s => s.estado === 'Rechazada').length;
    
    return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          Panel de Solicitantes
        </Typography>
  
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total de Solicitudes
                </Typography>
                <Typography variant="h4">{total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Pendientes
                </Typography>
                <Typography variant="h4">{pendientes}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Aprobadas
                </Typography>
                <Typography variant="h4">{aprobadas}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Rechazadas
                </Typography>
                <Typography variant="h4">{rechazadas}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      );
}
export interface panelSolicitudesProps{

}