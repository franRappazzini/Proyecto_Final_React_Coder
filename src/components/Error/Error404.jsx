import React from "react";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <section className="d-flex flex-column align-items-center justify-content-center mt-3">
      <h1>Error 404</h1>
      <h3 className="text-center">La página solicitada no fue encontrada.</h3>

      <Link to="/" className="btn btn-outline-primary mt-3">
        Volver al Home
      </Link>
    </section>
  );
}

export default Error404;
