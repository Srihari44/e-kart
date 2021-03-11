import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "../providers/StoreProvider";
import React, { useContext } from "react";
import { IconButton, Badge } from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

function NavBar() {
  const [state] = useContext(ProductsContext);

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <NavLink className="navbar-brand" to="/">
        E-Kart
      </NavLink>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav className="px-lg-4">
          <NavLink to="/checkout">
            <IconButton className="nav-link py-2 pt-1 mr-md-4">
              <Badge
                badgeContent={state.checkedOutProducts.length}
                color="secondary"
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </NavLink>
          {!state.user ? (
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          ) : (
            <NavLink className="nav-link" to="/inventry">
              Inventry
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavBar;
