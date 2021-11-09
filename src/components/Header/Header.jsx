import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import "./Header.css";

function Header() {
  const { productosEnCarrito } = useCartContext();

  return (
    <header>
      <section className="container d-flex justify-content-between align-items-center">
        <Link to="/">
          <h1 className="m-0">MELI</h1>
        </Link>

        <Form.Control
          type="search"
          placeholder="Buscar"
          style={{ width: "20rem" }}
        />

        <div className="d-flex">
          <Link to="/favoritos" className="me-3" title="Favoritos">
            <FontAwesomeIcon icon={faHeart} color="black" />
          </Link>

          <Link
            to="/carrito"
            className="ms-3 position-relative"
            title="Carrito"
          >
            <FontAwesomeIcon icon={faShoppingCart} color="black" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {productosEnCarrito()}
            </span>
          </Link>
        </div>
      </section>

      <section className="container">
        <ul className="d-flex justify-content-center">
          <li>
            <Link to="/categoria/Electronica">Electrónica</Link>
          </li>
          <li>
            <Link to="/categoria/Vehiculos">Vehículos</Link>
          </li>
          <li>
            <Link to="/categoria/Belleza">Belleza</Link>
          </li>
          <li>
            <Link to="/categoria/Moda">Moda</Link>
          </li>
        </ul>
      </section>
    </header>
  );
}

export default Header;
