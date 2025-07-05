export interface Producto{
    id_producto:number;
    nombre:string;
    codigo:string;
    url_imagen:string;
    id_categoria:string;
    
    estado:number;
    cantidad:number;
}
export interface ProductoCreacionDTO {
    id_categoria: number;
    nombre: string;
    descripcion: string;
    imagen?: File; // ✅ Permitimos undefined para que sea compatible con RHF
    url_imagen?: string;
    estado: number;
    cantidad: number;
    codigo: string;
  }
  
export interface ProductoDTO{
    categoria_descripcion:string;
    id_producto:number;
    nombre:string;
    descripcion:string;
    imagen:string;
    url_imagen:string;
    id_categoria:string;
    estado:number;
    estado_descripcion:string;
    cantidad:number;
}
export interface landingPageDTO{
    enStock?:Producto[];
}

