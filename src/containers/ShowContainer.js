import { Row, Col } from "react-bootstrap";
import ShowCard from "../components/ShowCard";
import ShowModal from "../components/ShowModal";
import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { ProductsContext } from '../providers/StoreProvider'

function ShowContainer() {
  const [state] = useContext(ProductsContext);
  const [modalState, modalStateHandler] = useState(false);
  const [modalData, modalDataHandlder] = useState({});


  const showDataHandler = (id) => {
    modalDataHandlder(state.products.find((item) => item.id === id));
    modalStateHandler(true);
  };

  const handleModalClose = () => modalStateHandler(false);

  return (
    <React.Fragment>
      <ShowModal
        show={modalState}
        handleClose={handleModalClose}
        data={modalData}
      />
      <Row
        style={{ padding: "40px" }}
        sm={2}
        md={3}
        lg={4}
        className="align-items-stretch"
      >
        {state.products.map((item) => (
          <Col className="d-flex justify-content-center p-3" key={item.id}>
            <ShowCard data={item} showHandler={showDataHandler}/>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
}


export default withRouter(ShowContainer)