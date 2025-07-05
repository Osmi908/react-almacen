import { Form, Formik, FormikHelpers } from "formik";
import FormGroupText from "../utils/FormGroupText";
import Button from "../utils/Button";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { cineCreacionDTO } from "./cines.model";
export default function FormularioCines(props:formularioCinesProps){
    return(
            <Formik initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                nombre:Yup.string().required('Este campo es requerido')
            })}>
                {(formikProps)=>(
                    <Form>
                        <FormGroupText label="Nombre" campo="nombre"/>
                        <Button disabled={formikProps.isSubmitting} type="submit">Salvar</Button>
                        <Link className="btn-btn-seondary" to="/cines.tsx" >Cancelar</Link>
                    </Form>
                )}
            </Formik>
    )
}
interface formularioCinesProps{
    modelo:cineCreacionDTO;
    onSubmit(valores:cineCreacionDTO,acciones:FormikHelpers<cineCreacionDTO>):void;
}