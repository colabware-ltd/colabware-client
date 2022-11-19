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
import projectImg from "../assets/project.png";

const UserHome = (props) => {
  const stripeHandler = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/stripe`;
    try {
      let res = await axios.get(url);
      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

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
                  <Row style={{ marginTop: "20px" }}>
                    <Row>
                      <Col md={2}>
                        <h5>2FA fix</h5>
                        <p>Test project</p>
                      </Col>
                      <Col md={7}>
                        <Row>
                          <Col md="auto">
                            <Badge pill style={{ marginBottom: "10px" }}>
                              New feature
                            </Badge>
                          </Col>
                          <Col md="auto">
                            <Badge
                              pill
                              bg="secondary"
                              style={{ marginBottom: "10px" }}
                            >
                              Open
                            </Badge>
                          </Col>
                        </Row>
                        <p
                          style={{ maxWidth: "900px" }}
                          className="text-truncate"
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </Col>
                      <Col>
                        <Row style={{ textAlign: "center" }}>
                          <h4>$100</h4>
                          <p className="secondary-text">Funds raised</p>
                        </Row>
                      </Col>
                      <Col>
                        <Row style={{ textAlign: "center" }}>
                          <h4>6</h4>
                          <p className="secondary-text">Submissions</p>
                        </Row>
                      </Col>
                    </Row>
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
                    <Col md={3}>
                      <Card className="text-center">
                        <Card.Header>
                          <b>48</b> tokens
                        </Card.Header>
                        <Card.Body>
                          <img
                            style={{ marginTop: "1rem" }}
                            alt="project-logo"
                            src={projectImg}
                            id="project-img"
                          />
                          <Card.Body>Tcoin | TCN</Card.Body>
                          <Card.Title style={{ marginBottom: "2rem" }}>
                            Test project
                          </Card.Title>
                          <Button
                            style={{ width: "100%" }}
                            variant="outline-secondary"
                          >
                            View project
                          </Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                          <b>5.8</b>% project stake
                        </Card.Footer>
                      </Card>
                    </Col>
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
            <Footer />
          </div>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default UserHome;
