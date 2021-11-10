import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import React from "react";
import { useFavoritosContext } from "../../context/FavoritosContext";

function BtnsFavoritos({ id, pushToFavoritos, removeFromFavoritos }) {
  const { buscarFavorito } = useFavoritosContext();

  return (
    <>
      {buscarFavorito(id) ? (
        <Button
          onClick={removeFromFavoritos}
          className="btn btn-outline-danger"
          title="Quitar de favoritos"
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      ) : (
        <Button
          onClick={pushToFavoritos}
          className="btn btn-outline-danger"
          title="Agregar a favoritos"
        >
          <FontAwesomeIcon icon={faHeart} />
        </Button>
      )}
    </>
  );
}

export default BtnsFavoritos;
