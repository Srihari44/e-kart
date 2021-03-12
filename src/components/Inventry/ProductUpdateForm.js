import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import UploadImage from "./UploadImage";

export default function UpdateForm(props) {
  const [formState, formHandler] = useState(props.data);

  const handleChange = (e) => {
    let propertyName = e.target.getAttribute("name");
    let propertyValue = e.target.value;
    const newObject = { ...formState };
    newObject[propertyName] = propertyValue;
    formHandler(newObject);
  };

  const imageUrlHandler = (url) => {
    formHandler({ ...formState, image: url });
  };

  return (
    <Form onSubmit={(e) => props.submitHandler(e, formState)}>
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
      {!props.isNewCategory && (
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Category
          </Form.Label>
          <Col sm="10">
            <Form.Control as="select" onChange={handleChange}>
              {props.data.categories &&
                props.data.categories.map((category, index) => (
                  <option value={category} key={index}>
                    {category}
                  </option>
                ))}
            </Form.Control>
          </Col>
        </Form.Group>
      )}
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Price
        </Form.Label>
        <Col sm="10">
          <Form.Control
            name="price"
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
            title={props.data?.title || formState.title || "untitled"}
            oldImageUrl={props.data?.image}
            urlHandler={imageUrlHandler}
          />
        </Col>
      </Form.Group>
      <div style={{ marginLeft: "35%" }}>
        <Button variant="primary" type="submit">
          {props.isNewCategory ? "Add Product" : "Submit"}
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          {props.isNewCategory ? "Cancel" : "Close"}
        </Button>
      </div>
    </Form>
  );
}
