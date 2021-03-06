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
          <div className="p-3 bg-white d-flex align-items-center flex-wrap">
            <div className="ml-lg-5 pl-lg-5">
              <p className="text-center" style={{ fontSize: "2.5rem" }}>
                Cart Items
              </p>
              <ListGroup
                style={{
                  maxWidth: "750px",
                }}
              >
                {state.checkedOutProducts.map((item) => (
                  <ListGroup.Item
                    style={{ height: "auto" }}
                    className="d-flex w-100 align-self-start"
                    key={item.id}
                  >
                    <div className="d-flex flex-column h-100 mr-lg-5">
                      <img
                        style={{ height: "130px", width: "110px" }}
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
            </div>
            <div className="d-flex justify-content-between flex-wrap">
              <div style={{ width: "100px" }}></div>
              <div>
                <p
                  className="text-primary text-center py-2 m-0 align-self-baseline"
                  style={{ fontSize: "1.5rem" }}
                >
                  Total
                </p>
                <p
                  className="p-0 m-0"
                  style={{ fontSize: "2.5rem", fontWeight: "400" }}
                >
                  ${total}
                </p>
              </div>
            </div>
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
