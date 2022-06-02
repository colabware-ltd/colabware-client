import { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header";

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
                  <h1>My test project</h1>
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
                    marginLeft: "20px",
                    marginTop: "20px",
                    marginBottom: "20px",
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
        <Container></Container>
      </div>
    );
  };
}

export default Project;
