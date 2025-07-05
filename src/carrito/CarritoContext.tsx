// src/context/CarritoContext.tsx
import React, { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from 'react';
import { CarritoDTO } from './carrito.model';

interface CarritoContextType {
  carritoItems:CarritoDTO[];
  cartCount: number;
  setCartCount: (count: number) => void;
  setCarritoItems:Dispatch<SetStateAction<CarritoDTO[]>>;
}

export const CarritoContext = createContext<CarritoContextType | undefined>(undefined);
export const useCarrito=()=>{
    const context=useContext(CarritoContext);
    if (!context) {
      throw new Error('useContext debe usarse dentro de un CarritoProvider');
    }
    return context;
  }
export const CarritoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [carritoItems, setCarritoItems]= useState<CarritoDTO[]>([]); 

  return (
    <CarritoContext.Provider value={{ cartCount, setCartCount,carritoItems,setCarritoItems }}>
      {children}
    </CarritoContext.Provider>
  );
};


// src/context/CarritoContext.tsx
// import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from 'react';
// import { CarritoDTO } from './carrito.model';

// interface CarritoContextProps{
//   cartCount:number;
//   setCartCount:(count: number) => void;
//   cartItems:CarritoDTO[];
//   setCartItems:Dispatch<SetStateAction<CarritoDTO[]>>;
// }
// export const CarritoContext = createContext<CarritoContextProps | undefined>(undefined);
// export const useCarrito=()=>{
//   const context=useContext(CarritoContext);
//   if (!context) {
//     throw new Error('useContext debe usarse dentro de un CarritoProvider');
//   }
//   return context;
// }
// interface CarritoProviderProps{
//   children:ReactNode;
// }
// export const CarritoProvider: React.FC<CarritoProviderProps> = ({ children }) => {
//   const [cartCount, setCartCount] = useState(0);
//   const [cartItems, setCartItems]= useState<CarritoDTO[]>([]); 
//   return (
//     <CarritoContext.Provider value={{ cartCount, setCartCount,cartItem,setCartItems }}>
//       {children}
//     </CarritoContext.Provider>
//   <CarritoContext.Provider value={{cartItems,setCartItems }}>
//        {children}
//  </CarritoContext.Provider>
//   );
// };
