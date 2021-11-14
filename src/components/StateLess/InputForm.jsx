import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

function InputForm({ state, setState, type, placeholder }) {
  return (
    <FloatingLabel
      controlId={`floating${placeholder}`}
      label={placeholder}
      className="mb-3"
    >
      <Form.Control
        onChange={setState}
        type={type}
        placeholder={placeholder}
        required
        value={state}
      />
    </FloatingLabel>
  );
}

export default InputForm;
