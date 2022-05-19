import { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";

class NewProject extends Component {
  render() {
    return (
      <div>
        <Row>
          <div
            className="full-length d-none d-lg-block"
            style={{ backgroundColor: "blue", width: "350px" }}
          ></div>
          <Col className="full-length" style={{ backgroundColor: "red" }}>
            <Container style={{ backgroundColor: "green" }}>
              <h2>Create a new project</h2>
            </Container>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewProject;
