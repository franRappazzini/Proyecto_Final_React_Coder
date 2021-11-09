import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function ItemList({ id, producto, precio, img }) {
  return (
    <Card style={{ width: "15rem" }} className="my-3">
      <Card.Img
        variant="top"
        src={img}
        style={{ height: "9rem", objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column justify-content-between align-items-center">
        <Card.Title className="text-center">{producto}</Card.Title>
        <Card.Text className="text-center">
          ${new Intl.NumberFormat().format(precio)}
        </Card.Text>

        <div className="d-flex">
          <Link to={`/producto/${id}`} className="btn btn-outline-primary me-2">
            Ver más
          </Link>

          <Button className="btn btn-outline-danger ms-2">
            <FontAwesomeIcon icon={faHeart} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ItemList;
