import data from "./data.json";
import { Row, Col, Button } from "react-bootstrap";
import Card from "./components/Card";
import AddModal from "./components/AddModal";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";

function BootStrapContainer(props) {
  const [state, stateHandler] = useState(data);
  const [modalState, modalStateHandler] = useState(false);
  const [modalData, modalDataHandlder] = useState({});

  const rmDataHandler = (id) => {
    let newState = state.filter((item) => item.id !== id);
    stateHandler(newState);
  };

  const showDataHandler = (id) => {
    modalDataHandlder(state.find((item) => item.id === id));
    modalStateHandler(true);
  };

  const updDataHandler = (id, formData, e) => {
    e.preventDefault();
    if (id) {
      const removedArr = [...state.filter((item) => item.id !== id)];
      stateHandler([...removedArr, { id: id, ...formData }]);
    } else {
      stateHandler([...state, formData]);
    }
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
      />
      <Row
        style={{ padding: "40px" }}
        sm={2}
        md={3}
        lg={4}
        className="align-items-stretch"
      >
        {state.map((item) => (
          <Col className="d-flex justify-content-center p-3" key={item.id}>
            <Card
              data={item}
              rmHandler={rmDataHandler}
              showHandler={showDataHandler}
              upHandler={updDataHandler}
            />
          </Col>
        ))}
        {props.location.pathname === "/inventry" ? (
          <Button onClick={showDataHandler} style={{ alignSelf: "center" }}>
            Add Item
          </Button>
        ) : null}
      </Row>
    </React.Fragment>
  );
}

export default withRouter(BootStrapContainer);
