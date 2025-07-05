import { ReactElement, useContext } from "react";
import IndiceEntidad from "../utils/IndiceEntidad";
import { usuarioDTO } from "./auth.model";
import { urlCuentas } from "../utils/endpoints";
import Button from "../utils/Button";
import AutenticacionContext from "./AutenticacionContext";

export default function IndiceUsuario(){
    const {claims}=useContext(AutenticacionContext);
    return(
        <>
        <IndiceEntidad<usuarioDTO> 
        url={`${urlCuentas}/listadoUsuarios`}
        titulo="Usuario"
         urlCrear={""}>
            {usuarios=><>
            <thead>
                <tr>
                    <th>

                    </th>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                {usuarios?.map(usuario=><tr key={usuario.id} >
                    <td>
                        <Button onClick={()=>{}}>HacerAdmin</Button>
                    
                        <Button className="btn btn-danger" onClick={()=>{}}>RemoverAdmin</Button>
                    </td>
                    <td>{usuario.username}</td>
                </tr>)}
            </tbody>
            </>}
            </IndiceEntidad> 
         </>
    )
}