import React, { useContext } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ProductsContext } from "../providers/StoreProvider";

const FilterDropdown = (props) => {
  const [state] = useContext(ProductsContext);
  let categoryList = [...new Set(state.products.map((item) => item.category))];
  let categoryOptionList = categoryList.map((item) => {
    return { value: item, label: item };
  });
  const animatedComponents = makeAnimated();
  const selectStyles = {
    control: (styles) => ({
      ...styles,
      minWidth: "240px",
      marginLeft: "30px",
    }),
  };
  return (
    <div
      style={{
        display: "flex",
        marginTop: "20px",
        flexWrap: "wrap",
      }}
    >
      <h4
        className="navbar-brand active"
        style={{ color: "#fff", paddingLeft: "30px" }}
      >
        Filter by Category
      </h4>
      <Select
        styles={selectStyles}
        label="Filter by Category"
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={categoryOptionList}
        onChange={(categoryOptions) =>
          props.handler(categoryOptions.map((item) => item.value))
        }
      />
    </div>
  );
};

export default FilterDropdown;
