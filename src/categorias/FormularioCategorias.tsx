import { Form, Formik, FormikHandlers, FormikHelpers } from "formik";
import * as Yup from 'yup'
import FormGroupText from "../utils/FormGroupText";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import { categoriaCreacionDTO } from "./Categorias.model";
export default function FormularioCategorias(props:formularioCategoriaProps){
    return(
        <>
        <Formik initialValues={props.modelo}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
            nombre: Yup.string().required('Este campo es requerido').max(50,'la longitud maxima es de 50 caracteres')
        })}>
            {(formikProps)=>(
                <Form> 
                    <FormGroupText campo="nombre" label="Nombre" placeholder="nombre categoria" ></FormGroupText>
                    <Button disabled={formikProps.isSubmitting} type="submit"  >Salvar</Button>
                    <Link className="btn btn-secondary" to="/generos">Cancelar</Link>
                </Form>
            )}
        </Formik>
        </>
    )
}
interface formularioCategoriaProps{
    modelo:categoriaCreacionDTO;
    onSubmit(valores:categoriaCreacionDTO,accion:FormikHelpers<categoriaCreacionDTO>):void;
}