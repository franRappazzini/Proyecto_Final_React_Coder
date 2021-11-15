import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { useFirebaseContext } from "../../context/FirebaseContext";
import ItemList from "./ItemList";

function ItemListContainer() {
  const { productos, setCategoriaParam, setIdParam, busqueda } =
    useFirebaseContext();
  const { idCategoria } = useParams();

  //setea el id del state de firebase
  useEffect(() => {
    setIdParam(null);
  }, [setIdParam, idCategoria]);

  // si existe el parametro de categoria, filtra los productos de esa categoria
  useEffect(() => {
    idCategoria ? setCategoriaParam(idCategoria) : setCategoriaParam(null);
  }, [idCategoria, setCategoriaParam]);

  // para buscar por productos por nombre
  let filtroBusqueda =
    productos && busqueda
      ? productos.filter(
          (p) =>
            p.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
            p.categoria.toLowerCase().includes(busqueda.toLowerCase())
        )
      : productos;

  console.log(filtroBusqueda);

  return (
    <>
      {productos && productos.length > 0 ? (
        <section className="container">
          <Row>
            {filtroBusqueda.map((p) => (
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
        </section>
      ) : (
        <section className="d-flex justify-content-center mt-3">
          <Spinner animation="border" variant="warning" />
        </section>
      )}

      {filtroBusqueda && filtroBusqueda.length === 0 && (
        <h3 className="text-center mt-3">
          Lo siento, su busqueda no arrojo resultados.
        </h3>
      )}
    </>
  );
}

export default ItemListContainer;
