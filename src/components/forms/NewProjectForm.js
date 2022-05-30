import { Component } from "react";
import { Col, Row, Form, Card, InputGroup } from "react-bootstrap";

class NewProjectForm extends Component {
  state = {
    projectName: "",
    projectRepoURL: "",
    projectDescription: "",
    tokenName: "",
    tokenSymbol: "",
    tokenPrice: 0,
    tokenSupply: 0,
    maintainerAllocation: 0.0,
  };
  render() {
    return (
      <div>
        {this.props.currentPage == 0 && (
          <Form>
            <div style={{ borderBottom: "1px solid red" }}>
              <h2>Create a new DAO</h2>
              <p>
                Launch a new decentralised organisation for your project with
                Colabware
              </p>
            </div>
            <Form.Group
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Form.Group className="mb-3" controlId="newProject.projectName">
                <Form.Label className="field-label">Project name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tell us your project's name"
                  value={this.state.projectName}
                  onChange={(e) =>
                    this.setState({
                      projectName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="newProject.projectRepo">
                <Form.Label className="field-label">Repository URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the URL of your project's existing repository"
                  value={this.state.projectURL}
                  onChange={(e) =>
                    this.setState({
                      projectRepoURL: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="field-label">Project type</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Select an option</option>
                  <option value="1">Blockchain</option>
                  <option value="2">Security</option>
                  <option value="3">Software development</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="field-label">
                  Project description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="What does your project do?"
                  rows={3}
                  value={this.state.projectDescription}
                  onChange={(e) =>
                    this.setState({
                      projectDescription: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form.Group>
          </Form>
        )}
        {this.props.currentPage == 1 && (
          <Form>
            <div style={{ borderBottom: "1px solid red" }}>
              <h2>Fund your project</h2>
              <p>
                Raise funds for your project by selling tokens, enabling your
                users to invest in its future
              </p>
            </div>
            <Form.Group
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            >
              <Row>
                <Col sm={6}>
                  <Form.Label className="field-label">Token name</Form.Label>
                  <Form.Control
                    placeholder="My Project Token"
                    value={this.state.tokenName}
                    onChange={(e) =>
                      this.setState({
                        tokenName: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col sm={3}>
                  <Form.Label className="field-label">Token symbol</Form.Label>
                  <Form.Control
                    placeholder="MPT"
                    value={this.state.tokenSymbol}
                    onChange={(e) =>
                      this.setState({
                        tokenSymbol: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col sm={3}>
                  <Form.Label className="field-label">Token price</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">USD$</InputGroup.Text>

                    <Form.Control
                      placeholder="1"
                      value={this.state.tokenPrice}
                      onChange={(e) =>
                        this.setState({
                          tokenPrice: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            >
              <Row>
                <Col sm={6}>
                  <h5>Token supply</h5>
                  <p>
                    Specify an initial supply of tokens available for purchase
                    by your project's users
                  </p>
                  <Form.Control
                    placeholder="1,000,000"
                    value={this.state.tokenSupply}
                    onChange={(e) => {
                      this.setState({
                        tokenSupply: e.target.value,
                      });
                      // this.formatInput(e.target.value);
                    }}
                  />
                </Col>
                <Col sm={6}>
                  <h5>Maitainer allocation</h5>
                  <p>
                    Maintain control over your project by allocating a fixed
                    maintainer stake
                  </p>
                  <InputGroup>
                    <Form.Control
                      placeholder="20"
                      value={this.state.maintainerAllocation}
                      onChange={(e) =>
                        this.setState({
                          maintainerAllocation: e.target.value,
                        })
                      }
                    />
                    <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>
            <Row
              style={{
                marginTop: "4rem",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              <Col sm={6}>
                <Card className="card-content">
                  <h2>
                    $
                    {(
                      this.state.tokenPrice * this.state.tokenSupply
                    ).toLocaleString("en")}
                  </h2>
                </Card>
              </Col>
              <Col sm={6}>
                <Card className="card-content">
                  <h2>
                    {(
                      (this.state.maintainerAllocation / 100) *
                      this.state.tokenSupply
                    ).toLocaleString("en")}{" "}
                  </h2>
                </Card>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    );
  }
}

export default NewProjectForm;
