import logo from "../assets/colabware.svg";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  let navigate = useNavigate();

  const loginHandler = async () => {
    try {
      let url = `http://127.0.0.1/login`;
      let res = await axios.get(url);
      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

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
              href="/project/my-test-project"
              className="nav-element-margin"
            >
              Browse projects
            </Nav.Link>
            <Button
              variant="outline-secondary"
              className="nav-element-margin"
              onClick={loginHandler}
            >
              Log in
            </Button>
            <Button
              variant="primary"
              className="nav-element-margin"
              onClick={() => {
                navigate("/project/new");
              }}
            >
              New project
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
