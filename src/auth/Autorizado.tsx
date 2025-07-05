import { ReactElement, useContext, useEffect, useState } from "react";
import AutenticacionContext from "./AutenticacionContext";

export default function Autorizado(props: AutorizadoProps) {
  const [estaAutorizado, setEstaAutorizado] = useState(false);
  const { claims } = useContext(AutenticacionContext);

  useEffect(() => {
    if (props.roles && props.roles.length > 0) {
      // Verificar si existe algún claim con nombre 'role' cuyo valor esté en el arreglo de roles permitidos
      const autorizado = claims.some(claim => 
        claim.nombre === 'role' && props.roles!.includes(claim.valor)
      );
      setEstaAutorizado(autorizado);
    } else {
      // Si no se especifica ningún rol, se autoriza siempre que haya algún claim (usuario autenticado)
      setEstaAutorizado(claims.length > 0);
    }
  }, [claims, props.roles]);

  return (
    <>
      {estaAutorizado ? props.autorizado : props.noAutorizado}
    </>
  );
}

interface AutorizadoProps {
  autorizado: ReactElement;
  noAutorizado: ReactElement;
  roles?: string[]; // Permite pasar múltiples roles (por ejemplo, ['admin', 'encargado'])
}
