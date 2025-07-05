import { date } from "yup";
import FormularioActores from "./FormularioProducto";
import { urlActores, urlCategorias } from "../utils/endpoints";
import axios from "axios";
import { ProductoCreacionDTO } from "./productos.model";
import { useNavigate } from "react-router-dom";
import MostrarErrores from "../utils/MostrarErrores";
import { useState } from "react";
import { convertirActorAFormData } from "../utils/FormDataUtils";
import FormularioGenerico from "../utils/FormularioGenerico";
import FormularioProducto from "./FormularioProducto";

export default function CrearProducto(){
    return(
    <>
    <FormularioGenerico children={<FormularioProducto></FormularioProducto>} title="Producto"></FormularioGenerico>

    </>
         )
}