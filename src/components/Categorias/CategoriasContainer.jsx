import React from "react";
import { Col, Row } from "react-bootstrap";
import { useFirebaseContext } from "../../context/FirebaseContext";
import CategoriasCard from "./CategoriasCard";

function CategoriasContainer() {
  const { productos } = useFirebaseContext();

  const categorias =
    productos &&
    productos.length > 0 &&
    Array.from(new Set(productos.map((producto) => producto.categoria)));

  console.log(categorias);

  return (
    <section className="container">
      <h4 className="text-center mt-5">Categorias</h4>

      {
        <Row>
          {productos &&
            productos.length > 0 &&
            categorias.map((categoria) => (
              <Col
                key={categoria}
                xd={12}
                md={6}
                className="d-flex justify-content-center"
              >
                <CategoriasCard key={categoria} categoria={categoria} />
              </Col>
            ))}
        </Row>
      }
    </section>
  );
}

export default CategoriasContainer;
