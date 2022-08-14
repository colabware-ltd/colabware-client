const ViewRequest = (props) => {
  return (
    <div>
      <p
        style={{ width: "50px" }}
        className="secondary-text label-link"
        onClick={() => {
          console.log("Hello!");
          props.viewRequest(false);
        }}
      >
        &lsaquo; Back
      </p>
      <h3>{props.request.name}</h3>
      <p>{props.request.description}</p>
    </div>
  );
};

export default ViewRequest;
