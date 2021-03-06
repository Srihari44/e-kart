import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import { Row, Col, Button } from "react-bootstrap";
import { ProductsContext } from "../providers/StoreProvider";
import Card from "../components/Inventry/InventryCard";
import ProductUpdateModal from "../components/Inventry/ProductUpdateModal";
import AddCategoryModal from "../components/Inventry/AddCategoryModal";
import RemoveModal from "../components/Inventry/RemoveModal";
import FilterProducts from "../components/FilterProducts";
import ExportProducts from "../components/ExportProducts";

function InventryContainer() {
  const [state, dispatch] = useContext(ProductsContext);
  const [filterState, filterStateHandler] = useState([]);
  const [productModalState, setProductModalState] = useState(false);
  const [modalData, modalDataHandlder] = useState({});
  const [categoryModalState, setCategoryModalState] = useState(false);
  const [rmModalState, setRmModalState] = useState(false)
  const [rmModalData, setRmModalData] = useState({})

  const filterDataHandler = (categories) => {
    let filterResults = state.products.filter((item) =>
      categories.includes(item.category)
    );
    return filterResults.length > 0 ? filterResults : state.products;
  };

  const filteredItems = () => filterDataHandler(filterState);

  const showDataHandler = (id, action) => {
    let categoryList = [
      ...new Set(state.products.map((item) => item.category)),
    ];
    let modalData = state.products.find((item) => item.id === id);
    let type = action === "update" ? "Update" : "Add";
    modalDataHandlder({
      actionType: type,
      categories: categoryList,
      ...modalData,
    });
    setProductModalState(true);
  };

  const rmDataHandler = (id) => {
    dispatch({
      type: "DEL_PRODUCT",
      payload: id,
    });
  };

  const showRmDataHandler = (data) => {
    setRmModalData(data)
    setRmModalState(true)
  }

  const updDataHandler = (id, formData) => {
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: { id: id, formData: formData },
    });
    setProductModalState(false);
  };

  const addDataHandler = (formData) => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: { formData: formData },
    });
    setProductModalState(false);
  };

  return (
    <React.Fragment>
      {!state.user && <Redirect to="/login" />}
      <ProductUpdateModal
        show={productModalState}
        handleClose={() => setProductModalState(false)}
        data={modalData}
        updHandler={updDataHandler}
        addHandler={addDataHandler}
      />
      <AddCategoryModal
        show={categoryModalState}
        handleClose={() => setCategoryModalState(false)}
      />
      <RemoveModal show={rmModalState} handleClose={()=>setRmModalState(false)} rmHandler={rmDataHandler} data={rmModalData }/>
      <div
        className="d-flex align-items-center justify-content-between flex-wrap"
        style={{
          padding: "10px 90px 10px 5%",
          marginTop: "20px",
        }}
      >
        <FilterProducts handler={filterStateHandler} />
        <div className="d-flex flex-wrap">
          <Button
            className="mr-4 my-lg-2 mt-2"
            style={{ marginTop: "10px" }}
            onClick={showDataHandler}
          >
            + Add Product
          </Button>
          <Button
            className="mr-4 my-lg-2 mt-2"
            style={{ marginTop: "10px" }}
            onClick={() => setCategoryModalState(true)}
          >
            + Add category
          </Button>
          <ExportProducts />
        </div>
      </div>
      <Row
        style={{ padding: "30px" }}
        sm={2}
        md={3}
        lg={4}
        className="align-items-stretch"
      >
        {filteredItems().map((item) => (
          <Col className="d-flex justify-content-center p-3" key={item.id}>
            <Card
              data={item}
              rmHandler={showRmDataHandler}
              showHandler={showDataHandler}
              upHandler={updDataHandler}
            />
          </Col>
        ))}
      </Row>
      <Button
        onClick={() => dispatch({ type: "REM_USER" })}
        style={{ marginLeft: "45%" }}
        className="mb-4"
      >
        Log out
      </Button>
    </React.Fragment>
  );
}

export default withRouter(InventryContainer);
