import React, { useState } from "react";
import { Row, Col, Form, Button, Tab, Tabs } from "react-bootstrap";
import UploadImage from "./UploadImage";
import ShowCard from "../Home/ShowCard";

export default function UpdateForm(props) {
  const [formState, formHandler] = useState(props.data);
  const [key, setKey] = useState("editform");

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
  const handleNext = (e) => {
    e.preventDefault();
    setKey("preview");
  };

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab eventKey="editform" title="Edit Form">
        <Form className="pt-3" onSubmit={handleNext}>
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
                <Form.Control
                  name="category"
                  defaultValue={props.data?.category}
                  as="select"
                  onChange={handleChange}
                >
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
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Next{" "}
            </Button>
            <Button variant="primary" onClick={props.handleClose}>
              Cancel{" "}
            </Button>
          </div>
        </Form>
      </Tab>
      <Tab eventKey="preview" title="Preview" disabled>
        <div className="d-flex align-items-center p-3 flex-wrap">
          <p style={{ fontSize: "1.5rem", maxWidth: "425px" }}>
            Are you sure to proceed with this changes? This is how it looks
          </p>
          {formState && <ShowCard data={{ ...props.data, ...formState }} />}
        </div>
        <div className="d-flex justify-content-center">
          <Button className="mr-5" onClick={() => setKey("editform")}>
            Back
          </Button>
          <Button onClick={() => props.submitHandler(formState)}>
            Yes, proceed
          </Button>
        </div>
      </Tab>
    </Tabs>
  );
}
