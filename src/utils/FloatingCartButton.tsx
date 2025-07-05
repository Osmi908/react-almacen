import { Fab, Badge, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { CarritoContext } from '../carrito/CarritoContext';
import AutenticacionContext from '../auth/AutenticacionContext';
import { urlCarrito } from './endpoints';

const FloatingCartButton = () => {
  const { cartCount, setCartCount } = useContext(CarritoContext) ?? { cartCount: 0, setCartCount: () => {} };
  const { claims } = useContext(AutenticacionContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userClaim = claims.find(claim => claim.nombre === 'sub');
    if (userClaim) {
      const userId = userClaim.valor;
      axios.get(`${urlCarrito}/${userId}`)
        .then(response => setCartCount(response.data.length))
        .catch(error => console.error("Error cargando el carrito:", error));
    }
  }, [claims, setCartCount]);

  return (
    <Tooltip title="Click para ver activos seleccionados">
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        <Fab color="primary" aria-label="cart" onClick={() => navigate('/solicitudes/crear')}>
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </Fab>
      </div>
    </Tooltip>
  );
};

export default FloatingCartButton;
