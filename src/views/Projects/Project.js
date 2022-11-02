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

const Project = (props) => {
  const params = useParams();
  const ref = useRef(null);

  let [view, setView] = useState({});
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

  useEffect(() => {
    (async () => {
      const project = (await get("project", params.projectId)).data;
      setProject(project);
      const balances = (await get("balances", project.projectAddress)).data;
      setToken(balances);
      // const requests = (await get("requests", params.projectId, 1, 10)).data;
      // setRequests({
      //   results: requests.results,
      //   total: requests.total,
      // });
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
