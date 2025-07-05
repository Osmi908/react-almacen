import { FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { urlCategorias } from "./endpoints";

export default function FiltroCategoriasReactstrap(props: FiltroProps) {
  const [categorias, setCategorias] = useState<{ id_categoria: number; nombre: string }[]>(
    []
  );

  useEffect(() => {
    // Cargar las categorías desde la API
    axios
      .get(`${urlCategorias}`)
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar las categorías:", error);
      });
  }, []);

  return (
    <FormGroup>
      <Label for="filtroCategorias">Categorías</Label>
      <Input
        type="select"
        id="filtroCategorias"
        value={props.categoriaSeleccionada || ""}
        onChange={(e) => {
            
          const categoriaId = e.target.value === "" ? null : parseInt(e.target.value, 10);
          console.log(e.target.value);
          props.onCategoriaSeleccionada(categoriaId);
        }}
      >
        <option value="">Todas las Categorías</option>
        {categorias.map((categoria) => (
            
          <option key={categoria.id_categoria} value={categoria.id_categoria}>
            {categoria.id_categoria}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
}

interface FiltroProps {
  categoriaSeleccionada: number | null; // ID de la categoría seleccionada
  onCategoriaSeleccionada: (categoriaId: number | null) => void; // Notificar cambios al padre
}
