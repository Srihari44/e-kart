import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { ProductsContext } from "../providers/StoreProvider";
import { Button, ListGroup } from "react-bootstrap";
import FindColor from "./FindColor";

function Checkout(props) {
  const [state, dispatch] = useContext(ProductsContext);
  const [total, totalHandler] = useState(0);

  useEffect(() => {
    let subtotalArr = [
      ...state.checkedOutProducts.map((item) => item.subtotal),
    ];
    let totalPrice = subtotalArr.length
      ? subtotalArr.reduce((a, c) => a + c)
      : 0;
    totalHandler(totalPrice);
  }, [state.checkedOutProducts]);

  const updateProductCount = (id, rmFlag = false) => {
    dispatch({
      type: "UPDATE_PRODUCT_CHECKOUT",
      payload: { id: id, removeCount: rmFlag },
    });
  };

  const removeProduct = (id) => {
    dispatch({
      type: "REMOVE_PRODUCT_CHECKOUT",
      payload: { id: id },
    });
  };

  return (
    <React.Fragment>
      <div className="">
        {state.checkedOutProducts.length ? (
          <div className="mt-5 p-3 bg-white d-flex flex-column justify-content-center align-items-center flex-wrap">
            <p className="text-center" style={{ fontSize: "2.5rem" }}>
              Cart Items
            </p>
            <ListGroup style={{ minWidth: "45%" }}>
              {state.checkedOutProducts.map((item) => (
                <ListGroup.Item
                  style={{ height: "auto" }}
                  className="d-flex align-items-center justify-content-center"
                  key={item.id}
                >
                  <div className="d-flex flex-column h-100 mr-lg-5">
                    <img
                      style={{ height: "150px", width: "125px" }}
                      alt={item.title}
                      src={item.image}
                    />
                    <div className="d-flex justify-content-between align-items-center pt-3">
                      <Button
                        disabled={item.count <= 1}
                        onClick={() => updateProductCount(item.id, true)}
                      >
                        -
                      </Button>
                      {item.count}
                      <Button
                        disabled={item.count >= 10}
                        onClick={() => updateProductCount(item.id)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="ml-5">
                    <p style={{ fontSize: "1.25rem" }}>{item.title}</p>
                    <p
                      style={{
                        width: "fit-content",
                        backgroundColor: FindColor(item.category)[0],
                        color: FindColor(item.category)[1],
                      }}
                      className="mb-2 rounded p-1 category"
                    >
                      # {item.category}
                    </p>
                    <p
                      className="font-weight-bold"
                      style={{ fontSize: "1.25rem" }}
                    >
                      ${item.subtotal}
                    </p>
                    <Button onClick={() => removeProduct(item.id)}>
                      Remove
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <h3 className="text-primary text-center mt-3">Total: ${total}</h3>
          </div>
        ) : (
          <div className="text-center py-3 text-white d-flex flex-column align-items-center">
            <p style={{ fontSize: "2.5rem" }} className="pb-3">
              Your Cart is empty
            </p>
            <img
              alt="Empty Dustbin"
              className="d-block"
              style={{ height: "300px" }}
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP._oprlqm7BgiqEBezu4N3TQHaHa%26pid%3DApi&f=1"
            ></img>
            <Button
              className="my-3 mt-5"
              onClick={() => props.history.push("/")}
            >
              Return to Home
            </Button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default withRouter(Checkout);
