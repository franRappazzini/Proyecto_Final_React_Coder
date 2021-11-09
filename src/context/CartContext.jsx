import React, { createContext, useContext, useState } from "react";

const cartContext = createContext();
export const useCartContext = () => useContext(cartContext);

function CartContext({ children }) {
  const [carrito, setCarrito] = useState([]);

  /**
   * FUNCTIONS
   */

  // agrega un producto al carrito
  function addToCart(producto, cantidad) {
    if (carrito.some((p) => p.id === producto.id)) {
      let repetido = carrito.find((p) => p.id === producto.id);

      repetido.cant += cantidad;
    } else {
      setCarrito([...carrito, producto]);
    }

    console.log(carrito);
  }

  // suma la cantidad total de productos en el carrito
  function productosEnCarrito() {
    let total = 0;
    carrito.forEach((p) => (total += p.cant));

    return total;
  }

  function precioTotal() {
    let total = 0;
    carrito.forEach((p) => (total += p.precio * p.cant));

    return total;
  }

  return (
    <cartContext.Provider
      value={{
        carrito,
        setCarrito,
        addToCart,
        productosEnCarrito,
        precioTotal,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartContext;
