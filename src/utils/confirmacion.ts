import Swal from "sweetalert2";

/**
 * Muestra un diálogo de confirmación personalizado.
 * @param mensaje Texto principal de la confirmación.
 * @param textoBotonConfirmar Texto del botón de acción.
 * @returns Promise<boolean> true si el usuario confirma, false si cancela.
 */
export async function confirmarAccion(
  mensaje: string,
  textoBotonConfirmar: string = "Sí, continuar"
): Promise<boolean> {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: mensaje,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: textoBotonConfirmar,
    cancelButtonText: "Cancelar"
  });

  return result.isConfirmed;
}