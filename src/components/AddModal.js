import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

function MyVerticallyCenteredModal(props) {
  const [formState, formHandler] = useState(props.data);
  let date = new Date();
  let generatedId = date.getMilliseconds();

  const handleChange = (e) => {
    let propertyName = e.target.getAttribute("name");
    let propertyValue = e.target.value;
    const newObject = { ...formState };
    newObject[propertyName] = propertyValue;
    formHandler(newObject);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add/ Update Data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) =>
            props.updHandler(
              props.data?.id ?? generatedId,
              { ...props.data, ...formState },
              e
            )
          }
        >
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="title"
                placeholder="Add your title"
                defaultValue={props.data?.title}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Category
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="category"
                placeholder="Add Category"
                defaultValue={props.data?.category}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Price
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="price"
                type="number"
                placeholder="Price in Dollars"
                defaultValue={props.data?.price}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
            <Form.Label column sm="2">
              Desciption
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="description"
                as="textarea"
                rows={3}
                defaultValue={props.data?.description}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Image URL
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="image"
                type="url"
                placeholder="Add Image URL"
                defaultValue={props.data?.image}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <div style={{ marginLeft: "35%" }}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="primary" onClick={props.handleClose}>
              Close
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
