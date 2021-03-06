import React, { useReducer, createContext } from "react";
import data from "../data.json";
export const ProductsContext = createContext();

const initialState = {
  user: localStorage.getItem("userState"),
  products: data,
  checkedOutProducts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PRODUCT_CHECKOUT":
      let newProductProps = state.products.find(
        (item) => item.id === action.payload.id
      );

      let oldProductProps = state.checkedOutProducts.find(
        (item) => item.id === action.payload.id
      );

      let productProps = oldProductProps || newProductProps;
      let productPropsCount = productProps?.count || 0;

      let updatedProductPropsCount = action.payload.removeCount
        ? productPropsCount - 1
        : productPropsCount + 1;

      let updateBeforeIndex = state.checkedOutProducts.findIndex(
        (item) => item.id === action.payload.id
      );

      let updateAfterIndex =
        updateBeforeIndex === -1 ? updateBeforeIndex : updateBeforeIndex + 1;

      return {
        ...state,
        checkedOutProducts: [
          ...state.checkedOutProducts.slice(0, updateBeforeIndex),
          {
            ...productProps,
            count: updatedProductPropsCount,
            subtotal: updatedProductPropsCount * productProps.price,
          },
          ...state.checkedOutProducts.slice(updateAfterIndex),
        ],
      };

    case "REMOVE_PRODUCT_CHECKOUT":
      let removeBeforeIndex = state.checkedOutProducts.findIndex(
        (item) => item.id === action.payload.id
      );
      let deletedCheckout = [
        ...state.checkedOutProducts.slice(0, removeBeforeIndex),
        ...state.checkedOutProducts.slice(removeBeforeIndex + 1),
      ];
      return { ...state, checkedOutProducts: deletedCheckout };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [action.payload.formData, ...state.products],
      };

    case "UPDATE_PRODUCT":
      let updateProductIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      return {
        ...state,
        products: [
          ...state.products.slice(0, updateProductIndex),
          { id: action.payload.id, ...action.payload.formData },
          ...state.products.slice(updateProductIndex + 1),
        ],
      };

    case "DEL_PRODUCT":
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };

    case "BATCH_ADD_PRODUCT":
      return {
        ...state,
        products: [...action.payload.productList, ...state.products],
      };

    case "ADD_USER":
      localStorage.setItem("userState", JSON.stringify({ name: "testuser" }));
      return { ...state, user: "testuser" };

    case "REM_USER":
      localStorage.removeItem("userState");
      return { ...state, user: null };

    default:
      return state;
  }
};

export const ProductsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductsContext.Provider value={[state, dispatch]}>
      {props.children}
    </ProductsContext.Provider>
  );
};
