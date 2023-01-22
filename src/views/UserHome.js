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
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import Footer from "../components/Footer";
import { get, post } from "../api/Colabware";
import { useEffect, useState } from "react";
import TokenHolding from "../components/TokenHolding";
import RequestPreview from "../components/RequestPreview";
import NoResults from "../components/NoResults";

const UserHome = (props) => {
  const [holdings, setHoldings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [accountDetails, setAccountDetails] = useState({
    name: props.user.current.name || "",
    email: props.user.current.email || "",
    location: props.user.current.location || "",
    bio: props.user.current.bio || "",
  });

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

  const stripeSetup = () => {
    return (
      <Button variant="outline-primary" onClick={stripeHandler}>
        Connect account
      </Button>
    );
    // const status =
    //   props.user.current.stripe_account == {}
    //     ? ""
    //     : props.user.current.stripe_account.status;

    // if (status == "linked") {
    //   return (
    //     <Button variant="outline-primary" disabled>
    //       Account linked
    //     </Button>
    //   );
    // } else {
    //   return (
    //     <Button variant="outline-primary" onClick={stripeHandler}>
    //       Connect account
    //     </Button>
    //   );
    // }
  };

  const updateAccountDetails = async () => {
    const res = await post("userDetails", {
      body: accountDetails,
    });
    console.log(res);
    window.location.reload(false);
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
                  <Nav.Link style={{ color: "#a8a8a8" }}>My projects</Nav.Link>
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
          <div style={{ minHeight: "100vh", position: "relative" }}>
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
                    <Col className="my-auto secondary-text">
                      See your project request activity
                    </Col>
                  </Row>
                  <div className="content-divider" />
                  <Row>
                    {requests.map((r, i) => {
                      return <RequestPreview key={i} request={r} />;
                    })}
                    {requests.length == 0 && (
                      <NoResults note="You have not created any project requests." />
                    )}
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
                    <Col className="my-auto secondary-text">
                      View your project token holdings
                    </Col>
                  </Row>
                  <div className="content-divider" />
                  <Row style={{ marginTop: "20px" }}>
                    {holdings.map((h, i) => {
                      return <TokenHolding key={i} holding={h} />;
                    })}
                    {holdings.length == 0 && (
                      <NoResults note="You have not purchased any project tokens." />
                    )}
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
                    <Col className="my-auto secondary-text">
                      View and edit your account information
                    </Col>
                  </Row>
                  <div className="content-divider" />
                  <Form className="mb-5">
                    <Row>
                      <Col>
                        <Form.Group
                          className="mb-4"
                          controlId="accountDetails.Username"
                        >
                          <Form.Label>GitHub username</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>@</InputGroup.Text>
                            <Form.Control
                              type="text"
                              value={props.user.current.login}
                              disabled
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          className="mb-4"
                          controlId="accountDetails.Name"
                        >
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={accountDetails.name}
                            onChange={(e) => {
                              setAccountDetails((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }));
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group
                          className="mb-4"
                          controlId="accountDetails.Email"
                        >
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your email address"
                            value={accountDetails.email}
                            onChange={(e) => {
                              setAccountDetails((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }));
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          className="mb-4"
                          controlId="accountDetails.Mobile"
                        >
                          <Form.Label>Location</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your location"
                            value={accountDetails.location}
                            onChange={(e) => {
                              setAccountDetails((prev) => ({
                                ...prev,
                                location: e.target.value,
                              }));
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Group
                        className="mb-4"
                        controlId="accountDetails.Bio"
                      >
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Tell us a little bit about yourself"
                          value={accountDetails.bio}
                          onChange={(e) => {
                            setAccountDetails((prev) => ({
                              ...prev,
                              bio: e.target.value,
                            }));
                          }}
                        />
                      </Form.Group>
                    </Row>

                    <Button
                      variant="outline-secondary"
                      onClick={updateAccountDetails}
                    >
                      Save changes
                    </Button>
                  </Form>
                  <h5>Stripe Connect</h5>
                  <div className="content-divider" />
                  <Row>
                    <Col md="auto" className="my-auto">
                      Connect your account to Stripe and start receiving payouts
                      for any work you complete.
                    </Col>
                    <Col style={{ textAlign: "right" }}>{stripeSetup()}</Col>
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
