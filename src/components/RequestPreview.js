import { Row, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RequestPreview = (props) => {
  let navigate = useNavigate();

  const openProject = (name) => {
    navigate(`/project/${name}`);
    // TODO: Set project state to open request view
  };

  return (
    <Row style={{ marginTop: "15px" }}>
      <Col md={2}>
        <h5>{props.request.name}</h5>
        <p>{props.request.project}</p>
      </Col>
      <Col md={7}>
        <Row>
          <Col md="auto">
            {props.request.categories.map((c, i) => {
              return (
                <Badge key={i} pill style={{ marginBottom: "10px" }}>
                  {c}
                </Badge>
              );
            })}
          </Col>
          <Col md="auto">
            <Badge pill bg="secondary" style={{ marginBottom: "10px" }}>
              {props.request.status}
            </Badge>
          </Col>
        </Row>
        <p style={{ maxWidth: "900px" }} className="text-truncate">
          {props.request.description}
        </p>
      </Col>
      <Col>
        <Row style={{ textAlign: "center" }}>
          <h4>{props.request.contribution_total}</h4>
          <p className="secondary-text">Funds raised</p>
        </Row>
      </Col>
      <Col>
        <Row style={{ textAlign: "center" }}>
          <h4>
            {props.request.propsals == null
              ? 0
              : props.request.proposals.length}
          </h4>
          <p className="secondary-text">Submissions</p>
        </Row>
      </Col>
    </Row>
  );
};

export default RequestPreview;
