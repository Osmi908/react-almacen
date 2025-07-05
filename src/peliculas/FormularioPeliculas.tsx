import { Form,Formik, FormikHelpers, validateYupSchema } from "formik";
import { PeliculaCreacionDTO } from "./peliculas.model"
import * as Yup from 'yup'
import FormGroupText from "../utils/FormGroupText";
import FormGroupCheckbox from "./FormGroupCheckbox";
import FormGroupFecha from "../utils/FormGroupFecha";
import FormGroupImagen from "../utils/FormGroupImagen";
import Button from "../utils/Button";
import SelectorMultiple, { selectorMultipleModel } from "../utils/SelectorMultiple";
import { generoDTO } from "../generos/generos.model";
import { useState } from "react";
import { cineDTO } from "../cines/cines.model";
export default function FormularioPeliculas(props:formularioPeliculasProps)
{
    const[generosSeleccionados,setGenerosSeleccionados]=
    useState(mapear(props.generosSeleccionados));
    const[generosNoSeleccionados,setGenerosNoSeleccionados]=
    useState(mapear(props.generosNoSeleccionados));

    const [cinesSeleccionados,setCinesSeleccionados]=
    useState(mapear(props.cinesSeleccionados));
    const [cinesNoSeleccionados,setCinesNoSeleccionados]=
    useState(mapear(props.cinesNoSeleccionados));
    function mapear(arreglo:{id:number,nombre:string}[]):selectorMultipleModel[]{
        return arreglo.map(valor=>{
            return {llave:valor.id,valor:valor.nombre}
        })
    }
    return(
    
    <Formik 
    initialValues={
        props.modelo
    } 
    onSubmit={(valores,acciones)=>{
        valores.generosIds=generosSeleccionados.map(valor=>valor.llave);
        valores.cinesIds=cinesSeleccionados.map(valor=>valor.llave)
        props.onSubmit(valores,acciones);
    }}
        validationSchema={Yup.object({
        titulo:Yup.string().required('Este campo es requerido')
    })}>
        {formikProps=>(
        <Form>
            
            <FormGroupText label="Titulo" campo="titulo"/>
            <FormGroupText label="trailer" campo="trailer"></FormGroupText>
            <FormGroupCheckbox label="En Cines" campo="enCines"/>
            <FormGroupFecha label="Fecha Lanzamiento" campo="fechaLanzamiento"></FormGroupFecha>
            <FormGroupImagen campo="poster" label="poster" imagenURL={props.modelo.posterURL}></FormGroupImagen>
            <div className="form-group">
            <label>GENEROS</label>
            <SelectorMultiple 
            seleccionados={generosSeleccionados} 
            noSeleccionados={generosNoSeleccionados} 
            onChange={(seleccionados,noSeleccionados)=>{
            setGenerosSeleccionados(seleccionados)
            setGenerosNoSeleccionados(noSeleccionados);
            }} ></SelectorMultiple>
            </div>
            <div className="form-group">
            <label>CINES</label>
            <SelectorMultiple 
            seleccionados={cinesSeleccionados} 
            noSeleccionados={cinesNoSeleccionados} 
            onChange={(seleccionados,noSeleccionados)=>{
            setCinesSeleccionados(seleccionados)
            setCinesNoSeleccionados(noSeleccionados);
            }} ></SelectorMultiple>
            </div>
            <Button disabled={formikProps.isSubmitting } type="submit">Enviar</Button>
            
        </Form>
    )}
    </Formik>)
    
}
interface formularioPeliculasProps{
    modelo:PeliculaCreacionDTO;
    onSubmit(valores:PeliculaCreacionDTO,acciones:FormikHelpers<PeliculaCreacionDTO>):void;
    generosSeleccionados:generoDTO[];
    generosNoSeleccionados:generoDTO[];
    cinesSeleccionados:cineDTO[];
    cinesNoSeleccionados:cineDTO[];
}