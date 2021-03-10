import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { ProductsContext } from "../providers/StoreProvider";
import { Button, ListGroup } from "react-bootstrap";
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
          <div className="mt-3 p-3 bg-white">
            <h5 className="text-center">Cart Items</h5>
            <ListGroup>
              {state.checkedOutProducts.map((item) => (
                <ListGroup.Item
                  style={{ height: "200px" }}
                  className="d-flex mx-lg-5 align-items-center justify-content-between"
                  key={item.id}
                >
                  <img
                    alt={item.title}
                    className="h-100"
                    src={item.image}
                  ></img>
                  {item.title} Quantity:{item.count} Price:{item.price}{" "}
                  Subtotal:{item.subtotal}
                  <Button onClick={() => updateProductCount(item.id)}>+</Button>
                  <Button onClick={() => updateProductCount(item.id, true)}>
                    -
                  </Button>
                  <Button onClick={() => removeProduct(item.id)}>Remove</Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <h3 className="text-primary text-center mt-3">Total: {total}</h3>
          </div>
        ) : (
          <div className="text-center py-3 text-white d-flex flex-column align-items-center">
            <p style={{ fontSize: "2.5rem" }} className="pb-3">
              Your Cart is empty
            </p>
            <img
                              alt="Dustbin"
                              className="d-block"
                              style={{height:"300px" }}
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP._oprlqm7BgiqEBezu4N3TQHaHa%26pid%3DApi&f=1"
            ></img>
            <Button className="my-3 mt-5" onClick={() => props.history.push("/")}>
              Return to Home
            </Button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default withRouter(Checkout);
