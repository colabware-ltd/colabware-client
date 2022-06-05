import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const NewProjectButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="primary"
      className="nav-element-margin"
      onClick={() => {
        navigate("/projects/new");
      }}
    >
      New project
    </Button>
  );
};

export default NewProjectButton;
