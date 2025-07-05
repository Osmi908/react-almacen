
import './App.css';
import Menu from './utils/menu';
import rutas from './route-config'
import configurarValidaciones from './Validaciones';
import AutenticacionContext from './auth/AutenticacionContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, useMemo } from 'react';
import ThemeToggleButton from './utils/ThemeToggleButton';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { getDesignTokens } from './utils/theme_toggle';
import { claim } from './auth/auth.model';
import { obtenerClaims } from './auth/manejadorJWT';
import Login from './auth/Login';
import Breadcrumbs from './utils/Breadcrumbs';
configurarValidaciones()
export default function App() {
    const [claims, setClaims] = useState<claim[]>([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setClaims(obtenerClaims());
    }, []);

    function actualizar(claims: claim[]) { setClaims(claims) };
    function esAdmin() {
        return claims.findIndex(claims => claims.nombre === 'role' && claims.valor === 'acad_estudiante') > -1
    };
    const isAuthenticated = claims && claims.length > 0;

    const toggleDarkMode = () => setDarkMode((prev) => !prev);
    const theme = useMemo(() => createTheme(getDesignTokens(darkMode ? 'dark' : 'light')), [darkMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <AutenticacionContext.Provider value={{ claims, actualizar }}>
                    {isAuthenticated ?
                        <Menu themeToggle={<ThemeToggleButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
                            <Breadcrumbs />
                            <Routes>
                                {rutas.map(ruta =>
                                    <Route
                                        key={ruta.path}
                                        path={ruta.path}
                                        element={<ruta.componente />}
                                    />
                                )}
                            </Routes>
                        </Menu> : <Login />}
                </AutenticacionContext.Provider>
            </BrowserRouter>
        </ThemeProvider>
    );
}