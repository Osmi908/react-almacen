// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Cambia a "dark" si lo prefieres
    primary: {
      main: "#ffeb3b", // Amarillo brillante (puedes oscurecer si deseas más sobriedad)
    },
    secondary: {
      main: "#00bfa5", // Verde aguamarina
    },
    info: {
      main: "#68ddbd", // Verde claro
    },
    warning: {
      main: "#038554", // Verde oscuro
    },
    background: {
      default: "#f5f7fa", // Fondo claro institucional
      paper: "#ffffff",   // Fondos de tarjetas/dialogos
    },
    text: {
      primary: "#1c1c1c",
      secondary: "#5c5c5c",
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Segoe UI', 'Helvetica Neue', sans-serif`,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
