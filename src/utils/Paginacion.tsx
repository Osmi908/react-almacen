import { useEffect, useState } from "react";

// Componente Paginacion con parámetros predeterminados
export default function Paginacion({
    paginaActual,
    cantidadTotaldePaginas,
    radio = 3,
    onchange
}: PaginacionProps) {
    const [listadoLinks, setListadoLinks] = useState<ModeloLink[]>([]);

    useEffect(() => {
        const paginaAnteriorHabilitada = paginaActual !== 1;
        const paginaAnterior = paginaActual - 1;
        const links: ModeloLink[] = [];

        links.push({
            texto: 'Anterior',
            habilitado: paginaAnteriorHabilitada,
            pagina: paginaAnterior,
            activo: false
        });

        for (let i = 1; i <= cantidadTotaldePaginas; i++) {
            if (i >= paginaActual - radio && i <= paginaActual + radio) {
                links.push({
                    texto: i + '',
                    activo: paginaActual === i,
                    habilitado: true,
                    pagina: i
                });
            }
        }

        const paginaSiguienteHabilitada = paginaActual !== cantidadTotaldePaginas && cantidadTotaldePaginas > 0;
        const paginaSiguiente = paginaActual + 1;

        links.push({
            texto: 'Siguiente',
            pagina: paginaSiguiente,
            habilitado: paginaSiguienteHabilitada,
            activo: false
        });

        setListadoLinks(links);
    }, [paginaActual, cantidadTotaldePaginas, radio]);

    function obtenerClase(link: ModeloLink) {
        if (link.activo) {
            return "active pointer";
        }
        if (!link.habilitado) {
            return "disabled";
        }
        return "pointer";
    }

    function seleccionarPagina(link: ModeloLink) {
        if (link.pagina === paginaActual || !link.habilitado) {
            return;
        }
        onchange(link.pagina);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {listadoLinks.map(link => (
                    <li
                        key={link.texto}
                        onClick={() => seleccionarPagina(link)}
                        className={'page-item ' + obtenerClase(link)}
                    >
                        <span className="page-link">{link.texto}</span>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

// Definición de interfaces
interface ModeloLink {
    pagina: number;
    habilitado: boolean;
    texto: string;
    activo: boolean;
}

interface PaginacionProps {
    paginaActual: number;
    cantidadTotaldePaginas: number;
    radio?: number;
    onchange(pagina: number): void;
}
