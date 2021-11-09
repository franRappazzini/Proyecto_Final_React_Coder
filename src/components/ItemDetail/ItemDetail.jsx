import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { Card, Carousel, Col, Row } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";
import { useFirebaseContext } from "../../context/FirebaseContext";
import Counter from "../StateLess/Counter";

function ItemDetail({ productos, idProducto }) {
  const [cant, setCant] = useState(1);
  let { id, producto, precio, categoria, descripcion, img, stock } =
    productos && idProducto ? productos : "";
  const { carrito, addToCart } = useCartContext();
  const { stockItem, setStockItem } = useFirebaseContext();

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

            {stockItem > 0 ? (
              <>
                <Counter
                  cant={cant}
                  addCant={addCant}
                  subtractCant={subtractCant}
                  stockItem={stockItem}
                />

                <div className="d-flex">
                  <Button
                    onClick={pushToCart}
                    className="btn btn-outline-primary me-2"
                  >
                    Agregar al carrito
                  </Button>
                  <Button
                    className="btn btn-outline-danger ms-2"
                    title="Agregar a favoritos"
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </Button>
                </div>
              </>
            ) : null}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default ItemDetail;
