import { Row, Col, Button } from "react-bootstrap";
import ShowCard from "../components/Home/ShowCard";
import ShowModal from "../components/Home/ShowModal";
import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { ProductsContext } from "../providers/StoreProvider";
import FilterProducts from "../components/FilterProducts";
import ExportProducts from "../components/ExportProducts";

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
        <ExportProducts />
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
