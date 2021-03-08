import React, { useContext } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ProductsContext } from "../providers/StoreProvider";

const FilterDropdown = (props) => {
  const [state] = useContext(ProductsContext);
  let categoryList = [...new Set(state.products.map((item) => item.category))];
  let categoryColorList = state.products.map((item) => item.colors);
  let bgColorList = [...new Set(categoryColorList.map((item) => item[0]))];
  let fgColorList = [...new Set(categoryColorList.map((item) => item[1]))];
  let categoryOptionList = categoryList.map((item, index) => {
    return {
      value: item,
      label: item,
      bgColor: bgColorList[index],
      fgColor: fgColorList[index],
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
