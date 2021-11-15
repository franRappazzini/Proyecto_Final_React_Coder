import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CategoriasCard({ categoria }) {
  return (
    <Card style={{ width: "30rem" }} className="item__cart my-2">
      <Link
        to={`/categoria/${categoria}`}
        style={{ color: "#212529", textDecoration: "none" }}
        title={`Ver ${categoria}`}
      >
        <Card.Body>
          <Card.Title>{categoria}</Card.Title>
          <Card.Text>Encontra lo mejor en {categoria} y más aca.</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default CategoriasCard;
