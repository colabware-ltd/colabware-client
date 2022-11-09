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
    const url = `${process.env.REACT_APP_BACKEND_URL}/login`;
    try {
      let res = await axios.get(url);
      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  const logoutHandler = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/logout`;
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
    <Navbar
      sticky="top"
      expand="lg"
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #f2f2f2",
        height: "75px",
        boxShadow: "0px 0px 5px #f2f2f2",
      }}
    >
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
