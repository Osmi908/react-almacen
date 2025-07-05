import React from "react";
import Autorizado from "./auth/Autorizado";
import AdminDashboard from "./dashboards/AdminDashboard";
import EncargadoDashboard from "./dashboards/EncargadoDashboard";
import AsistenteDashboard from "./dashboards/AsistenteDashboard";
import SolicitanteDashboard from "./dashboards/SolicitanteDashboard";
import ElegantTable from "./utils/ElegantTable";

export default function LandingPage() {
  return (
    <>
    {/* Opcional: Contenido público o genérico para usuarios autenticados */}
    <Autorizado
        autorizado={
          <div>
            </div>
        }
        noAutorizado={<div>Debes iniciar sesión para acceder a la información.</div>}
      />
    {/* Dashboard para los Administrativos que crean solicitudes */}
    <Autorizado
        autorizado={<SolicitanteDashboard />}
        noAutorizado={<></>}
        roles={["solicitante", "administrativo","acad_estudiante"]}  // Define los roles correspondientes para los que crean solicitudes
      />
      {/* Panel para Administrador */}
      <Autorizado
        autorizado={<AdminDashboard />}
        noAutorizado={<></>}
        roles={["admin"]}
      />

      {/* Panel para Encargado */}
      <Autorizado
        autorizado={<EncargadoDashboard />}
        noAutorizado={<></>}
        roles={["encargado"]}
      />

      {/* Panel para Asistente */}
      <Autorizado
        autorizado={<AsistenteDashboard />}
        noAutorizado={<></>}
        roles={["asistente"]}
      />

      
    </>
  );
}
