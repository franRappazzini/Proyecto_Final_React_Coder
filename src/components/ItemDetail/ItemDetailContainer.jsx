import React, { useEffect } from "react";
import { Breadcrumb, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useFirebaseContext } from "../../context/FirebaseContext";
import ItemDetail from "./ItemDetail";

function ItemDetailContainer() {
  const { productos, setIdParam, setCategoriaParam } = useFirebaseContext();

  const { idProducto } = useParams();

  // setea el state de categoria
  useEffect(() => {
    setCategoriaParam(null);
  }, [setCategoriaParam, idProducto]);

  // setea el state de id del producto
  useEffect(() => {
    idProducto ? setIdParam(idProducto) : setIdParam(null);
  }, [idProducto, setIdParam]);

  return (
    <>
      {productos && idProducto ? (
        <section className="container mt-3">
          <Breadcrumb>
            <Link className="breadcrumb-item" to="/" style={{ color: "black" }}>
              Home
            </Link>
            <Link
              className="breadcrumb-item"
              to={`/categoria/${productos.categoria}`}
              style={{ color: "black" }}
            >
              {productos.categoria}
            </Link>
            <Breadcrumb.Item active>{productos.producto}</Breadcrumb.Item>
          </Breadcrumb>

          <ItemDetail productos={productos} idProducto={idProducto} />
        </section>
      ) : (
        <section className="d-flex justify-content-center mt-3">
          <Spinner animation="border" variant="warning" />
        </section>
      )}
    </>
  );
}

export default ItemDetailContainer;
