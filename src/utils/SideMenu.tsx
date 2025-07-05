import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Drawer } from '@mui/material';
import AutenticacionContext from '../auth/AutenticacionContext';
import rutas from '../route-config';

const SideMenu = () => {
    const { claims } = useContext(AutenticacionContext);
    // Suponiendo que se almacena el rol en un claim llamado "role"
    const userRole = claims.find(claim => claim.nombre === 'role')?.valor;
    
    const m = [
        { label: "Inicio", path: "/", roles: ["admin", "encargado", "asistente", "solicitante"] },
        { label: "Activos", path: "/activos", roles: ["admin", "encargado", "asistente"] },
        { label: "Solicitudes", path: "/solicitudes", roles: ["admin", "encargado", "solicitante"] },
    ];

    const permittedItems = rutas.filter(item => item.roles?.includes(userRole|| ""));

    return (
        <Drawer variant="permanent" open>
            <List>
                {permittedItems.map((item, index) => (
                    <ListItem component={Link} to={item.path} key={index}>
                        <ListItemText primary="Pruebas" />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default SideMenu;
