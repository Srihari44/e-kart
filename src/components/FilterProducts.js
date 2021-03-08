import React, { useContext } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ProductsContext } from "../providers/StoreProvider";
import FindColor from "./FindColor";

const FilterDropdown = (props) => {
  const [state] = useContext(ProductsContext);
  let categoryList = [...new Set(state.products.map((item) => item.category))];
  let categoryOptionList = categoryList.map((item, index) => {
    return {
      value: item,
      label: item,
      bgColor: FindColor(item)[0],
      fgColor: FindColor(item)[1],
    };
  });

  const animatedComponents = makeAnimated();
  const selectStyles = {
    control: (styles) => ({
      ...styles,
      minWidth: "240px",
    }),
    menu: (styles) => ({ ...styles, width: "240px" }),
    multiValue: (styles, { data }) => ({
      ...styles,
      backgroundColor: data.bgColor,
      color: data.fgColor,
    }),
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.fgColor,
    }),
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <h3 className="navbar-brand active">Filter by Category</h3>
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
