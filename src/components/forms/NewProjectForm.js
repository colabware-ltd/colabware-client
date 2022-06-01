import { Component } from "react";
import { Col, Row, Form, Card, InputGroup, Nav, Tab } from "react-bootstrap";

class NewProjectForm extends Component {
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
                  value={this.props.fields.projectName}
                  onChange={(e) => {
                    this.props.setField("projectName", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="newProject.projectRepo">
                <Form.Label className="field-label">Repository URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the URL of your project's existing repository"
                  value={this.props.fields.projectRepoURL}
                  onChange={(e) => {
                    this.props.setField("projectRepoURL", e.target.value);
                  }}
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
                  value={this.props.fields.projectDescription}
                  onChange={(e) => {
                    this.props.setField("projectDescription", e.target.value);
                  }}
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
                    value={this.props.fields.tokenName}
                    onChange={(e) => {
                      this.props.setField("tokenName", e.target.value);
                    }}
                  />
                </Col>
                <Col sm={3}>
                  <Form.Label className="field-label">Token symbol</Form.Label>
                  <Form.Control
                    placeholder="MPT"
                    value={this.props.fields.tokenSymbol}
                    onChange={(e) => {
                      this.props.setField("tokenSymbol", e.target.value);
                    }}
                  />
                </Col>
                <Col sm={3}>
                  <Form.Label className="field-label">Token price</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">USD$</InputGroup.Text>

                    <Form.Control
                      placeholder="1"
                      value={this.props.fields.tokenPrice}
                      onChange={(e) => {
                        this.props.setField("tokenPrice", e.target.value);
                      }}
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
                    value={this.props.fields.tokenSupply}
                    onChange={(e) => {
                      this.props.setField("tokenSupply", e.target.value);
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
                      value={this.props.fields.maintainerAllocation}
                      onChange={(e) => {
                        this.props.setField(
                          "maintainerAllocation",
                          e.target.value
                        );
                      }}
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
                      this.props.fields.tokenPrice *
                      this.props.fields.tokenSupply
                    ).toLocaleString("en")}
                  </h2>
                </Card>
              </Col>
              <Col sm={6}>
                <Card className="card-content">
                  <h2>
                    {(
                      (this.props.fields.maintainerAllocation / 100) *
                      this.props.fields.tokenSupply
                    ).toLocaleString("en")}{" "}
                  </h2>
                </Card>
              </Col>
            </Row>
          </Form>
        )}
        {this.props.currentPage == 2 && (
          <Form>
            <div style={{ borderBottom: "1px solid red" }}>
              <h2>Review your project</h2>
              <p>
                Have a final look at your configuration before launching your
                project.
              </p>
            </div>
            <div
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            >
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          Project information
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          Token configuration
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Row>
                          <Col sm={3}>
                            <p className="field-label">Name</p>
                          </Col>
                          <Col sm={9}>
                            <p>{this.props.fields.projectName}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={3}>
                            <p className="field-label">Repository URL</p>
                          </Col>
                          <Col sm={9}>
                            <p>{this.props.fields.projectRepoURL}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={3}>
                            <p className="field-label">Description</p>
                          </Col>
                          <Col sm={9}>
                            <p>{this.props.fields.projectDescription}</p>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <p>Test 2</p>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </Form>
        )}
      </div>
    );
  }
}

export default NewProjectForm;
