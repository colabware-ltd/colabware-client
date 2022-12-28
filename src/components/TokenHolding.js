import { Card, Button, Col } from "react-bootstrap";
import projectImg from "../assets/project.png";
import { useNavigate } from "react-router-dom";

const TokenHolding = (props) => {
  let navigate = useNavigate();

  const openProject = (name) => {
    navigate(`/project/${name}`);
  };

  return (
    <Col md={3}>
      <Card className="text-center">
        <Card.Header>
          <b>{props.holding.balance.toLocaleString("en")}</b> tokens
        </Card.Header>
        <Card.Body>
          <img
            style={{ marginTop: "1rem" }}
            alt="project-logo"
            src={projectImg}
            id="project-img"
          />
          <Card.Body>
            {props.holding.token_name} | {props.holding.token_symbol}
          </Card.Body>
          <Card.Title style={{ marginBottom: "2rem" }}>
            {props.holding.project_name}
          </Card.Title>
          <Button
            style={{ width: "100%" }}
            variant="outline-secondary"
            onClick={() => {
              openProject(props.holding.project_name);
            }}
          >
            View project
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          <b>
            {(
              (props.holding.balance / props.holding.total_supply) *
              100
            ).toFixed(2)}
            %
          </b>{" "}
          project stake
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default TokenHolding;
