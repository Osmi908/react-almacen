import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { detalleSolicitudSchema, Solicitud, solicitudSchema } from "./solicitud.model";
import ListadoSolicitudes from "./ListadoSolicitudes";

const GestionSolicitudes = () => {
    const { control, handleSubmit } = useForm<Solicitud>({
        resolver: zodResolver(detalleSolicitudSchema),
    });

    const { fields, update } = useFieldArray({
        control,
        name: "detalles", // Path to the activos array in Solicitud
    });

    const onSubmit = (data: Solicitud) => { 
        // Aquí puedes enviar la información a la API para guardar en la base de datos
        console.log("Datos enviados", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Gestión de Solicitudes</h1>
      <h2>Detalles</h2>
      {fields.map((field, index) => (
        <div key={field.id_producto}>
          <input title="b"
            defaultValue={field.nombre_producto}
            onChange={(e) =>
              update(index, { ...field, nombre_producto: e.target.value })
            }
          />
          <input title="a"
            type="number"
            defaultValue={field.cantidad}
            onChange={(e) =>
              update(index, { ...field, cantidad: Number(e.target.value) })
            }
          />
        </div>
      ))}
      <button type="submit">Guardar</button>
      <ListadoSolicitudes titulo={"Solicitudes Pendientes"} admin={true}/>
    </form>
    
    );
};

export default GestionSolicitudes;
