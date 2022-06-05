import { Component } from "react";
import { Container, Navbar } from "react-bootstrap";
import logo from "../assets/c.svg";

class Footer extends Component {
  render() {
    return (
      <Navbar style={{ marginTop: "80px" }}>
        <Container
          style={{
            borderTop: "0.5px solid #e0e0e0",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <Navbar.Brand
            href="/"
            className="my-auto"
            style={{ fontSize: "14px", color: "#6c757d" }}
          >
            <img alt="colabware-logo-main" src={logo} className="logo-footer" />{" "}
            &copy; 2022 Colabware Ltd.
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;
