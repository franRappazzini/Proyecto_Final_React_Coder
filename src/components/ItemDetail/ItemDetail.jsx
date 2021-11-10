import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";
import { useFavoritosContext } from "../../context/FavoritosContext";
import { useFirebaseContext } from "../../context/FirebaseContext";
import BtnsFavoritos from "../StateLess/BtnsFavoritos";
import BtnsItemDetail from "../StateLess/BtnsItemDetail";
import Counter from "../StateLess/Counter";

function ItemDetail({ productos, idProducto }) {
  const [cant, setCant] = useState(1);
  const [btns, setBtns] = useState(false);
  let { id, producto, precio, categoria, descripcion, img, stock } =
    productos && idProducto ? productos : "";
  const { carrito, addToCart } = useCartContext();
  const { stockItem, setStockItem } = useFirebaseContext();
  const { addToFavoritos, removeFromFavoritos } = useFavoritosContext();

  // setear stock segun los que haya en el carrito
  let repetido = carrito.find((p) => p.id === id);
  if (repetido) {
    setStockItem(stock - repetido.cant);
  }

  /**
   * FUNCTIONS
   */

  // resta 1 a cant
  function subtractCant() {
    setCant(cant - 1);
  }

  // suma 1 a cant
  function addCant() {
    setCant(cant + 1);
  }

  // pushea al carrito
  function pushToCart() {
    addToCart(
      {
        id,
        producto,
        precio,
        categoria,
        descripcion,
        img,
        cant,
      },
      cant
    );

    setCant(1);

    setBtns(true);
  }

  // pushea a favoritos
  function pushToFavoritos() {
    addToFavoritos({ id, producto, precio, img });
  }

  return (
    <Card style={{ width: "90%", margin: "auto" }}>
      <Row>
        <Col xs={12} md={8}>
          <Card.Img
            src={img}
            alt={producto}
            style={{ height: "25rem", objectFit: "contain" }}
          />
        </Col>

        <Col xs={12} md={4} className="d-flex">
          <Card.Body>
            <Card.Title>{producto}</Card.Title>
            <Card.Text>{descripcion}</Card.Text>
            <Card.Text style={{ fontSize: "1.5rem" }}>
              ${new Intl.NumberFormat().format(precio)}
            </Card.Text>

            <Card.Text>(Quedan {stockItem} disponibles)</Card.Text>

            {stockItem > 0 && (
              <>
                <Counter
                  cant={cant}
                  addCant={addCant}
                  subtractCant={subtractCant}
                  stockItem={stockItem}
                />

                <div className="d-flex mb-3">
                  <Button
                    onClick={pushToCart}
                    className="btn btn-outline-primary me-2"
                  >
                    Agregar al carrito
                  </Button>

                  <BtnsFavoritos
                    id={id}
                    pushToFavoritos={pushToFavoritos}
                    removeFromFavoritos={() => removeFromFavoritos(id)}
                  />
                </div>
              </>
            )}

            {(btns || stockItem === 0) && <BtnsItemDetail />}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default ItemDetail;
