import Button from "@restart/ui/esm/Button";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

function ItemCart({ id, img, producto, descripcion, precio, cant }) {
  const { borrarProducto } = useCartContext();

  return (
    <Card style={{ maxWidth: "600px" }} className="item__cart mt-3">
      <Row>
        <Col
          xs={5}
          className="d-flex justify-content-center align-items-center"
        >
          <Card.Img
            variant="top"
            src={img}
            style={{ height: "9rem", objectFit: "contain" }}
          />
        </Col>

        <Col xs={7}>
          <Card.Body className="d-flex flex-column justify-content-between align-items-start">
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to={`/producto/${id}`}
              title="Ver producto"
            >
              <Card.Title>{producto}</Card.Title>
            </Link>
            <Card.Text>{descripcion}</Card.Text>
            <Card.Text>
              ${new Intl.NumberFormat().format(precio)} x {cant} = $
              {new Intl.NumberFormat().format(precio * cant)}
            </Card.Text>

            <Button
              onClick={() => borrarProducto(id)}
              className="btn btn-outline-danger"
            >
              Eliminar del carrito
            </Button>

            {/* <div className="d-flex align-items-center">
              <Button className="btn btn-outline-primary btn-sm">-</Button>
              <p className="my-0 mx-2">0</p>
              <Button className="btn btn-outline-primary btn-sm">+</Button>
            </div> */}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default ItemCart;
