import { Form, Formik, FormikHelpers } from "formik";
import { credencialesUsuario } from "./auth.model";
import * as Yup from 'yup'
import FormGroupText from "../utils/FormGroupText";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
export default function FormularioAuth(props:formularioAuthProps){
return (
    <Formik initialValues={props.modelo}
    onSubmit={props.onSubmit}
    validationSchema={Yup.object({
        username:Yup.string().required('Este campo es requerido'),
        password:Yup.string().required('Este campo es requerido')
    })}>{
        formikProps=>(
            <Form>
                <FormGroupText type="text" label="Nombre de usuario" campo="username"></FormGroupText>
                
                <FormGroupText label="Password" campo="password" type="password"></FormGroupText>
                <Button disabled={formikProps.isSubmitting} type="submit">Enviar</Button>
                <Link className="btn btn-secondary" to="/">Cancelar</Link>
            </Form>
        )
    }

    </Formik>
)
} 
interface formularioAuthProps{
    modelo:credencialesUsuario;
    onSubmit(valoreS:credencialesUsuario,acciones:FormikHelpers<credencialesUsuario>):void
}