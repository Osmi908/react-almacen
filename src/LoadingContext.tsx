// src/contexts/LoadingContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

interface LoadingContextProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps>({
  loading: false,
  setLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1300, // Asegura que esté por encima de otros componentes
          }}
        >
          <CircularProgress color="warning" />
        </Box>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
