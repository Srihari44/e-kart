import { Row, Col, Button } from "react-bootstrap";
import Card from "../components/InventryCard";
import AddModal from "../components/UpdateModal";
import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { ProductsContext } from "../providers/StoreProvider";
import FilterProducts from "../components/FilterProducts";

function InventryContainer(props) {
  const [state, dispatch] = useContext(ProductsContext);
  const [filterState, filterStateHandler] = useState([]);
  const [modalState, modalStateHandler] = useState(false);
  const [modalData, modalDataHandlder] = useState({});

  const filterDataHandler = (categories) => {
    let filterResults = state.products.filter((item) =>
      categories.includes(item.category)
    );
    return filterResults.length > 0 ? filterResults : state.products;
  };

  const filteredItems = () => filterDataHandler(filterState);

  const exportHandler = () => {
    let jsonContent = JSON.stringify(state, null, 3);
    var link = document.createElement("a");
    link.setAttribute(
      "href",
      "data:text/json;charset=utf-8," + encodeURIComponent(jsonContent)
    );
    link.setAttribute("download", "ExportedData.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const showDataHandler = (id, action) => {
    let modalData = state.products.find((item) => item.id === id);
    let type = action === "update" ? "Update" : "Add";
    modalDataHandlder({ actionType: type, ...modalData });
    modalStateHandler(true);
  };

  const rmDataHandler = (id) => {
    dispatch({
      type: "DEL_PRODUCT",
      payload: id,
    });
  };

  const updDataHandler = (id, formData) => {
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: { id: id, formData: formData },
    });
    modalStateHandler(false);
  };

  const addDataHandler = (formData) => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: { formData: formData },
    });
    modalStateHandler(false);
  };

  const handleModalClose = () => modalStateHandler(false);

  return (
    <React.Fragment>
      <AddModal
        show={modalState}
        handleClose={handleModalClose}
        data={modalData}
        updHandler={updDataHandler}
        addHandler={addDataHandler}
      />
      <div
        style={{
          margin: "20px 65px 0px 0px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="outline-primary" onClick={showDataHandler}>
          + Add Item
        </Button>
      </div>
      <FilterProducts handler={filterStateHandler} />
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
              rmHandler={rmDataHandler}
              showHandler={showDataHandler}
              upHandler={updDataHandler}
            />
          </Col>
        ))}
      </Row>
      <Button onClick={exportHandler} style={{ marginBottom: "35px" }}>
        Export all Items
      </Button>
    </React.Fragment>
  );
}

export default withRouter(InventryContainer);
