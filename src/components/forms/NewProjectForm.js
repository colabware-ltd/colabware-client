import { Component } from "react";
import {
  Col,
  Row,
  Form,
  Card,
  InputGroup,
  Nav,
  Tab,
  FloatingLabel,
} from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

class NewProjectForm extends Component {
  render() {
    return (
      <div>
        {this.props.currentPage == 0 && (
          <Form>
            <h2>Create a new organisation</h2>
            <p>
              Launch a new decentralised organisation for your project with
              Colabware
            </p>
            <div className="content-divider" />
            <Form.Group
              style={{
                marginTop: "2rem",
                marginBottom: "3rem",
              }}
            >
              <p style={{ color: "red", fontSize: "12px" }}>* required field</p>
              <Form.Group className="mb-3" controlId="newProject.projectName">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Project name *"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="My test project"
                    value={this.props.fields.projectName}
                    onChange={(e) => {
                      this.props.setField("projectName", e.target.value);
                    }}
                    isInvalid={this.props.fields.fieldInvalid.projectName}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="newProject.projectRepository"
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Repository URL *"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="github.com/my-test-project"
                    value={this.props.fields.projectRepository}
                    onChange={(e) => {
                      this.props.setField("projectRepository", e.target.value);
                    }}
                    isInvalid={this.props.fields.fieldInvalid.projectRepository}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Project description"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="What does your project do?"
                    rows={3}
                    value={this.props.fields.projectDescription}
                    onChange={(e) => {
                      this.props.setField("projectDescription", e.target.value);
                    }}
                  />
                </FloatingLabel>
              </Form.Group>
              <div className="dropdown-multiselect">
                <DropdownMultiselect
                  placeholder="Select a category"
                  options={["Blockchain", "Security", "Networking"]}
                  name="countries"
                  handleOnChange={(selected) => {
                    this.props.setField("projectCategory", selected);
                  }}
                />
              </div>
            </Form.Group>
          </Form>
        )}
        {this.props.currentPage == 1 && (
          <Form>
            <h2>Fund your project</h2>
            <p>
              Raise funds for your project by selling tokens, enabling your
              users to invest in its future
            </p>
            <div className="content-divider" />
            <Form.Group
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            >
              <Row>
                <Col sm={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Token name"
                    className="mb-3"
                  >
                    <Form.Control
                      placeholder="Token name"
                      value={this.props.fields.tokenName}
                      isInvalid={this.props.fields.fieldInvalid.tokenName}
                      onChange={(e) => {
                        this.props.setField("tokenName", e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm={3}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Token symbol"
                    className="mb-3"
                  >
                    <Form.Control
                      placeholder="MPT"
                      value={this.props.fields.tokenSymbol}
                      isInvalid={this.props.fields.fieldInvalid.tokenSymbol}
                      onChange={(e) => {
                        e.target.value = e.target.value.toUpperCase();
                        this.props.setField("tokenSymbol", e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm={3}>
                  <InputGroup id="token-price-input">
                    <InputGroup.Text id="basic-addon1">USD$</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Token price"
                      value={this.props.fields.tokenPrice}
                      isInvalid={this.props.fields.fieldInvalid.tokenPrice}
                      onChange={(e) => {
                        if (e.target.value <= 0) e.target.value = 0.1;
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
                    type="number"
                    placeholder="1,000,000"
                    value={this.props.fields.tokenSupply}
                    isInvalid={this.props.fields.fieldInvalid.tokenSupply}
                    onChange={(e) => {
                      if (e.target.value < 1) e.target.value = 1;
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
                      type="number"
                      placeholder="20"
                      value={this.props.fields.maintainerAllocation}
                      isInvalid={
                        this.props.fields.fieldInvalid.maintainerAllocation
                      }
                      onChange={(e) => {
                        if (e.target.value < 0 || e.target.value > 100)
                          e.target.value = 1;
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
                  <p>Total funds raised</p>
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
                  <p>Reserved maintainer tokens</p>
                </Card>
              </Col>
            </Row>
          </Form>
        )}
        {this.props.currentPage == 2 && (
          <Form>
            <h2>Review your project</h2>
            <p>
              Have a final look at your configuration before launching your
              project.
            </p>
            <div className="content-divider" />

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
                            <p>{this.props.fields.projectRepository}</p>
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
                        <Row>
                          <Col sm={3}>
                            <p className="field-label">Token name</p>
                          </Col>
                          <Col sm={9}>
                            <p>{this.props.fields.tokenName}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={3}>
                            <p className="field-label">Token symbol</p>
                          </Col>
                          <Col sm={9}>
                            <p>{this.props.fields.tokenSupply}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={3}>
                            <p className="field-label">Token price</p>
                          </Col>
                          <Col sm={9}>
                            <p>USD${this.props.fields.tokenPrice}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={3}>
                            <p className="field-label">Token supply</p>
                          </Col>
                          <Col sm={9}>
                            <p>{this.props.fields.tokenSupply}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={3}>
                            <p className="field-label">Maintainer allocation</p>
                          </Col>
                          <Col sm={9}>
                            <p>{this.props.fields.maintainerAllocation}%</p>
                          </Col>
                        </Row>
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
