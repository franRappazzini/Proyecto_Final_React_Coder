import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { useFirebaseContext } from "../../context/FirebaseContext";
import "./Header.css";

function Header() {
  const { productosEnCarrito } = useCartContext();
  const { busqueda, setBusqueda } = useFirebaseContext();

  return (
    <header>
      <section className="container d-flex justify-content-between align-items-center pt-3">
        <Link to="/">
          <h1 className="m-0">MELI</h1>
        </Link>

        <Form.Control
          onChange={(e) => setBusqueda(e.target.value)}
          type="search"
          placeholder="Buscar"
          className="input__busqueda"
          value={busqueda}
        />

        <div className="d-flex">
          <NavLink
            activeStyle={{ color: "#dc3545" }}
            style={{ color: "black" }}
            to="/favoritos"
            className="me-2"
            title="Favoritos"
          >
            <FontAwesomeIcon icon={faHeart} />
          </NavLink>

          <NavLink
            activeStyle={{ color: "rgb(70, 70, 70)" }}
            to="/carrito"
            className="ms-2 position-relative"
            title="Carrito"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {productosEnCarrito()}
            </span>
          </NavLink>
        </div>
      </section>

      <section className="container py-2">
        <ul className="d-flex justify-content-center">
          <li>
            <NavLink
              activeStyle={{ fontWeight: "700" }}
              to="/categoria/Electronica"
            >
              Electrónica
            </NavLink>
          </li>
          <li>
            <NavLink
              activeStyle={{ fontWeight: "700" }}
              to="/categoria/Vehiculos"
            >
              Vehículos
            </NavLink>
          </li>
          <li>
            <NavLink
              activeStyle={{ fontWeight: "700" }}
              to="/categoria/Belleza"
            >
              Belleza
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ fontWeight: "700" }} to="/categoria/Moda">
              Moda
            </NavLink>
          </li>
        </ul>
      </section>
    </header>
  );
}

export default Header;
