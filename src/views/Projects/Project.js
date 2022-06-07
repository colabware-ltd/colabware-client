import { Component } from "react";
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
import project from "../../assets/project.png";
import Footer from "../../components/Footer";
import DoughnutChart from "../../components/DoughnutChart";
import "../../App.css";

class Project extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    project: {
      name: "Declan's test project",
      categories: ["Blockchain", "Software development"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      token: {
        name: "DToken",
        symbol: "DTK",
        price: 1.0,
        count: 84000,
        maintainer: 20.0,
      },
    },
  };

  render = () => {
    let chartData = {
      labels: [
        "Maintainer stake",
        "Investor #1",
        "Investor #2",
        "Investor #3",
        "Investor #4",
        "Investor #5",
        "Other investors",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(75, 192, 192, 0.5)",
            "rgba(255, 99, 132, 0.1)",
            "rgba(54, 162, 235, 0.1)",
            "rgba(255, 206, 86, 0.1)",
            "rgba(153, 102, 255, 0.1)",
            "rgba(255, 159, 64, 0.1)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, .5)",
            "rgba(54, 162, 235, .5)",
            "rgba(255, 206, 86, .5)",
            "rgba(153, 102, 255, .5)",
            "rgba(255, 159, 64, .5)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div>
        <Header />
        <div className="secondary-background">
          <Container>
            <Row>
              <Col xs={8} className="my-auto">
                <div>
                  <Row>
                    <Col xs={2} className="my-auto">
                      <img alt="project-logo" src={project} id="project-img" />
                    </Col>
                    <Col xs={10} className="my-auto">
                      <h1 className="margin-btm-sm">
                        {this.state.project.name}
                      </h1>
                      {this.state.project.categories.map((o, i) => {
                        return (
                          <Badge pill bg="primary" className="margin-right-sm">
                            {o}
                          </Badge>
                        );
                      })}
                    </Col>
                  </Row>
                  <div className="content-divider" />
                  <p>{this.state.project.description}</p>
                </div>
              </Col>
              <Col xs={4} className="my-auto">
                <Card id="project-header-card" className="card-content">
                  <Row className="content-margin">
                    <Col>
                      <div className="text-align-center">
                        <h2>83,900</h2>
                        <p>MTP allocated</p>
                      </div>
                    </Col>
                    <Col>
                      <div className="text-align-center">
                        <h2>{this.state.project.token.maintainer}%</h2>
                        <p>Maintainer control</p>
                      </div>
                    </Col>
                  </Row>
                  <Button variant="outline-secondary" className="margin-btm-sm">
                    Submit a request
                  </Button>
                  <Button>Purchase MTP</Button>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Tabs
            defaultActiveKey="overview"
            id="uncontrolled-tab-example"
            className="mb-3 tabs"
            variant="pills"
          >
            <Tab
              eventKey="overview"
              title="Overview"
              className="tab-margin-top"
            >
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
                      label={"75%"}
                      cutout={"60%"}
                      data={chartData}
                    />
                  </Card>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="profile" title="Requests" disabled>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Tab>
            <Tab eventKey="profile" title="Roadmap" disabled>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Tab>
            <Tab eventKey="contact" title="About">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
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
}

export default Project;
