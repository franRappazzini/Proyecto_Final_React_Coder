import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFavoritosContext } from "../../context/FavoritosContext";
import BtnsFavoritos from "../StateLess/BtnsFavoritos";
import "./ItemList.css";

function ItemList({ id, producto, precio, img }) {
  const { addToFavoritos, removeFromFavoritos } = useFavoritosContext();

  // pushea el producto a favoritos
  function pushToFavoritos() {
    addToFavoritos({ id, producto, precio, img });
  }

  return (
    <Card style={{ width: "15rem" }} className="my-3 item__cart">
      <Link to={`/producto/${id}`} title={producto}>
        <Card.Img
          variant="top"
          src={img}
          style={{ height: "9rem", objectFit: "contain" }}
        />
      </Link>
      <Card.Body className="d-flex flex-column justify-content-between align-items-center">
        <Link
          to={`/producto/${id}`}
          style={{ color: "#212529", textDecoration: "none" }}
        >
          <Card.Title className="text-center">{producto}</Card.Title>
        </Link>
        <Card.Text className="text-center">
          ${new Intl.NumberFormat().format(precio)}
        </Card.Text>

        <div className="d-flex">
          <Link to={`/producto/${id}`} className="btn btn-outline-primary me-2">
            Ver más
          </Link>

          <BtnsFavoritos
            id={id}
            pushToFavoritos={pushToFavoritos}
            removeFromFavoritos={() => removeFromFavoritos(id)}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default ItemList;
