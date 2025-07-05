import { Form, Formik, FormikHandlers, FormikHelpers } from "formik";
import * as Yup from 'yup'
import FormGroupText from "../utils/FormGroupText";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import { generoCreacionDTO } from "./generos.model";
export default function FormularioGeneros(props:formularioGeneroProps){
    return(
        <>
        <Formik initialValues={props.modelo}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
            nombre: Yup.string().required('Este campo es requerido').max(50,'la longitud maxima es de 50 caracteres')
        })}
        >
            {(formikProps)=>(
                <Form> 
                <FormGroupText campo="nombre" label="Nombre" placeholder="nombre genero" ></FormGroupText>
                <Button disabled={formikProps.isSubmitting} type="submit"  >Salvar</Button>
                <Link className="btn btn-secondary" to="/generos">Cancelar</Link>
                </Form>
            )}
            
            
        </Formik>
        </>
    )
}
interface formularioGeneroProps{
    modelo:generoCreacionDTO;
    onSubmit(valores:generoCreacionDTO,accion:FormikHelpers<generoCreacionDTO>):void;
}