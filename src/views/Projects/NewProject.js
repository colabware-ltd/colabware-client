import { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import logo from "../../assets/colabware.svg";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import NewProjectForm from "../../components/forms/NewProjectForm";
import axios from "axios";
import DoughnutChart from "../../components/DoughnutChart";

class NewProject extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentPage: 0,
    progress: "0%",
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
      progress:
        Math.floor(((this.state.currentPage + 1) / 3) * 100).toString() + "%",
    });
  };

  prevStep = () => {
    if (this.state.currentPage > 0) {
      this.setState({
        currentPage: this.state.currentPage - 1,
        progress:
          Math.floor(((this.state.currentPage - 1) / 3) * 100).toString() + "%",
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
    let progressData = {
      datasets: [
        {
          data: [this.state.currentPage, 3 - this.state.currentPage],
          backgroundColor: [
            "rgba(42, 102, 255, 0.7)",
            "rgba(42, 102, 255, 0.1)",
          ],
          borderColor: ["rgba(42, 102, 255, 0.7)", "rgba(54, 162, 235, 0.1)"],
          borderWidth: 1,
        },
      ],
    };

    return (
      <Row>
        <Col
          xs={2}
          className="full-vh d-none d-lg-block"
          id="form-progress-container"
        >
          <Row className="full-length">
            <Col className="my-auto">
              <a href="/">
                <img alt="colabware-logo-main" src={logo} className="logo-sm" />
              </a>
              <DoughnutChart
                label={this.state.progress}
                tooltip={false}
                cutout={"90%"}
                data={progressData}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Container className="full-length">
            <Row className="full-length form-padding">
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
                    <Button style={{ float: "right" }} onClick={this.nextStep}>
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
    );
  };
}

export default NewProject;
