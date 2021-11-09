import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { useFirebaseContext } from "../../context/FirebaseContext";
import ItemList from "./ItemList";

function ItemListContainer() {
  const { productos, setCategoriaParam, setIdParam } = useFirebaseContext();
  const { idCategoria } = useParams();

  //setea el id del state de firebase
  setIdParam(null);

  idCategoria ? setCategoriaParam(idCategoria) : setCategoriaParam(null);

  return (
    <>
      {productos && productos.length > 0 ? (
        <section className="container">
          <Row>
            {productos.map((p) => (
              <Col
                key={p.id}
                xs={12}
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
        </section>
      ) : (
        <section className="d-flex justify-content-center mt-3">
          <Spinner animation="border" variant="warning" />
        </section>
      )}
    </>
  );
}

export default ItemListContainer;
