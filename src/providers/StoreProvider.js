import React, { useReducer, createContext } from "react";
import data from "../data.json";
export const ProductsContext = createContext();

const initialState = {
  user: null,
  products: data,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload.formData],
      };
    case "UPDATE_PRODUCT":
      const removedArr = [
        ...state.products.filter((item) => item.id !== action.payload.id),
      ];
      return {
        ...state,
        products: [
          ...removedArr,
          { id: action.payload.id, ...action.payload.formData },
        ],
      };
    case "DEL_PRODUCT":
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };
    case "ADD_USER":
      return { ...state, user: true };

    case "REM_USER":
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
