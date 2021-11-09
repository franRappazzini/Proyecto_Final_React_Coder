import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import ItemCart from "./ItemCart";

function Cart() {
  const { carrito, setCarrito, precioTotal } = useCartContext();

  return (
    <section className="container">
      {carrito.length > 0 ? (
        carrito.map((p) => (
          <ItemCart
            key={p.id}
            id={p.id}
            img={p.img}
            producto={p.producto}
            precio={p.precio}
            descripcion={p.descripcion}
            categoria={p.categoria}
            cant={p.cant}
          />
        ))
      ) : (
        <section className="d-flex flex-column justify-content-center align-items-center mt-3">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega algo y lo verá aqui!</p>
          <Link to="/" className="btn btn-outline-primary">
            Volver al Home
          </Link>
        </section>
      )}

      {carrito.length > 0 && (
        <p className="my-3">
          Total: ${new Intl.NumberFormat().format(precioTotal())}
        </p>
      )}

      {carrito.length > 0 && (
        <section>
          <button className="btn btn-success me-2">Comprar</button>
          <button className="btn btn-outline-danger ms-2">
            Vaciar carrito
          </button>
        </section>
      )}
    </section>
  );
}

export default Cart;
