import LandingPage from "./LandingPage";
import CrearActores from "./actores/CrearActores";
import EditarActores from "./actores/EditarActores";
import IndiceActores from "./actores/IndiceActores";
import Registro from "./auth/Registro";
import Login from "./auth/Login";
import CrearCine from "./cines/CreaCine";
import EditarCine from "./cines/EditarCine";
import IndiceCines from "./cines/IndiceCines";
import CrearGenero from "./generos/CrearGenero";
import EditarGenero from "./generos/EditarGenero";
import IndiceGeneros from "./generos/IndiceGeneros";
import CrearPeliculas from "./peliculas/CrearPeliculas";
import EditarPeliculas from "./peliculas/EditarPeliculas";
import FiltroPeliculas from "./peliculas/FiltroPeliculas";
import RedireccionarLAnding from "./utils/REdireccionarLanding";
import IndiceUsuarios from "./auth/IndiceUsuarios";
import CrearCategoria from "./categorias/CrearCategoria";
import EditarCategoria from "./categorias/EditarCategoria";
import IndiceCategoria from "./categorias/IndiceCategorias";
import CrearSolicitud from "./solicitudes/CrearSolicitud";
import ValidarSolicitudes from "./solicitudes/GestionSolicitudes";
import IndiceSolicitudes from "./solicitudes/IndiceSolicitudes";
import IndiceProductos from "./productos/IndiceProductos";
import CrearProducto from "./productos/CrearProducto";
import { Home } from "@mui/icons-material";
import IndiceAcciones from "./acciones/IndiceAcciones";
import CrearAccion from "./acciones/CrearAccion";
const rutas=[
{path:'/categorias/editar/:id',componente:EditarCategoria, esAdmin:true , roles: ["admin", "encargado", "asistente", "solicitante","acad_estudiante"], icono:'Home', nombre:'Categorias Menu' },
{path:'/categorias/crear',componente:CrearCategoria, esAdmin:true , roles: ["admin", "encargado", "asistente", "solicitante","acad_estudiante"] }, 
{path:'/categorias',componente:IndiceCategoria,},

{path:'/generos/editar/:id',componente:EditarGenero, esAdmin:true},
{path:'/generos/crear',componente:CrearGenero, esAdmin:true},
{path:'/generos',componente:IndiceGeneros, exact:true, esAdmin:true},

{path:'/actores/crear',componente:CrearActores, esAdmin:true},
{path:'/actores/editar',componente:EditarActores, esAdmin:true},
{path:'/actores',componente:IndiceActores, exact:true},

{path:'/cines/crear',componente:CrearCine, esAdmin:true},
{path:'/cines/editar/:id',componente:EditarCine, esAdmin:true},
{path:'/cines',componente:IndiceCines, exact:true, esAdmin:true},

{path:'/peliculas/crear',componente:CrearPeliculas, esAdmin:true},
{path:'/peliculas/editar/:id',componente:EditarPeliculas, esAdmin:true},
{path:'/peliculas/filtrar',componente:FiltroPeliculas, exact:true},

{path:'/productos',componente:IndiceProductos, exact:true},
{path:'/productos/crear',componente:CrearProducto, exact:true},



{path:'/solicitudes/crear',componente:CrearSolicitud, roles:["acad_estudiante"], nombre:'Enviar solicitud'  },
{path:'/solicitudes/gestionar',componente:ValidarSolicitudes},
{path:'/solicitudes',componente:IndiceSolicitudes},

{path:'/acciones/crear',componente:CrearAccion, esAdmin:true},
{path:'/acciones',componente:IndiceAcciones, esAdmin:true},

{path:'/registro',componente:Registro},
{path:'/login',componente:Login},
{path:'/usuarios',componente:IndiceUsuarios,esAdmin:true},
{path:'/',componente:LandingPage, exact:true},
{path:'*',componente: RedireccionarLAnding}
];
export default rutas