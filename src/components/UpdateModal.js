import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import React, { useState, useRef } from "react";
import UploadImage from "./UploadImage";

function MyVerticallyCenteredModal(props) {
  const [formState, formHandler] = useState(props.data);
  const urlRef = useRef(null);

  let date = new Date();
  let generatedId = date.getMilliseconds();

  const handleChange = (e) => {
    let propertyName = e.target.getAttribute("name");
    let propertyValue = e.target.value;
    const newObject = { ...formState };
    newObject[propertyName] = propertyValue;
    formHandler(newObject);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!urlRef.current.value) {
      return false;
    }
    switch (props.data.actionType) {
      case "Add":
        props.addHandler({ id: generatedId, ...props.data, ...formState });
        break;
      case "Update":
        props.updHandler(props.data.id, { ...props.data, ...formState });
        break;
      default:
        break;
    }
  };
  const imageUrlHandler = (url) => {
    urlRef.current.value = url;
    formHandler({ ...formState, image: url });
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
          {props.data.actionType} data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="title"
                placeholder="Add your title"
                defaultValue={props.data?.title}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Category
            </Form.Label>
            <Col sm="10">
              <Form.Control as="select">
                {props.data.categories &&
                  props.data.categories.map((category, index) => (
                    <option value={category} key={index}>
                      {category}
                    </option>
                  ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
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
                required
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
          <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
            <Form.Label column sm="2">
              Upload Image
            </Form.Label>
            <Col sm="10">
              <UploadImage
                title={props.data?.title || formState.title}
                oldImageUrl={props.data?.image}
                urlHandler={imageUrlHandler}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Image URL
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                ref={urlRef}
                name="image"
                type="url"
                disabled
                defaultValue={props.data?.image}
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
