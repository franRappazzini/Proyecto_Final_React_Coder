import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { FloatingLabel, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";

function FormCompra() {
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [email, setEmail] = useState();
  const [email2, setEmail2] = useState();

  console.log(nombre, apellido, email, email2);

  function handleSubmit(e) {
    e.preventDefault();

    emailCheck();
  }

  // validar que los emails sean iguales
  function emailCheck() {
    if (email === email2) {
      alert("si");
    } else {
      Swal.fire(
        "Error",
        "Los email ingresados no coinciden. Ponga el mismo email para poder realizar la compra.",
        "error"
      );
    }
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
        <Button className="btn btn-outline-danger ms-2" type="reset">
          Reiniciar
        </Button>
      </Form>
    </section>
  );
}

export default FormCompra;
