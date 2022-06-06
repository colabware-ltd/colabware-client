import { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import logo from "../../assets/colabware.svg";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import NewProjectForm from "../../components/forms/NewProjectForm";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import DoughnutChart from "../../components/DoughnutChart";

class NewProject extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentPage: 0,
    projectName: "",
    projectRepoURL: "",
    projectDescription: "",
    tokenName: "",
    tokenSymbol: "",
    tokenPrice: 0,
    tokenSupply: 0,
    maintainerAllocation: 0.0,
  };

  nextStep = () => {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
  };

  prevStep = () => {
    if (this.state.currentPage > 0) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  setField = (name, value) => {
    var field = {};
    field[name] = value;
    this.setState(field);
  };

  launchProject = () => {
    let url = "http://localhost/project";
    let data = {
      name: this.state.projectName,
      repository: this.state.projectRepoURL,
      description: this.state.projectDescription,
      categories: ["blockchain"],
      maintainers: ["test-user"],
      tokenConfig: {
        name: this.state.tokenName,
        symbol: this.state.tokenSymbol,
        price: this.state.tokenPrice,
        maintainerAllocation: this.state.maintainerAllocation,
      },
    };
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios.post(url, data, headers);
  };

  // formatInput = (nStr) => {
  //   nStr += "";
  //   let x = nStr.split(".");
  //   let x1 = x[0];
  //   let x2 = x.length > 1 ? "." + x[1] : "";
  //   let rgx = /(\d+)(\d{3})/;
  //   while (rgx.test(x1)) {
  //     x1 = x1.replace(rgx, "$1" + "," + "$2");
  //   }
  //   this.setState({
  //     tokenSupplyFormatted: x1 + x2,
  //   });
  // };

  render = () => {
    const progressData = {
      datasets: [
        {
          data: [this.state.currentPage, 3 - this.state.currentPage],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div>
        <Row>
          <Col
            xs={2}
            className="full-length d-none d-lg-block"
            style={{ width: "350px", backgroundColor: "#e0e0e0" }}
          >
            <Row style={{ height: "100%" }}>
              <Col
                className="my-auto"
                style={{ paddingLeft: "40px", paddingRight: "40px" }}
              >
                <a href="/">
                  <img
                    alt="colabware-logo-main"
                    src={logo}
                    className="logo-min"
                    style={{
                      position: "absolute",
                      top: 0,
                      marginBottom: "30px",
                    }}
                  />
                </a>
                <DoughnutChart
                  label={this.state.currentPage}
                  cutout={"60%"}
                  data={progressData}
                />
              </Col>
            </Row>
          </Col>
          <Col className="full-length">
            <Container
              style={{
                height: "100%",
              }}
            >
              <Row
                style={{
                  height: "100%",
                  paddingLeft: "60px",
                  paddingRight: "60px",
                }}
              >
                <Col className="my-auto">
                  <SwitchTransition mode="out-in">
                    <CSSTransition
                      key={this.state.currentPage}
                      addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                      }}
                      classNames="fade"
                    >
                      <NewProjectForm
                        currentPage={this.state.currentPage}
                        setField={this.setField}
                        fields={this.state}
                      />
                    </CSSTransition>
                  </SwitchTransition>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      marginBottom: "30px",
                    }}
                  >
                    <Button
                      onClick={this.prevStep}
                      variant="secondary"
                      disabled={this.state.currentPage == 0}
                      style={{ marginRight: "10px" }}
                    >
                      Previous
                    </Button>

                    {this.state.currentPage != 2 && (
                      <Button
                        style={{ float: "right" }}
                        onClick={this.nextStep}
                      >
                        Next
                      </Button>
                    )}
                    {this.state.currentPage == 2 && (
                      <Button
                        style={{ float: "right" }}
                        onClick={this.launchProject}
                      >
                        Launch project
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    );
  };
}

export default NewProject;
