import * as yup from 'yup';
export default function configurarValidaciones(){
    
  // Añadir método personalizado a Yup
  yup.addMethod(yup.string, 'primeraLetraMayuscula', function (message) {
    return this.test('primera-letra-mayuscula', message, function (value) {
      const { path, createError } = this;
      if (value && value.charAt(0) !== value.charAt(0).toUpperCase()) {
        return createError({ path, message: message || 'La primera letra debe ser mayúscula' });
      }
      return true;
    });
  });
  };
  
export const detalleSolicitudSchema=yup.object(
  {
    id_producto:yup.number().required(),
    cantidad:yup.number().required('La cantidad es obligatoria').min(1,'La cantidad debe ser al menos 1')
  }
);

export const solicitudProductosSchema=yup.object({
   usuario_solicitud: yup.string().required(),
   fecha_solicitud: yup.string().required(),
  cla_prioridad_solicitud:yup.number().required('Debe seleccionar la urgencia de si solicitud'),
  descripcion:yup.string().required('La descripcion de la Solicitud es obligatoria'),
  fecha_entrega_deseada:yup.string().required('La fecha que desea recibir los productos de la solicitud es obligatoria'),
  detalles:yup.array().of(detalleSolicitudSchema).min(1, 'Debe ser al menos un detalle en la silicutud')
 });

 export const formularioSolicitudSchema= yup.object().shape({
   usuario_solicitud: yup.string().required("El usuario solicitante es obligatorio"),
   cla_prioridad_solicitud: yup
     .number()
     .typeError("Debe seleccionar una prioridad válida")
     .min(1, "Debe seleccionar una prioridad válida")
     .required("La prioridad es obligatoria"),
   descripcion: yup.string().required("La descripción es obligatoria"),
   fecha_entrega_deseada: yup.string().required("La fecha de entrega es obligatoria")
   .test("is-valid-date", "La fecha debe ser posterior a la fecha actual", (value) => {
    const date = new Date(value);
    return date >= new Date();
  }),
   detalles: yup
     .array()
     .of(
       yup.object().shape({
         id_producto: yup.number().required("El ID del producto es obligatorio"),
         cantidad: yup
           .number()
           .min(1, "La cantidad debe ser al menos 1")
           .required("La cantidad es obligatoria"),
         id_carrito: yup.number().required("El ID del carrito es obligatorio"),
         nombre_producto: yup.string().required("El nombre del producto es obligatorio"),
       })
     )
     .min(1, "Debe agregar al menos un detalle"),
 });
// ✅ Validación para formulario de creación de productos
export const crearProductoSchema = yup.object({
  id_categoria: yup
    .number()
    .required("La categoría es obligatoria")
    .min(1, "Seleccione una categoría válida"),

  nombre: yup.string().required("El nombre es obligatorio"),

  descripcion: yup.string().required("La descripción es obligatoria"),

  imagen: yup
    .mixed<File>()
    .test("fileType", "Debe ser una imagen", (value) =>
      value instanceof File ? value.type.startsWith("image/") : false
    ),

  url_imagen: yup.string().optional(),

  estado: yup
    .number()
    .required("El estado es obligatorio")
    .typeError("Debe ingresar un número válido"),

  cantidad: yup
    .number()
    .required("La cantidad es obligatoria")
    .min(1, "Debe ser al menos 1")
    .typeError("Debe ingresar un número válido"),

  codigo: yup.string().required("El código es obligatorio"),
});
