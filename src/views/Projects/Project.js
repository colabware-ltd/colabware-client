import { useEffect, useState, useRef } from "react";
import {
  Badge,
  Card,
  Col,
  Container,
  Row,
  Tab,
  Tabs,
  Modal,
} from "react-bootstrap";
import Header from "../../components/Header";
import projectImg from "../../assets/project.png";
import Footer from "../../components/Footer";
import "../../App.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProjectRequests from "./Request/ProjectRequests";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/forms/CheckoutForm";
import TokenPreview from "../../components/TokenPreview";
import TokenDistribution from "../../components/TokenDistribution";

const Project = (props) => {
  const ref = useRef(null);
  let [payment, setPayment] = useState(false);
  const handleClosePayment = () => {
    setPayment(false);
  };
  const handleShowPayment = () => setPayment(true);
  let [transaction, setTransaction] = useState({
    tokens: 1,
    project: "",
    type: "token",
  });
  let [view, setView] = useState({});
  let { projectId } = useParams();
  let [requests, setRequests] = useState({
    total: 0,
    results: [],
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

  const getBalances = async (id) => {
    let url = `http://${process.env.REACT_APP_BACKEND_URL}/api/project/${id}/balances`;
    try {
      const res = await axios.get(url, {
        validateStatus: function (status) {
          return (status >= 200 && status <= 302) || status == 401;
        },
      });
      if (res.status == 302) {
        setToken(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getRequests = async (page, limit, id) => {
    let url = `http://${process.env.REACT_APP_BACKEND_URL}/api/project/${id}/request/list?page=${page}&limit=${limit}`;
    if (page >= 1) {
      try {
        const res = await axios.get(url, {
          validateStatus: function (status) {
            return (status >= 200 && status <= 302) || status == 401;
          },
        });
        if (res.status == 302)
          setRequests({
            results: res.data.results,
            total: res.data.total,
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // TODO: Expose endpoint to retrieve total number of projects created so far
  const getProject = async () => {
    let url = `http://${
      process.env.REACT_APP_BACKEND_URL
    }/api/project/${encodeURI(projectId)}`;
    try {
      const res = await axios.get(url, {
        validateStatus: function (status) {
          return (status >= 200 && status <= 302) || status == 401;
        },
      });
      if (res.status == 302) {
        setProject(res.data);
        setTransaction((previous) => ({
          ...previous,
          project: res.data._id,
        }));
        getRequests(1, 10, res.data._id);
        getBalances(res.data.projectAddress);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createPaymentIntent = () => {
    let url = `http://${process.env.REACT_APP_BACKEND_URL}/api/user/payment-intent`;
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios.post(url, transaction, headers).then(
      (res) => {
        props.setStripeClientSecret(res.data.clientSecret);
        handleShowPayment();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    getProject();
  }, []);

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
                          <Badge pill bg="primary" className="margin-right-sm">
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
                setTransaction={setTransaction}
                transaction={transaction}
              />
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
                  <h4>Funding and finances</h4>
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
                  <h3>Roadmap and requests</h3>
                  <p>Overview of this project's development activity</p>
                  <Row style={{ textAlign: "center", marginTop: "20px" }}>
                    <Col>
                      <h2>8</h2>
                      <p>Open requests</p>
                    </Col>
                    <Col>
                      <h2>2</h2>
                      <p>Pending requests</p>
                    </Col>
                    <Col>
                      <h2>13</h2>
                      <p>Closed requests</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xs={4}>
                <Card className="card-content text-align-center">
                  <h4>Distribution of control</h4>
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
              getRequests={getRequests}
              requests={requests}
              projectId={project._id}
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
      <Modal show={payment} onHide={handleClosePayment}>
        <div style={{ padding: "40px" }}>
          {props.stripeClientSecret && (
            <Elements
              options={props.stripeOptions}
              stripe={props.stripePromise}
            >
              <CheckoutForm
                returnUrl={`http://localhost:3000/project/${encodeURIComponent(
                  project.name
                )}`}
              />
            </Elements>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Project;
