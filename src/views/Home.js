import { Row, Col, Button, Container } from "react-bootstrap";
import ethereum from "../assets/ethereum.svg";

import UserHome from "./UserHome";
import vote from "../assets/vote.svg";
import token from "../assets/token.svg";
import crowdfund from "../assets/crowdfund.svg";

const Home = (props) => {
  const authView = () => {
    if (!props.user.authorized) {
      return (
        <div className="background-light">
          <Row className="gradient-hero text-align-center padding-lg">
            <h1 className="h0-light margin-btm-sm">
              The decentralised software management platform
            </h1>
            <p className="margin-btm-md p-lg">
              Colabware makes it easy to sustain the future of open source
              software.
            </p>
            <div className="margin-btm-sm">
              <Button size="lg">Fund a project</Button>
            </div>
          </Row>
          <Container className="container-main">
            <Row className="align-items-center padding-lg">
              <Col id="about-text-container">
                <h1 className="h1-dark margin-btm-md">
                  Smart contracts for smarter open source development
                </h1>
                <p className="p-md margin-btm-md">
                  By harnessing the power of Ethereum, secure the future of open
                  source software through transparent funding, ownership and
                  collaboration.
                </p>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    window.open("https://ethereum.org/en/dao/");
                  }}
                >
                  Learn more
                </Button>
              </Col>
              <Col md="auto">
                <img src={ethereum} id="about-image"></img>
              </Col>
            </Row>
            <Row className="align-items-center padding-h-lg padding-btm-md">
              <Col md="auto">
                <div className="image-container">
                  <img src={token} className="benefits-image"></img>
                </div>
              </Col>
              <Col className="benefits-text-container">
                <h3 className="benefits-heading">
                  Tomorrow's software, tokenized
                </h3>
                <p className="benefits-text">
                  Raise funds through the sale of digital assets granting
                  exclusive rights to open source products.
                </p>
              </Col>
            </Row>
            <Row className="align-items-center padding-h-lg padding-btm-md">
              <Col md="auto">
                <div className="image-container">
                  <img src={crowdfund} className="benefits-image"></img>
                </div>
              </Col>
              <Col className="benefits-text-container">
                <h3 className="benefits-heading">
                  Collaboration through crowdfunding
                </h3>
                <p className="benefits-text">
                  Collaborate with fellow users and stakeholders by crowdfunding
                  requests for new features and enhancements.
                </p>
              </Col>
            </Row>
            <Row className="align-items-center padding-h-lg padding-btm-xl">
              <Col md="auto">
                <div className="image-container">
                  <img src={vote} className="benefits-image"></img>
                </div>
              </Col>
              <Col className="benefits-text-container">
                <h3 className="benefits-heading">A shared vision</h3>
                <p className="benefits-text">
                  Enforce stakeholder voting and share control of your project's
                  development roadmap.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return <UserHome user={props.user} />;
    }
  };

  return <div>{authView()}</div>;
};

export default Home;
