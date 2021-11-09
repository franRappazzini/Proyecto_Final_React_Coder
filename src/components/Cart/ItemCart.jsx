import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function ItemCart({ id, img, producto, descripcion, precio, cant, categoria }) {
  return (
    <Card style={{ maxWidth: "600px", marginTop: "1rem" }}>
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
          <Card.Body className="d-flex flex-column justify-content-between">
            <Link to={`/producto/${id}`}>
              <Card.Title>{producto}</Card.Title>
            </Link>
            <Card.Text>{descripcion}</Card.Text>
            <Card.Text>
              ${new Intl.NumberFormat().format(precio)} x {cant} = $
              {new Intl.NumberFormat().format(precio * cant)}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default ItemCart;
