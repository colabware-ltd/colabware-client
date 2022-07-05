import logo from "../assets/colabware.svg";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = (props) => {
  let navigate = useNavigate();

  const loginHandler = async () => {
    const url = `http://127.0.0.1/login`;
    try {
      let res = await axios.get(url);
      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  const logoutHandler = async () => {
    const url = `http://127.0.0.1/api/user/logout`;
    try {
      let res = await axios.get(url);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const authView = () => {
    if (!props.user.authorized) {
      return (
        <div>
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
            onClick={loginHandler}
          >
            Get started
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            variant="outline-secondary"
            className="nav-element-margin"
            onClick={logoutHandler}
          >
            Log out
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
        </div>
      );
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
            <Nav.Link href="/browse" className="nav-element-margin">
              Browse projects
            </Nav.Link>
            {authView()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
