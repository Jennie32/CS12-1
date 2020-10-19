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
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/execution-list">
                Executions
              </NavLink>
            </NavItem>
          </ul>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavMenu;
