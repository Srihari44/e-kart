import { Row, Col } from "react-bootstrap";
import ShowCard from "../components/ShowCard";
import ShowModal from "../components/ShowModal";
import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { ProductsContext } from "../providers/StoreProvider";
import FilterProducts from "../components/FilterProducts";

function ShowContainer() {
  const [state] = useContext(ProductsContext);
  const [viewState, viewStateHandler] = useState(state.products);
  const [modalState, modalStateHandler] = useState(false);
  const [modalData, modalDataHandlder] = useState();

  const showDataHandler = (id) => {
    modalDataHandlder(state.products.find((item) => item.id === id));
    modalStateHandler(true);
  };

  const handleModalClose = () => modalStateHandler(false);

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
        handleClose={handleModalClose}
        data={modalData}
        viewHandler={viewStateHandler}
      />
      <FilterProducts handler={filterDataHandler} />
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
    </React.Fragment>
  );
}

export default withRouter(ShowContainer);
