import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { FloatingLabel, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import firebase from "firebase";
import { useCartContext } from "../../context/CartContext";
import { getFirebase } from "../../services/getFirebase";
import { useHistory } from "react-router";
import { checkoutLoader, createPDF } from "../../helpers/helpers";

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
        //
        createPDF(orden, res.id);
        //
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
    <section style={{ width: "70%", margin: "auto" }}>
      <h3 className="mt-3 mb-5">
        Complete el formulario para finalizar la compra
      </h3>

      <Form onSubmit={handleSubmit}>
        <Row xs={1} md={2}>
          <FloatingLabel
            controlId="floatingNombre"
            label="Nombre"
            className="mb-3"
          >
            <Form.Control
              onChange={(e) => setNombre(e.target.value)}
              autoFocus
              type="text"
              placeholder="Nombre"
              required
              value={nombre}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingApellido"
            label="Apellido"
            className="mb-3"
          >
            <Form.Control
              onChange={(e) => setApellido(e.target.value)}
              type="text"
              placeholder="Apellido"
              required
              value={apellido}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingEmail"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              value={email}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingEmail2"
            label="Repetir Email"
            className="mb-3"
          >
            <Form.Control
              onChange={(e) => setEmail2(e.target.value)}
              type="email"
              placeholder="Repetir Email"
              required
              value={email2}
            />
          </FloatingLabel>
        </Row>

        <Button className="btn btn-success me-2" type="submit">
          Enviar
        </Button>
        <Button onClick={vaciarForm} className="btn btn-outline-danger ms-2">
          Reiniciar
        </Button>
      </Form>
    </section>
  );
}

export default FormCompra;
