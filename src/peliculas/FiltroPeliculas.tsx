import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { generoDTO } from "../generos/generos.model";
import Button from "../utils/Button";

export default function FiltroPeliculas() {
    const generos: generoDTO[] = [{ id: 1, nombre: 'Comedia' }, { id: 2, nombre: 'Accion' }]
    const valorInicial: filtroPeliculaForm = {
        titulo: '',
        generoId: 0,
        proximosEstrenos: false,
        enCines: false
    }
    return (
        <>
            <h3>
                Filtrar Peliculas
            </h3>
            <Formik initialValues={valorInicial}
                onSubmit={valores => console.log(valores)
                }>
                {(formikProps) => (
                    <Form>
                        <div className="form-inline">
                            <div className="form-group mb-2">
                                <label htmlFor="titulo" className="sr-only">Titulo</label>
                                <input type="text"
                                    className="form-control" id="titulo"
                                    placeholder="titulo pelicula"
                                    {...formikProps.getFieldProps('titulo')} />
                            </div>
                            <div className="form-group mx-sm-3 mb-2">
                                <select className="form-control"
                                    {...formikProps.getFieldProps('generoId')}>
                                    <option value="0">---Seleccione un genero---
                                    </option>
                                    {generos.map(genero => <option key={genero.id} value={genero.id}>{genero.nombre}</option>)}
                                </select>
                            </div>
                            <div className="form-group mx-sm-3 mb-2">
                                <Field className="form-check-input" id="proximosEstrenos" 
                                name="proximosEstrenos" type="checkbox"/>
                                <label className="form-check-label" htmlFor="proximosEstrenos">Proximos Estrenos</label>

                            </div>
                            <div className="form-group mx-sm-3 mb-2">
                                <Field className="form-check-input" id="enCines" 
                                name="enCines" type="checkbox"/>
                                <label className="form-check-label" htmlFor="enCines">en Cines</label>
                                
                            </div>
                            <Button className="btn btn-primary mb-2 mx-sm-3" onClick={() => formikProps.submitForm()}>Filtrar</Button>
                            <Button className="btn btn-danger mb-2" onClick={()=>formikProps.setValues(valorInicial)}> Limpiar</Button>
                        </div>
                    </Form>
                )}

            </Formik>
        </>
    )
}
interface filtroPeliculaForm {
    titulo: string;
    generoId: number;
    proximosEstrenos: boolean;
    enCines: boolean;
}