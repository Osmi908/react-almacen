import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { urlAcciones, urlRoles } from "../utils/endpoints";

interface AccionDto {
  id_accion: number;
  nombre: string;
}

interface RolDto {
  RoleId: string;
  RoleName: string;
  Description:string;
}

const FormularioAcciones = () => {
  const [roles, setRoles] = useState<RolDto[]>([]);
  const [accionesPadre, setAccionesPadre] = useState<AccionDto[]>([]);
  const [formulario, setFormulario] = useState({
    nombre: "",
    ruta: "",
    icono: "",
    descripcion: "",
    id_padre: null as number | null,
    roleId: "",
    esPadre: false,
  });

  useEffect(() => {
    const cargarDatos = async () => {
      const [resRoles, resAcciones] = await Promise.all([
        axios.get(urlRoles),
        axios.get(`${urlAcciones}/padres`)
      ]);
      setRoles(resRoles.data);
      setAccionesPadre(resAcciones.data);
    };

    cargarDatos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, esPadre: e.target.checked, id_padre: e.target.checked ? null : formulario.id_padre });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...formulario, id_padre: formulario.esPadre ? null : formulario.id_padre };
    await axios.post(urlAcciones, data);
    alert("Acción creada con éxito");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Crear Acción</Typography>
      <TextField fullWidth label="Nombre" name="nombre" value={formulario.nombre} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Ruta" name="ruta" value={formulario.ruta} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Icono (ej: Home, Settings)" name="icono" value={formulario.icono} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Descripción" name="descripcion" value={formulario.descripcion} onChange={handleChange} margin="normal" />
      
      <FormControlLabel
        control={<Checkbox checked={formulario.esPadre} onChange={handleCheckbox} />}
        label="¿Es acción padre?"
      />

      {!formulario.esPadre && (
        <TextField
          fullWidth
          select
          label="Acción Padre"
          name="id_padre"
          value={formulario.id_padre || ""}
          onChange={handleChange}
          margin="normal"
        >
          {accionesPadre.map((accion) => (
            <MenuItem key={accion.id_accion} value={accion.id_accion}>
              {accion.nombre}
            </MenuItem>
          ))}
        </TextField>
      )}

      <TextField
        fullWidth
        select
        label="Rol"
        name="roleId"
        value={formulario.roleId}
        onChange={handleChange}
        margin="normal"
      >
        {roles.map((rol) => (
          <MenuItem key={rol.RoleId} value={rol.RoleId}>
            {rol.Description}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Guardar</Button>
    </Box>
  );
};

export default FormularioAcciones;
