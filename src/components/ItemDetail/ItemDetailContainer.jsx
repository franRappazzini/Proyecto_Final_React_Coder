import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { useFirebaseContext } from "../../context/FirebaseContext";
import ItemDetail from "./ItemDetail";

function ItemDetailContainer() {
  const { productos, setIdParam, setCategoriaParam } = useFirebaseContext();
  const { idProducto } = useParams();

  idProducto ? setIdParam(idProducto) : setIdParam(null);

  useEffect(() => {
    setCategoriaParam(null);
  }, [setCategoriaParam, idProducto]);

  return (
    <>
      {productos && idProducto ? (
        <section className="container mt-3">
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
