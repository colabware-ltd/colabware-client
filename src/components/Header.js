import { Component } from "react";
import logo from "../assets/colabware.svg";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

class Header extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img alt="colabware-logo-main" src={logo} className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className="nav-element-margin">
                Home
              </Nav.Link>
              <Nav.Link href="#link" className="nav-element-margin">
                Browse projects
              </Nav.Link>
              <Button
                variant="outline-secondary"
                className="nav-element-margin"
              >
                Connect wallet
              </Button>
              <Button variant="primary" className="nav-element-margin">
                New project
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
