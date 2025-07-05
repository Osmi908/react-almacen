import React, { useContext, useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import axios from "axios";
import { urlAcciones } from "./endpoints";
import AutenticacionContext from "../auth/AutenticacionContext";
import * as MuiIcons from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";

interface MenuItem {
  id_accion: number;
  nombre: string;
  ruta: string | null;
  icono: string;
  id_padre: number | null;
  subacciones?: MenuItem[];
}

const ListaMenu: React.FC = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>({});
  const { claims } = useContext(AutenticacionContext);
  const rol = claims.find((c) => c.nombre === "roleId")?.valor || "";

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        console.log(rol+" este es el rol");
        const response = await axios.get<MenuItem[]>(`${urlAcciones}/role/${rol}`);
        const dataConJerarquia = construirArbol(response.data);
        setMenu(dataConJerarquia);
      } catch (error) {
        console.error("Error al obtener el menú:", error);
      }
    };

    fetchMenu();
  }, [rol]);

  const construirArbol = (items: MenuItem[]) => {
    const map = new Map<number, MenuItem>();
    const raiz: MenuItem[] = [];

    items.forEach((item) => {
      item.subacciones = [];
      map.set(item.id_accion, item);
    });

    items.forEach((item) => {
      if (item.id_padre !== null) {
        const padre = map.get(item.id_padre);
        padre?.subacciones?.push(item);
      } else {
        raiz.push(item);
      }
    });

    return raiz;
  };

  const toggleMenu = (id: number) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (MuiIcons as any)[iconName];
    return IconComponent ? <IconComponent /> : <CategoryIcon />;
  };

  const renderMenuItems = (items: MenuItem[]) =>
    items.map((item) => (
      <React.Fragment key={item.id_accion}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => toggleMenu(item.id_accion)} component={item.ruta ? Link : "div"} to={item.ruta || ""}>
            <ListItemIcon>{renderIcon(item.icono)}</ListItemIcon>
            <ListItemText primary={item.nombre} />
            {item.subacciones && item.subacciones.length > 0 && (openMenus[item.id_accion] ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        {item.subacciones && item.subacciones.length > 0 && (
          <Collapse in={openMenus[item.id_accion]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderMenuItems(item.subacciones)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));

  return <List>{renderMenuItems(menu)}</List>;
};

export default ListaMenu;
