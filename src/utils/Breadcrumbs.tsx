import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { Breadcrumbs as MUIBreadcrumbs, Typography } from "@mui/material";

const breadcrumbNameMap: Record<string, string> = {
  "/": "Inicio",
  "/solicitudes": "Solicitudes",
  "/activos": "Activos",
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <MUIBreadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        
      <Link to="/"><HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />Inicio</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to] || value}
          </Typography>
        ) : (
          <Link to={to} key={to}>
            {breadcrumbNameMap[to] || value}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
}
