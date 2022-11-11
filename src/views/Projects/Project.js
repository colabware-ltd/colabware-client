import { useEffect, useState, useRef } from "react";
import { Badge, Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Header from "../../components/Header";
import projectImg from "../../assets/project.png";
import Footer from "../../components/Footer";
import "../../App.css";
import { useParams } from "react-router-dom";
import ProjectRequests from "./Request/ProjectRequests";
import TokenPreview from "../../components/TokenPreview";
import TokenDistribution from "../../components/TokenDistribution";

import { get } from "../../utils/Api";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/forms/CheckoutForm";
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

const Project = (props) => {
  const params = useParams();
  const ref = useRef(null);

  let [payment, setPayment] = useState(false);
  const handleClosePayment = () => {
    setPayment(false);
  };
  const buyUSDT = () => {
    new RampInstantSDK({
      hostAppName: "your dApp",
      hostLogoUrl: "https://yourdapp.com/yourlogo.png", // 150 ETH in wei
      userAddress: props.user.current.wallet_address,
      url: 'https://ri-widget-staging.firebaseapp.com/',
      fiatCurrency: 'GBP',
      swapAsset: 'GOERLI_TEST',
      fiatValue: 0.01,
    })
      .on("*", (event) => console.log(event))
      .show();
  };
  const handleShowPayment = () => setPayment(true);
  let [transaction, setTransaction] = useState({
    tokens: 1,
    project: "",
    type: "token",
  });
  let [view, setView] = useState({});
  let [requests, setRequests] = useState({
    open: {
      total: 0,
      results: [],
    },
    pending: {
      total: 0,
      results: [],
    },
    closed: {
      total: 0,
      results: [],
    },
  });
  let [project, setProject] = useState({
    _id: "",
    name: "",
    categories: ["", ""],
    description: "",
    github: {
      repoowner: "",
      reponame: "",
    },
    token: {
      name: "",
      symbol: "",
      price: 0,
      totalsupply: 0,
      maintainersupply: 0,
    },
  });
  let [token, setToken] = useState({
    investorBalance: null,
    maintainerBalance: null,
    maintainerReserved: null,
  });

  const createPaymentIntent = () => {
    let url = `http://${process.env.REACT_APP_BACKEND_URL}/api/user/token-payment`;
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios.post(url, transaction, headers).then(
      (res) => {
        console.log('token payment in progress')
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    (async () => {
      const project = (await get("project", params.projectId)).data;
      setProject(project);
      const balances = (await get("balances", project.projectAddress)).data;
      setToken(balances);
      const openRequests = (await get("requests", project._id, 1, 10, "open"))
        .data;
      const pendingRequests = (
        await get("requests", project._id, 1, 10, "pending")
      ).data;
      const closedRequests = (
        await get("requests", project._id, 1, 10, "closed")
      ).data;
      setRequests({
        open: openRequests,
        pending: pendingRequests,
        closed: closedRequests,
      });
    })();
  }, [params.projectId]);

  return (
    <div>
      <Header user={props.user} />
      <div className="secondary-background">
        <Container>
          <Row>
            <Col xs={8} className="my-auto">
              <div>
                <Row>
                  <Col xs={2} className="my-auto">
                    <img alt="project-logo" src={projectImg} id="project-img" />
                  </Col>
                  <Col xs={10} className="my-auto">
                    <h1 className="margin-btm-sm">{project.name}</h1>
                    {project.categories != null &&
                      project.categories.map((o, i) => {
                        return (
                          <Badge
                            key={i}
                            pill
                            bg="primary"
                            className="margin-right-sm"
                          >
                            {o}
                          </Badge>
                        );
                      })}
                  </Col>
                </Row>
                <div className="content-divider" />
                <p>{project.description}</p>
              </div>
            </Col>
            <Col xs={4} className="my-auto">
              <TokenPreview
                token={token}
                project={project}
                setClientSecret={props.setClientSecret}
              />
              <Card id="project-header-card" className="card-content">
                <Form.Control
                  type="number"
                  placeholder="Tokens"
                  className="margin-btm-sm"
                  value={transaction.tokens}
                  onChange={(e) => {
                    setTransaction((previous) => ({
                      ...previous,
                      tokens: parseInt(e.target.value),
                    }));
                  }}
                />
                <Button onClick={buyUSDT}>
                  Purchase {project.token.symbol}
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Container ref={ref}>
        <Tabs
          defaultActiveKey="overview"
          activeKey={view.activeTab}
          id="uncontrolled-tab-example"
          className="mb-3 tabs"
          variant="pills"
          onSelect={() => {
            setView({});
          }}
        >
          <Tab eventKey="overview" title="Overview" className="tab-margin-top">
            <Row>
              <Col xs={8} className="container-divided">
                <Card className="full-length margin-btm-md card-content">
                  <h4 className="secondary-text">Funding and finances</h4>
                  <p>
                    Overview of this project's finances and funding activity
                  </p>
                  <Row style={{ textAlign: "center", marginTop: "20px" }}>
                    <Col>
                      <h2>$1,000</h2>
                      <p>Funds raised</p>
                    </Col>
                    <Col>
                      <h2>$750</h2>
                      <p>Treasury balance</p>
                    </Col>
                    <Col>
                      <h2>14</h2>
                      <p>Token holders</p>
                    </Col>
                  </Row>
                </Card>
                <Card className="full-length card-content">
                  <h4 className="secondary-text">Roadmap and requests</h4>
                  <p>Overview of this project's development activity</p>
                  <Row style={{ textAlign: "center", marginTop: "20px" }}>
                    <Col>
                      <h2>{requests.open.total}</h2>
                      <p>Open requests</p>
                    </Col>
                    <Col>
                      <h2>{requests.pending.total}</h2>
                      <p>Pending requests</p>
                    </Col>
                    <Col>
                      <h2>{requests.closed.total}</h2>
                      <p>Closed requests</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xs={4}>
                <Card className="card-content text-align-center">
                  <h4 className="secondary-text">Distribution of control</h4>
                  <p>
                    View the distribution of controlling tokens allocated for
                    this project.
                  </p>
                  <TokenDistribution token={token} />
                </Card>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="roadmap" title="Roadmap" disabled></Tab>
          <Tab eventKey="requests" title="Requests" className="tab-margin-top">
            <ProjectRequests
              requests={requests}
              setRequests={setRequests}
              project={project}
              stripeOptions={props.stripeOptions}
              stripePromise={props.stripePromise}
              stripeClientSecret={props.stripeClientSecret}
              setStripeClientSecret={props.setStripeClientSecret}
              user={props.user}
            />
          </Tab>
          <Tab eventKey="manage" title="Manage" disabled></Tab>
        </Tabs>
      </Container>
      <Footer />
    </div>
  );
};

export default Project;
