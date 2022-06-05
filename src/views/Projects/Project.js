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
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Footer from "../../components/Footer";

ChartJS.register(ArcElement, Tooltip);

const plugins = [
  {
    beforeDraw: function (chart) {
      var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
      ctx.restore();
      var fontSize = (height / 150).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";
      var text = "83,900",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  },
];

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
                      <h1 style={{ marginTop: "15px", marginBottom: "15px" }}>
                        My test project
                      </h1>
                      <Badge pill bg="primary">
                        Blockchain
                      </Badge>{" "}
                      <Badge pill bg="primary">
                        Software development
                      </Badge>{" "}
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
            defaultActiveKey="overview"
            id="uncontrolled-tab-example"
            className="mb-3"
            variant="pills"
            style={{
              paddingTop: "12px",
              paddingBottom: "12px",
              borderBottom: "0.5px solid #e0e0e0",
            }}
          >
            <Tab eventKey="overview" title="Overview">
              <Row style={{ marginTop: "40px" }}>
                <Col
                  xs={8}
                  style={{
                    maxHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Card
                    style={{ height: "100%", marginBottom: "30px" }}
                    className="card-content"
                  >
                    <h3>Token overview</h3>
                    <p>
                      View the distribution of controlling tokens allocated for
                      this project.
                    </p>
                  </Card>
                  <Card style={{ height: "100%" }} className="card-content">
                    <h3>Project requests</h3>
                    <p>
                      View the distribution of controlling tokens allocated for
                      this project.
                    </p>
                  </Card>
                </Col>
                <Col xs={4}>
                  <Card className="card-content">
                    <h4 style={{ textAlign: "center" }}>
                      Distribution of control
                    </h4>
                    <p style={{ textAlign: "center" }}>
                      View the distribution of controlling tokens allocated for
                      this project.
                    </p>
                    <Doughnut
                      data={data}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                      plugins={plugins}
                      style={{ marginTop: "30px" }}
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
