import { Row, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { post } from "../../../api/Colabware";
import GitHubBranch from "../../../components/GitHubBranch";

const NewProposal = (props) => {
  const [proposal, setProposal] = useState({
    description: "",
  });
  const [repository, setRepository] = useState({
    branches: [],
    github_fork: props.project.github.forks[0],
    github_branch: "",
  });

  const createProposal = async () => {
    const res = await post("proposal", {
      params: [props.request._id],
      body: {
        repository: `${props.project.github.repo_owner}/${props.project.github.repo_name}`,
        pull_request: {
          title: `[Colabware] Submission for ${props.request.name}`,
          body: proposal.description,
          head:
            repository.github_fork.full_name.split("/")[0] +
            ":" +
            repository.github_branch.name,
          // TODO: Specify branch of main project
          base: "main",
        },
      },
    });
    if (res.isError) {
      alert(res.data.errors[0].message);
    } else {
      props.closeNewProposal();
    }
  };

  return (
    <div style={{ margin: "30px" }}>
      <h4>Complete this request</h4>
      <div className="content-divider" />
      <p>
        Submit your completed code as a pull request for review, and claim any
        funds raised for its development.
      </p>
      <Row style={{ marginTop: "30px" }}>
        <GitHubBranch
          project={props.project}
          request={repository}
          setRequest={setRepository}
        />
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label style={{ fontWeight: 500 }}>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Please provide in about your changes here"
            value={proposal.description}
            onChange={(e) => {
              setProposal((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
            rows={3}
          />
        </Form.Group>
      </Row>
      <Button style={{ marginTop: "30px" }} onClick={createProposal}>
        Create proposal
      </Button>
    </div>
  );
};

export default NewProposal;
