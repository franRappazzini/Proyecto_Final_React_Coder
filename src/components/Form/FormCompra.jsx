import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { Breadcrumb, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import firebase from "firebase";
import { useCartContext } from "../../context/CartContext";
import { getFirebase } from "../../services/getFirebase";
import { useHistory } from "react-router";
import { checkoutLoader, createPDF } from "../../helpers/helpers";
import InputForm from "../StateLess/InputForm";
import { Link } from "react-router-dom";

function FormCompra() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const { carrito, setCarrito, precioTotal } = useCartContext();
  const history = useHistory();

  console.log(nombre, apellido, email, email2);

  // escucha el envio del form
  function handleSubmit(e) {
    e.preventDefault();

    if (carrito.length > 0) {
      emailCheck();
    } else {
      Swal.fire(
        "Error",
        "No hay productos en el carrito. Sera redirigido al home.",
        "error"
      ).finally(() => history.push("/"));
    }
  }

  // validar que los emails sean iguales
  function emailCheck() {
    if (email === email2) {
      sendToFirebase();
      checkoutLoader();
    } else {
      Swal.fire(
        "Error",
        "Los email ingresados no coinciden. Ponga el mismo email para poder realizar la compra.",
        "error"
      );
    }
  }

  // envia la compra a firebase
  function sendToFirebase() {
    let orden = {};
    orden.comprador = { nombre, apellido, email };
    orden.carrito = carrito;
    orden.total = precioTotal();
    orden.fecha = firebase.firestore.Timestamp.fromDate(new Date());

    const db = getFirebase();

    db.collection("compras")
      .add(orden)
      .then((res) => {
        Swal.fire(
          `Felicidades ${nombre} ${apellido}!`,
          `Su compra se realizo exitosamente, pronto recibira un mail para seguir el envio. A continuación se le descargara la factura de la compra.`,
          "success"
        );
        createPDF(orden, res.id);
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => {
        history.push("/");
        setCarrito([]);
      });
  }

  // vacia los datos del form
  function vaciarForm() {
    setNombre("");
    setApellido("");
    setEmail("");
    setEmail2("");
  }

  return (
    <section className="container">
      <Breadcrumb className="mt-3">
        <Link
          className="breadcrumb-item"
          to="/carrito"
          style={{ color: "black" }}
        >
          Volver al carrito
        </Link>

        <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
      </Breadcrumb>
      <section style={{ width: "70%", margin: "auto" }}>
        <h3 className="my-3 ">
          Complete el formulario para finalizar la compra
        </h3>

        <Form onSubmit={handleSubmit}>
          <Row xs={1} md={2}>
            <InputForm
              state={nombre}
              setState={(e) => setNombre(e.target.value)}
              type="text"
              placeholder="Nombre"
            />
            <InputForm
              state={apellido}
              setState={(e) => setApellido(e.target.value)}
              type="text"
              placeholder="Apellido"
            />
            <InputForm
              state={email}
              setState={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <InputForm
              state={email2}
              setState={(e) => setEmail2(e.target.value)}
              type="email"
              placeholder="Repita Email"
            />
          </Row>

          <Button className="btn btn-success me-2" type="submit">
            Enviar
          </Button>
          <Button onClick={vaciarForm} className="btn btn-outline-danger ms-2">
            Reiniciar
          </Button>
        </Form>
      </section>
    </section>
  );
}

export default FormCompra;
