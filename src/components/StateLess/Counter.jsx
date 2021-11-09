import Button from "@restart/ui/esm/Button";
import React from "react";

function Counter({ cant, subtractCant, addCant, stockItem }) {
  return (
    <section className="d-flex align-items-center mb-2">
      <Button
        disabled={cant === 1}
        onClick={subtractCant}
        className="btn btn-outline-primary btn-sm"
      >
        -
      </Button>
      <p className="my-0 mx-2">{cant}</p>
      <Button
        disabled={cant === stockItem}
        onClick={addCant}
        className="btn btn-outline-primary btn-sm"
      >
        +
      </Button>
    </section>
  );
}

export default Counter;
