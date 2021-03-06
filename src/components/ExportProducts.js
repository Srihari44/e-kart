import React, { useContext } from "react";
import { CSVLink } from "react-csv";
import { Dropdown } from "react-bootstrap";
import { ProductsContext } from "../providers/StoreProvider";

export default function ExportProducts() {
  const [state] = useContext(ProductsContext);
  let newProducts = state.products.map((itemObj) => {
    return {
      id: itemObj.id,
      title: itemObj.title,
      price: itemObj.price,
      description: itemObj.description,
      category: itemObj.category,
      image: itemObj.image,
    };
  });
  const exportHandler = () => {
    let jsonContent = JSON.stringify(newProducts, null, 3);
    var link = document.createElement("a");
    link.setAttribute(
      "href",
      "data:text/json;charset=utf-8," + encodeURIComponent(jsonContent)
    );
    link.setAttribute("download", "ExportedProducts.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dropdown className="my-2">
      <Dropdown.Toggle id="dropdown-basic">Export Products</Dropdown.Toggle>
      <Dropdown.Menu>
        <CSVLink
          data={newProducts}
          filename={"ExportedProducts.csv"}
          className="dropdown-item"
          target="_blank"
        >
          - as CSV file
        </CSVLink>
        <Dropdown.Item as="button" onClick={exportHandler}>
          - as JSON file
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
