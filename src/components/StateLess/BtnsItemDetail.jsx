import React from "react";
import { Link } from "react-router-dom";

function BtnsItemDetail() {
  return (
    <>
      <Link to="/" className="btn btn-outline-primary me-2">
        Seguir comprando
      </Link>
      <Link to="/carrito" className="btn btn-outline-primary ms-2">
        Ver carrito
      </Link>
    </>
  );
}

export default BtnsItemDetail;
