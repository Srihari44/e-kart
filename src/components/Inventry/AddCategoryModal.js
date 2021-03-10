import React, { useState, useContext } from "react";
import { ProductsContext } from "../../providers/StoreProvider";
import { Alert, Modal, ListGroup, Button } from "react-bootstrap";
import ProductUpdateForm from "./ProductUpdateForm";

export default function AddCategoryModal(props) {
  const [category, categoryHandler] = useState(null);
  const [products, productStateHandler] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [error, errorHandler] = useState(false);

  //eslint-disable-next-line
  const [state, dispatch] = useContext(ProductsContext);

  let date = new Date();
  let generatedId = date.getMilliseconds();

  const productHandleSubmit = (e, formData) => {
    e.preventDefault();
    productStateHandler([
      ...products,
      { ...formData, id: generatedId, category: category },
    ]);
    setShowProductForm(false);
  };

  const handleSubmit = () => {
    if (products.length) {
      errorHandler(false);
      dispatch({
        type: "BATCH_ADD_PRODUCT",
        payload: { productList: products },
      });
      props.handleClose();
    } else {
      errorHandler(true);
      return false;
    }
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
          Add Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert className="my-2" variant="danger">
            No products Added! Add atleast one product to add new category.
          </Alert>
        )}
        <div className="form-group row">
          <label className="form-label col-form-label col-sm-2">
            Enter Category Name
          </label>
          <div className="col-sm-10">
            <input
              placeholder="Category name"
              className="form-control"
              onChange={(e) => categoryHandler(e.target.value)}
            ></input>
          </div>
        </div>
        {showProductForm && (
          <React.Fragment>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              Enter Product Details
            </p>
            <ProductUpdateForm
              isNewCategory
              data=""
              handleClose={() => setShowProductForm(false)}
              submitHandler={productHandleSubmit}
            />
          </React.Fragment>
        )}
        {!showProductForm && (
          <Button
            variant="outline-primary"
            onClick={() => {
              errorHandler(false);
              setShowProductForm(true);
            }}
          >
            Add Product
          </Button>
        )}
        {products.length > 0 && (
          <div>
            <p>Added Product List</p>
            <ListGroup>
              {products.map((item) => (
                <ListGroup.Item key={item.id}>{item.title}</ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
        <div className="mt-3">
          <Button onClick={handleSubmit} className="mr-3">
            Save Changes
          </Button>
          <Button onClick={props.handleClose}>Cancel</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
