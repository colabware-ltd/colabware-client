import { Component } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import logo from "../../assets/colabware-2.svg";

class NewProject extends Component {
  state = {
    currentPage: 0,
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

  launchProject = () => {
    console.log("Launch!");
  };

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
                    {this.state.currentPage == 0 && (
                      <Form>
                        <h2>Create a new project</h2>
                        <h4>Step 1</h4>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Project name</Form.Label>
                          <Form.Control type="text" placeholder="OpenSSL" />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Description</Form.Label>
                          <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                      </Form>
                    )}
                    {this.state.currentPage == 1 && (
                      <Form>
                        <h2>Configure project settings</h2>
                        <h4>Step 2</h4>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Project name</Form.Label>
                          <Form.Control type="text" placeholder="OpenSSL" />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Description</Form.Label>
                          <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                      </Form>
                    )}
                    <Button
                      onClick={this.prevStep}
                      variant="secondary"
                      disabled={this.state.currentPage == 0}
                    >
                      Previous
                    </Button>

                    {this.state.currentPage != 5 && (
                      <Button
                        style={{ float: "right" }}
                        onClick={this.nextStep}
                      >
                        Next
                      </Button>
                    )}
                    {this.state.currentPage == 5 && (
                      <Button
                        style={{ float: "right" }}
                        onClick={this.launchProject}
                      >
                        Launch project
                      </Button>
                    )}
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
