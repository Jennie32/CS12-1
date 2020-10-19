import React, { Component } from "react";
import { Container } from "reactstrap";
import NavMenu from "./NavMenu";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <>
        <NavMenu />
        <Container fluid="md" className="themed-container">
          {this.props.children}
        </Container>
      </>
    );
  }
}
