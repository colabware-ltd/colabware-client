import { useEffect, useState, useRef } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import Header from "../../components/Header";
import projectImg from "../../assets/project.png";
import Footer from "../../components/Footer";
import DoughnutChart from "../../components/DoughnutChart";
import "../../App.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProjectRequests from "./Request/ProjectRequests";

const Project = (props) => {
  const ref = useRef(null);
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
    repository: "",
    token: {
      name: "",
      symbol: "",
      price: 0,
      totalsupply: 0,
      maintainersupply: 0,
    },
  });
  let [token, setToken] = useState({
    investorBalance: 0,
    maintainerBalance: 0,
    maintainerReserved: 0,
  });

  let chartData = {
    labels: ["Tokens available", "Tokens reserved", "Tokens purchased"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          token.maintainerBalance - token.maintainerReserved,
          token.maintainerReserved,
          token.investorBalance,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(75, 192, 192, 0.25)",
          "rgba(255, 99, 132, 0.1)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(75, 192, 192, .5)",
          "rgba(255, 99, 132, .5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const getBalances = async (id) => {
    let url = `http://127.0.0.1/api/project/${id}/balances`;
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
    let url = `http://127.0.0.1/api/project/${id}/request/list?page=${page}&limit=${limit}`;
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
    let url = `http://127.0.0.1/api/project/${encodeURI(projectId)}`;
    try {
      const res = await axios.get(url, {
        validateStatus: function (status) {
          return (status >= 200 && status <= 302) || status == 401;
        },
      });
      if (res.status == 302) {
        setProject(res.data);
        getRequests(1, 10, res.data._id);
        getBalances(res.data.projectaddress);
      }
    } catch (err) {
      console.log(err);
    }
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
              <Card id="project-header-card" className="card-content">
                <Row className="content-margin">
                  <Col>
                    <div className="text-align-center">
                      <h2>
                        {(
                          token.maintainerBalance - token.maintainerReserved
                        ).toLocaleString("en")}
                      </h2>
                      <p>{project.token.symbol} available</p>
                    </div>
                  </Col>
                  <Col>
                    <div className="text-align-center">
                      <h2>
                        {Math.round(
                          (project.token.maintainersupply /
                            project.token.totalsupply) *
                            100
                        )}
                        %
                      </h2>
                      <p>Maintainer control</p>
                    </div>
                  </Col>
                </Row>
                <Button
                  variant="outline-secondary"
                  className="margin-btm-sm"
                  onClick={() => {
                    // newRequest(true);
                    // ref.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Submit a request
                </Button>
                <Button>Purchase {project.token.symbol}</Button>
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
                  <h3>Token overview</h3>
                  <p>See an overview of the token sold for this project.</p>
                </Card>
                <Card className="full-length card-content">
                  <h3>Project requests</h3>
                  <p>View the requests submitted for this project so far.</p>
                </Card>
              </Col>
              <Col xs={4}>
                <Card className="card-content text-align-center">
                  <h4>Distribution of control</h4>
                  <p>
                    View the distribution of controlling tokens allocated for
                    this project.
                  </p>
                  <DoughnutChart
                    tooltip={true}
                    label={(
                      token.maintainerBalance + token.investorBalance
                    ).toLocaleString("en")}
                    cutout={"60%"}
                    data={chartData}
                  />
                </Card>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="requests" title="Requests" className="tab-margin-top">
            <ProjectRequests
              getRequests={getRequests}
              requests={requests}
              projectId={project._id}
            />
          </Tab>
          <Tab eventKey="roadmap" title="Roadmap" disabled>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Tab>
          <Tab eventKey="contact" title="About">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Tab>
        </Tabs>
      </Container>
      <Footer />
    </div>
  );
};

export default Project;
