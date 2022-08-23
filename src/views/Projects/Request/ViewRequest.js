import { Card } from "react-bootstrap";

const ViewRequest = (props) => {
  return (
    <div>
      <p
        style={{ width: "50px" }}
        className="secondary-text label-link"
        onClick={() => {
          props.setParentView({
            current: "request_list",
          });
        }}
      >
        &lsaquo; Back
      </p>
      <Card className="card-content">
        <h3>{props.request.name}</h3>
        <p>{props.request.description}</p>
      </Card>
    </div>
  );
};

export default ViewRequest;
