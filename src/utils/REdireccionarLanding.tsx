import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedireccionarLanding() {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirige a la ruta deseada
        navigate('/');
    }, [navigate]);

    return null; // No renderiza nada
}