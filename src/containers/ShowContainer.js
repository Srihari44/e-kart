import { Row, Col, Button } from "react-bootstrap";
import ShowCard from "../components/ShowCard";
import ShowModal from "../components/ShowModal";
import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { ProductsContext } from "../providers/StoreProvider";
import FilterProducts from "../components/FilterProducts";

function ShowContainer() {
  const [state, dispatch] = useContext(ProductsContext);
  const [viewState, viewStateHandler] = useState(state.products);
  const [modalState, modalStateHandler] = useState(false);
  const [modalData, modalDataHandlder] = useState(null);

  const showDataHandler = (id) => {
    modalDataHandlder(state.products.find((item) => item.id === id));
    modalStateHandler(true);
  };

  const filterDataHandler = (categories) => {
    let filterResults = state.products.filter((item) =>
      categories.includes(item.category)
    );
    let refinedResults =
      filterResults.length > 0 ? filterResults : state.products;
    viewStateHandler(refinedResults);
  };

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

  return (
    <React.Fragment>
      <ShowModal
        show={modalState}
        handleClose={() => modalStateHandler(false)}
        data={modalData}
      />
      <div
        className="d-flex align-items-center justify-content-between flex-wrap"
        style={{
          padding: "10px 90px 10px 5%",
          marginTop: "20px",
        }}
      >
        <FilterProducts handler={filterDataHandler} />
        <Button style={{ marginTop: "10px" }} onClick={exportHandler}>
          Export all Items
        </Button>
      </div>
      <Row
        style={{ padding: "30px" }}
        sm={2}
        md={3}
        lg={4}
        className="align-items-stretch"
      >
        {viewState.map((item) => (
          <Col className="d-flex justify-content-center p-3" key={item.id}>
            <ShowCard data={item} showHandler={showDataHandler} />
          </Col>
        ))}
      </Row>
      {state.user && (
        <Button
          onClick={() => dispatch({ type: "REM_USER" })}
          style={{ marginLeft: "45%" }}
          className="mb-4"
        >
          Log out
        </Button>
      )}
    </React.Fragment>
  );
}

export default withRouter(ShowContainer);
