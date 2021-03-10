import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, withRouter } from "react-router-dom";
import { ProductsContext } from "../providers/StoreProvider";
import React, { useContext } from "react";
import { IconButton, Badge } from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

function NavBar(props) {
  const [state] = useContext(ProductsContext);

  const redirectHandler = () => {
    props.history.push("/checkout");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <NavLink className="navbar-brand" to="/">
        E-Kart
      </NavLink>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
          <IconButton onClick={redirectHandler}>
            <Badge
              badgeContent={state.checkedOutProducts.length}
              color="secondary"
            >
              <ShoppingCartOutlinedIcon style={{ color: "#eee" }} />
            </Badge>
          </IconButton>
          <Nav>
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
export default withRouter(NavBar);
