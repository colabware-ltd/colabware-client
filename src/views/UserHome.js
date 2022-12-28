import {
  Card,
  Row,
  Col,
  Button,
  Nav,
  Tab,
  Form,
  OverlayTrigger,
  Tooltip,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import Footer from "../components/Footer";
import { get } from "../utils/Api";
import { useEffect, useState } from "react";
import TokenHolding from "../components/TokenHolding";
import RequestPreview from "../components/RequestPreview";

const UserHome = (props) => {
  const [holdings, setHoldings] = useState([]);
  const [requests, setRequests] = useState([]);

  const stripeHandler = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/stripe`;
    try {
      let res = await axios.get(url);
      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  const userRequests = async () => {
    const res = await get("userRequests");
    if (res.data.results == null) {
      setRequests([]);
    } else {
      setRequests(res.data.results);
    }
  };

  const userTokens = async () => {
    const res = await get("userTokens");
    if (res.data.results == null) {
      setHoldings([]);
    } else {
      setHoldings(res.data.results);
    }
  };

  useEffect(() => {
    userRequests();
    userTokens();
  }, []);

  return (
    <Tab.Container defaultActiveKey="home">
      <Row className="g-0" style={{ backgroundColor: "#f7faff" }}>
        <Col
          md="auto"
          style={{
            backgroundColor: "white",
            boxShadow: "0px 0px 5px #f2f2f2",
          }}
        >
          <div
            id="side-nav-sticky"
            style={{
              width: "250px",
              margin: "20px",
            }}
          >
            <Nav variant="pills" className="flex-column">
              <Nav.Item style={{ marginBottom: "10px", cursor: "pointer" }}>
                <Nav.Link eventKey="home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item
                style={{ marginBottom: "10px", cursor: "pointer" }}
                disabled
              >
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip>Coming soon!</Tooltip>}
                >
                  <Nav.Link style={{ color: "#a8a8a8" }}>
                    Token holdings
                  </Nav.Link>
                </OverlayTrigger>{" "}
              </Nav.Item>
              <Nav.Item style={{ marginBottom: "10px", cursor: "pointer" }}>
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip>Coming soon!</Tooltip>}
                >
                  <Nav.Link style={{ color: "#a8a8a8" }}>
                    Project requests
                  </Nav.Link>
                </OverlayTrigger>
              </Nav.Item>
              <Nav.Item style={{ marginBottom: "10px", cursor: "pointer" }}>
                <Nav.Link eventKey="account">Account settings</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Col>
        <Col style={{ margin: "40px" }}>
          <div style={{ height: "100%", position: "relative" }}>
            <Tab.Content>
              <Tab.Pane eventKey="home">
                <Card
                  style={{
                    padding: "40px",
                    backgroundColor: "#e1e9fc",
                    border: "none",
                    boxShadow: "0px 0px 5px #f2f2f2",
                    marginBottom: "40px",
                  }}
                >
                  <h2 style={{ color: "#0d266b" }}>
                    Welcome home,{" "}
                    <span style={{ fontWeight: "bold" }}>
                      @{props.user.current.login}
                    </span>
                  </h2>
                </Card>
                <Card
                  style={{
                    padding: "40px",
                    border: "none",
                    boxShadow: "0px 0px 5px #f2f2f2",
                    marginBottom: "40px",
                  }}
                >
                  <Row>
                    <Col md="auto" className="my-auto">
                      <h3 style={{ marginBottom: 0 }}>Project requests</h3>
                    </Col>
                    <Col className="my-auto">
                      See your recent request activity
                    </Col>
                  </Row>
                  <div className="content-divider" />
                  <Row>
                    {requests.map((r, i) => {
                      return <RequestPreview request={r} />;
                    })}
                  </Row>
                </Card>
                <Card
                  style={{
                    padding: "40px",
                    border: "none",
                    boxShadow: "0px 0px 5px #f2f2f2",
                    marginBottom: "40px",
                  }}
                >
                  <Row>
                    <Col md="auto" className="my-auto">
                      <h3 style={{ marginBottom: 0 }}>Token holdings</h3>
                    </Col>
                    <Col className="my-auto">
                      View your current token holdings
                    </Col>
                  </Row>
                  <div className="content-divider" />
                  <Row style={{ marginTop: "20px" }}>
                    {holdings.map((h, i) => {
                      return <TokenHolding key={i} holding={h} />;
                    })}
                    {holdings.length == 0 && <div>No holdings</div>}
                  </Row>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="account">
                <Card
                  style={{
                    padding: "40px",
                    border: "none",
                    boxShadow: "0px 0px 5px #f2f2f2",
                    marginBottom: "40px",
                  }}
                >
                  <Row>
                    <Col md="auto" className="my-auto">
                      <h3 style={{ marginBottom: 0 }}>Account settings</h3>
                    </Col>
                    <Col className="my-auto">
                      View and edit your account information
                    </Col>
                  </Row>
                  <div className="content-divider" />
                  <Form className="mb-5">
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
                    <Button variant="outline-secondary">Save changes</Button>
                  </Form>
                  <h5>Stripe Connect</h5>
                  <div className="content-divider" />
                  <Row>
                    <Col md="auto" className="my-auto">
                      Connect your account to Stripe and start receiving payouts
                      for any work you complete.
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <Button variant="outline-primary" onClick={stripeHandler}>
                        Connect account
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default UserHome;
