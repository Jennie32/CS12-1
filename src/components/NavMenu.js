import React from "react";
import { Container, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        light
      >
        <Container>
          <NavbarBrand tag={Link} to="/">
            Payment claim
          </NavbarBrand>
          <NavbarBrand tag={Link} to="/execution-list">
            Executions
          </NavbarBrand>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavMenu;
