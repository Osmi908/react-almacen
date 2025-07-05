import { urlProductos, urlGeneros } from "../utils/endpoints";
import IndiceEntidad from "../utils/IndiceEntidad";
import { ProductoDTO } from "./productos.model";

export default function IndiceGeneros(){
    
  
    

    return (
        <>
        <IndiceEntidad<ProductoDTO> 
        url={urlProductos} 
                urlCrear="productos/crear" 
                titulo="Productos" 
                nombreEntidad="Producto"
           >
            {(productos,botones)=> <>
            <thead>
            <tr>
                <th></th>
                <th>Nombre</th>
            </tr>
            </thead>
            <tbody>
                {productos?.map(producto=>
                <tr key={producto.id_producto}>
                    <td>
                        {botones(`productos/editar/${producto.id_producto}`,producto.id_producto)}
                        </td>
                    <td>
                        {producto.nombre}
                    </td>
                </tr>)}
            </tbody>
        
            </>}
        </IndiceEntidad>
        
        </>
            )
}