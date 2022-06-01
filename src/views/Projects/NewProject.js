import { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import logo from "../../assets/colabware-2.svg";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import NewProjectForm from "../../components/forms/NewProjectForm";

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
    console.log(this.state);
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
    console.log("Launch!");
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
    return (
      <div>
        <Container>
          <Row>
            <Col
              xs={2}
              className="full-length d-none d-lg-block"
              style={{ backgroundColor: "blue", width: "350px" }}
            >
              <img alt="colabware-logo-main" src={logo} className="logo" />
            </Col>
            <Col className="full-length" style={{ backgroundColor: "red" }}>
              <Container
                style={{
                  backgroundColor: "green",
                  height: "100%",
                }}
              >
                <Row style={{ height: "100%" }}>
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
        </Container>
      </div>
    );
  };
}

export default NewProject;
