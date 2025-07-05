// theme.ts
import { createTheme, Theme } from "@mui/material/styles";

export const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#0d47a1',
          },
          secondary: {
            main: '#00acc1',
          },
          background: {
            default: '#f4f6f8',
            paper: '#ffffff',
          },
          text: {
            primary: '#212121',
            secondary: '#616161',
          },
        }
      : {
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#80deea',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
          },
        }),
  },
  typography: {
    fontFamily: `'Roboto', 'Segoe UI', sans-serif`,
    button: { fontWeight: 600 },
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
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});