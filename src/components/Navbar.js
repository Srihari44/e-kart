import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "../providers/StoreProvider";
import { useContext } from "react";

export default function NavBar() {
  const [state] = useContext(ProductsContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <NavLink className="navbar-brand" to="/">
        E-Kart
      </NavLink>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
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
