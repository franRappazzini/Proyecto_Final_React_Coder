import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFavoritosContext } from "../../context/FavoritosContext";
import ItemList from "../ItemList/ItemList";

function Favoritos() {
  const { favoritos } = useFavoritosContext();

  return (
    <section className="container">
      {favoritos.length > 0 ? (
        <>
          <h3 className="mt-3">Productos en favoritos: {favoritos.length}</h3>

          <Row>
            {favoritos.map((p) => (
              <Col
                key={p.id}
                xs={6}
                md={3}
                className="d-flex justify-content-center"
              >
                <ItemList
                  key={p.id}
                  id={p.id}
                  producto={p.producto}
                  precio={p.precio}
                  img={p.img}
                />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <section className="d-flex flex-column justify-content-center align-items-center mt-3">
          <h2 className="text-center">No tiene productos favoritos</h2>
          <p className="text-center">Agrega algo y lo verá aqui!</p>
          <Link to="/" className="btn btn-outline-primary">
            Volver al Home
          </Link>
        </section>
      )}
    </section>
  );
}

export default Favoritos;
