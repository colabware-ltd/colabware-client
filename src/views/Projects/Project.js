import { Component } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import Header from "../../components/Header";
import project from "../../assets/project.png";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
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
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

class Project extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div>
        <Header />
        <div style={{ height: "100%", backgroundColor: "#efefef" }}>
          <Container style={{ height: "100%" }}>
            <Row style={{ height: "100%" }}>
              <Col xs={8} className="my-auto">
                <div>
                  <Row style={{ height: "100%" }}>
                    <Col xs={2} className="my-auto">
                      <img
                        alt="project-logo"
                        src={project}
                        style={{ width: "85%", borderRadius: "50%" }}
                      />
                    </Col>
                    <Col xs={10} className="my-auto">
                      <h1>My test project</h1>
                    </Col>
                  </Row>
                  <div
                    style={{
                      border: "0.5px solid #e0e0e0",
                      marginTop: "25px",
                      marginBottom: "25px",
                    }}
                  ></div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </Col>
              <Col xs={4} className="my-auto">
                <Card
                  className="card-content"
                  style={{
                    marginLeft: "15px",
                    marginTop: "30px",
                    marginBottom: "30px",
                  }}
                >
                  <Row style={{ margin: "10px" }}>
                    <Col>
                      <div style={{ textAlign: "center" }}>
                        <h2>83,900</h2>
                        <p>MTP allocated</p>
                      </div>
                    </Col>
                    <Col>
                      <div style={{ textAlign: "center" }}>
                        <h2>20%</h2>
                        <p>Maintainer control</p>
                      </div>
                    </Col>
                  </Row>
                  <Button
                    variant="outline-secondary"
                    style={{ marginBottom: "10px" }}
                  >
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
            defaultActiveKey="funding"
            id="uncontrolled-tab-example"
            className="mb-3"
            variant="pills"
            style={{
              paddingTop: "12px",
              paddingBottom: "12px",
              borderBottom: "0.5px solid #e0e0e0",
            }}
          >
            <Tab eventKey="funding" title="Funding">
              <Row style={{ marginTop: "40px" }}>
                <Col xs={4} className="my-auto"></Col>
                <Col xs={8}>
                  <h4 style={{ textAlign: "center" }}>Token distribution</h4>
                  <p style={{ textAlign: "center" }}>
                    View the current distribution of controlling tokens for this
                    project.
                  </p>
                  <Row>
                    <Col xs={6}>
                      <Doughnut
                        data={data}
                        options={{
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                        }}
                        style={{ marginTop: "30px" }}
                      ></Doughnut>
                    </Col>
                    <Col xs={6} className="my-auto">
                      <Table style={{ marginLeft: "20px" }}>
                        <thead>
                          <tr>
                            <th>Holder</th>
                            <th>Tokens</th>
                            <th>Stake</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ backgroundColor: "green" }}>
                            <td>Maintainer</td>
                            <td>2,000</td>
                            <td>20%</td>
                          </tr>
                          <tr>
                            <td>Investor #1</td>
                            <td>3,000</td>
                            <td>30%</td>
                          </tr>
                          <tr>
                            <td>Investor #1</td>
                            <td>3,000</td>
                            <td>30%</td>
                          </tr>
                          <tr>
                            <td>Investor #1</td>
                            <td>3,000</td>
                            <td>30%</td>
                          </tr>
                          <tr>
                            <td>Investor #1</td>
                            <td>3,000</td>
                            <td>30%</td>
                          </tr>
                          <tr>
                            <td>Investor #1</td>
                            <td>3,000</td>
                            <td>30%</td>
                          </tr>
                          <tr>
                            <td>Investor #1</td>
                            <td>3,000</td>
                            <td>30%</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
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
      </div>
    );
  };
}

export default Project;
