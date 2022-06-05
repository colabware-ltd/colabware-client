import { Component } from "react";
import logo from "../assets/colabware.svg";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import NewProjectButton from "./NewProjectButton";

class Header extends Component {
  render() {
    return (
      <Navbar expand="lg" style={{ borderBottom: "1px solid #efefef" }}>
        <Container>
          <Navbar.Brand href="/">
            <img alt="colabware-logo-main" src={logo} className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className="nav-element-margin">
                Home
              </Nav.Link>
              <Nav.Link
                href="/projects/my-test-project"
                className="nav-element-margin"
              >
                Browse projects
              </Nav.Link>
              <Button
                variant="outline-secondary"
                className="nav-element-margin"
              >
                Connect wallet
              </Button>
              <NewProjectButton />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
