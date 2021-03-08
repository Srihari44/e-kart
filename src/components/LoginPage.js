import { Form, Button, Alert } from "react-bootstrap";
import { useState, useRef, useContext } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom"
import { ProductsContext } from "../providers/StoreProvider";

export default function LoginPage() {
  // eslint-disable-next-line
  const [_, dispatch] = useContext(ProductsContext);
  const [errorState, errorStateHandler] = useState(false);
  const [redirect, redirectHandler] = useState(false);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailRef.current.value === "testuser@test.com") {
      if (passRef.current.value === "testuser") {
        dispatch({ type: "ADD_USER" });
        redirectHandler(true);
      }
    } else {
      errorStateHandler(true);
    }
  };
  return (
    <div
      style={{ marginTop: "10%" }}
      className="d-flex justify-content-center align-items-center rounded flex-wrap"
    >
      {redirect && <Redirect to="/inventry" />}
      <h5 className="mx-5 text-white py-3">Enter Login details</h5>
      <Form className="bg-white p-4 m-2" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          {errorState && <Alert variant="danger">Invalid Credentials</Alert>}
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            onChange={() => errorStateHandler(false)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passRef}
            type="password"
            placeholder="Password"
            onChange={() => errorStateHandler(false)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/" className="btn btn-outline-primary">Back</Link>
      </Form>
    </div>
  );
}
