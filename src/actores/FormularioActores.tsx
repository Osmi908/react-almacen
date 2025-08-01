import { Form, Formik, FormikHelpers } from "formik"
import { actorCreacionDTO } from "./actores.model"
import FormGroupText from "../utils/FormGroupText";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import * as Yup  from 'yup'
import FormGroupFecha from "../utils/FormGroupFecha";
import FormGroupImagen from "../utils/FormGroupImagen";
import FormGroupMarkdown from "../utils/FormGroupMarkdown";
export default function FormularioActores(props:FormularioActoresProps){
    return(
        <Formik initialValues={props.modelo}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({nombre:Yup.string().required('este campo es requerido')
             ,fechaNacimiento:Yup.date().nullable().required('Este campo es requerido')
            
        })}
        >
            {(formikProps)=>(
                <Form>
                    <FormGroupText campo={"nombre"} label="nombre"/>
                    <FormGroupFecha label="Fecha Nacimiento" campo="fechaNacimiento"/>
                    <FormGroupImagen campo="foto" label="Foto" imagenURL={props.modelo.fotoURL}/>
                    <FormGroupMarkdown campo="biografia" label="Biografia"/>
                    <Button disabled={formikProps.isSubmitting}
                    type="submit">Salvar</Button>
                    <Link className="btn btn-secondary" to="/actores">Cancelar</Link>
                </Form>
            )}
        </Formik>
    )
}
interface FormularioActoresProps{
    modelo:actorCreacionDTO;
    onSubmit(valores:actorCreacionDTO,acciones:FormikHelpers<actorCreacionDTO>):void;
}