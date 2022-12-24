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
  Alert,
} from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const NewProjectForm = (props) => {
  return (
    <div>
      {props.form.currentPage == 0 && (
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
                  value={props.project.name}
                  onChange={(e) => {
                    props.setProject((previous) => ({
                      ...previous,
                      name: e.target.value,
                    }));
                  }}
                  isInvalid={props.fieldInvalid.projectName}
                />
              </FloatingLabel>
            </Form.Group>
            <Row>
              <Form.Group as={Col} controlId="newProject.repositoryOwner">
                <FloatingLabel
                  controlId="floatingInput"
                  label="GitHub repository owner *"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="colabware"
                    value={props.project.github.repo_owner}
                    onChange={(e) => {
                      props.setProject((previous) => ({
                        ...previous,
                        github: {
                          ...previous.github,
                          repo_owner: e.target.value,
                        },
                      }));
                    }}
                    isInvalid={props.fieldInvalid.repositoryOwner}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} controlId="newProject.repositoryName">
                <FloatingLabel
                  controlId="floatingInput"
                  label="GitHub repository name *"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="my-project"
                    value={props.project.github.repo_name}
                    onChange={(e) => {
                      props.setProject((previous) => ({
                        ...previous,
                        github: {
                          ...previous.github,
                          repo_name: e.target.value,
                        },
                      }));
                    }}
                    isInvalid={props.fieldInvalid.repositoryName}
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
            {props.form.error != "" && (
              <Row>
                <Form.Group>
                  <Alert variant="danger">{props.form.error}</Alert>
                </Form.Group>
              </Row>
            )}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                placeholder="What does your project do?"
                rows={4}
                value={props.project.description}
                onChange={(e) => {
                  props.setProject((previous) => ({
                    ...previous,
                    description: e.target.value,
                  }));
                }}
              />
            </Form.Group>
            <div className="dropdown-multiselect">
              <DropdownMultiselect
                placeholder="Select a category"
                options={props.categories}
                name="category"
                handleOnChange={(selected) => {
                  props.setProject((previous) => ({
                    ...previous,
                    categories: selected,
                  }));
                }}
              />
            </div>
          </Form.Group>
        </Form>
      )}
      {props.form.currentPage == 1 && (
        <Form>
          <h2>Fund your project</h2>
          <p>
            Raise funds for your project by selling tokens, enabling your users
            to invest in its future
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
                    value={props.project.token.name}
                    isInvalid={props.fieldInvalid.tokenName}
                    onChange={(e) => {
                      props.setProject((previous) => ({
                        ...previous,
                        token: {
                          ...previous.token,
                          name: e.target.value,
                        },
                      }));
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
                    value={props.project.token.symbol}
                    isInvalid={props.fieldInvalid.tokenSymbol}
                    onChange={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                      props.setProject((previous) => ({
                        ...previous,
                        token: {
                          ...previous.token,
                          symbol: e.target.value,
                        },
                      }));
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
                    value={props.project.token.price}
                    isInvalid={props.fieldInvalid.tokenPrice}
                    onChange={(e) => {
                      let val = "0";
                      if (e.target.value != "" && e.target.value >= 0) {
                        if (
                          e.target.value.length > 1 &&
                          e.target.value.charAt(0) == "0"
                        ) {
                          e.target.value = e.target.value.substring(1);
                        }
                        val = e.target.value;
                      }

                      props.setProject((previous) => ({
                        ...previous,
                        token: {
                          ...previous.token,
                          price: parseInt(val),
                        },
                      }));
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
                  Specify an initial supply of tokens to mint for your project
                </p>
                <Form.Control
                  type="number"
                  placeholder="1,000,000"
                  value={props.project.token.total_supply}
                  isInvalid={props.fieldInvalid.tokenSupply}
                  onChange={(e) => {
                    let val = "0";
                    if (e.target.value != "" && e.target.value >= 0) {
                      if (
                        e.target.value.length > 1 &&
                        e.target.value.charAt(0) == "0"
                      ) {
                        e.target.value = e.target.value.substring(1);
                      }
                      val = e.target.value;
                    }

                    props.setProject((previous) => ({
                      ...previous,
                      token: {
                        ...previous.token,
                        total_supply: parseInt(val),
                        maintainer_supply:
                          (props.form.maintainerAllocation / 100) *
                          parseInt(val),
                      },
                    }));
                  }}
                />
              </Col>
              <Col sm={6}>
                <h5>Maitainer allocation</h5>
                <p>Reserve a fixed number of tokens for maintainer use</p>
                <InputGroup>
                  <Form.Control
                    type="number"
                    placeholder="20"
                    value={props.form.maintainerAllocation}
                    isInvalid={props.fieldInvalid.maintainerAllocation}
                    onChange={(e) => {
                      let val = "0";
                      if (e.target.value != "" && e.target.value >= 0) {
                        if (e.target.value > 100) return;
                        if (
                          e.target.value.length > 1 &&
                          e.target.value.charAt(0) == "0"
                        ) {
                          e.target.value = e.target.value.substring(1);
                        }
                        val = e.target.value;
                      }
                      props.setForm((previous) => ({
                        ...previous,
                        maintainerAllocation: val,
                      }));
                      props.setProject((previous) => ({
                        ...previous,
                        token: {
                          ...previous.token,
                          maintainer_supply: Math.round(
                            (val / 100) * props.project.token.total_supply
                          ),
                        },
                      }));
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
                    props.project.token.price *
                    (props.project.token.total_supply *
                      (1 - props.form.maintainerAllocation / 100))
                  ).toLocaleString("en")}
                </h2>
                <p>Total funds raised</p>
              </Card>
            </Col>
            <Col sm={6}>
              <Card className="card-content">
                <h2>
                  {props.project.token.maintainer_supply.toLocaleString("en")}{" "}
                </h2>
                <p>Reserved maintainer tokens</p>
              </Card>
            </Col>
          </Row>
        </Form>
      )}
      {props.form.currentPage == 2 && (
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
                      <Nav.Link eventKey="first">Project information</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Token configuration</Nav.Link>
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
                          <p>{props.project.name}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={3}>
                          <p className="field-label">GitHub repository owner</p>
                        </Col>
                        <Col sm={9}>
                          <p>{props.project.github.repo_owner}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={3}>
                          <p className="field-label">GitHub repository name</p>
                        </Col>
                        <Col sm={9}>
                          <p>{props.project.github.repo_name}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={3}>
                          <p className="field-label">Description</p>
                        </Col>
                        <Col sm={9}>
                          <p>{props.project.description}</p>
                        </Col>
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Row>
                        <Col sm={3}>
                          <p className="field-label">Token name</p>
                        </Col>
                        <Col sm={9}>
                          <p>{props.project.token.name}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={3}>
                          <p className="field-label">Token symbol</p>
                        </Col>
                        <Col sm={9}>
                          <p>{props.project.token.symbol}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={3}>
                          <p className="field-label">Token price</p>
                        </Col>
                        <Col sm={9}>
                          <p>USD${props.project.token.price}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={3}>
                          <p className="field-label">Token supply</p>
                        </Col>
                        <Col sm={9}>
                          <p>{props.project.token.total_supply}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={3}>
                          <p className="field-label">Maintainer supply</p>
                        </Col>
                        <Col sm={9}>
                          <p>{props.project.token.maintainer_supply}</p>
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
};

export default NewProjectForm;
