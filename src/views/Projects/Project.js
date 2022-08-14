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
  Form,
} from "react-bootstrap";
import Header from "../../components/Header";
import projectImg from "../../assets/project.png";
import Footer from "../../components/Footer";
import DoughnutChart from "../../components/DoughnutChart";
import "../../App.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewRequest from "./Request/NewRequest";
import ViewRequest from "./Request/ViewRequest";
import PaginatedList from "../../components/PaginatedList";

const Project = (props) => {
  let [selectedRequest, setSelectedRequest] = useState({
    name: "2FA",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  });
  let [requests, setRequests] = useState({
    total: 1,
    results: [
      {
        categories: ["New request"],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        name: "2FA",
      },
    ],
  });
  let [pageCurrent, setPageCurrent] = useState(1);
  let [pageLimit, setPageLimit] = useState(10);
  let { projectId } = useParams();
  let [view, setView] = useState({
    newRequest: false,
    viewRequest: false,
  });
  let [project, setProject] = useState({
    name: "",
    categories: ["", ""],
    description: "",
    repository: "",
    token: {
      name: "",
      symbol: "",
      price: 0,
      totalSupply: 0,
      maintainerSupply: 0,
    },
  });

  let chartData = {
    labels: ["Reserved tokens", "Available tokens"],
    datasets: [
      {
        label: "# of Votes",
        data: [project.token.maintainerSupply, project.token.totalSupply],
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 99, 132, 0.1)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, .5)"],
        borderWidth: 1,
      },
    ],
  };
  const ref = useRef(null);

  const viewRequest = (isViewRequest) => {
    setView((previous) => ({
      ...previous,
      viewRequest: isViewRequest,
      activeTab: "requests",
    }));
  };

  const newRequest = (isNewRequest) => {
    setView((previous) => ({
      ...previous,
      newRequest: isNewRequest,
      activeTab: "requests",
    }));
  };

  const updatePage = (page) => {
    setPageCurrent(page);
    // getProjects(page, pageLimit);
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
      if (res.status == 302) setProject(res.data);
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
                      <h2>{project.token.totalSupply.toLocaleString("en")}</h2>
                      <p>{project.token.symbol} allocated</p>
                    </div>
                  </Col>
                  <Col>
                    <div className="text-align-center">
                      <h2>
                        {Math.round(
                          (project.token.maintainerSupply /
                            project.token.totalSupply) *
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
                    newRequest(true);
                    ref.current?.scrollIntoView({ behavior: "smooth" });
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
                    label={project.token.totalSupply.toLocaleString("en")}
                    cutout={"60%"}
                    data={chartData}
                  />
                </Card>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="requests" title="Requests" className="tab-margin-top">
            <div
              style={{
                marginLeft: "120px",
                marginRight: "120px",
              }}
            >
              {!view.newRequest && !view.viewRequest && (
                <div>
                  <Row style={{ marginBottom: "15px" }}>
                    <Col xs={10}>
                      <Form.Control
                        type="search"
                        placeholder="Search for an issue"
                      />
                    </Col>
                    <Col xs={2}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          newRequest(true);
                        }}
                        style={{ height: "100%" }}
                      >
                        New Request
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <PaginatedList
                      data={requests}
                      pageLimit={pageLimit}
                      pageCurrent={pageCurrent}
                      updatePage={updatePage}
                      request={viewRequest}
                    />
                  </Row>
                </div>
              )}
              {view.newRequest && (
                <NewRequest ref={ref} newRequest={newRequest} />
              )}
              {view.viewRequest && (
                <ViewRequest
                  viewRequest={viewRequest}
                  request={selectedRequest}
                />
              )}
            </div>
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
