import { ErrorMessage, Field } from "formik";
import MostrarErrorCampo from "./MostrarErrorCampo";

export default function FormGroupText({
    campo,
    label,
    placeholder,
    type = 'text'
}: formGroupTextProps) {
    return (
        <div className="form-group">
            {label ? <label htmlFor={campo}>{label}</label> : null}
            <Field type={type} name={campo} className="form-control" placeholder={placeholder} />
            <ErrorMessage name={campo}>
                {mensaje => <MostrarErrorCampo mensaje={mensaje}></MostrarErrorCampo>}
            </ErrorMessage>
        </div>
    );
}

interface formGroupTextProps {
    campo: string;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password';
}
