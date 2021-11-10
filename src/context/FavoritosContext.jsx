import React, { createContext, useContext, useState } from "react";

const favoritosContext = createContext();
export const useFavoritosContext = () => useContext(favoritosContext);

function FavoritosContext({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  // agrega el producto a favoritos
  function addToFavoritos(producto) {
    setFavoritos([...favoritos, producto]);
  }

  // elimina el producto de favoritos
  function removeFromFavoritos(id) {
    let newFavoritos = favoritos.filter((p) => p.id !== id);

    setFavoritos(newFavoritos);
  }

  // busca si existe el producto en favoritos
  function buscarFavorito(id) {
    return favoritos.find((p) => p.id === id);
  }

  return (
    <favoritosContext.Provider
      value={{ favoritos, addToFavoritos, removeFromFavoritos, buscarFavorito }}
    >
      {children}
    </favoritosContext.Provider>
  );
}

export default FavoritosContext;
