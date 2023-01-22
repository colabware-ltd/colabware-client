import { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { get } from "../api/Colabware";

const GitHubBranch = (props) => {
  const [repository, setRepository] = useState({
    branches: [],
  });

  const getBranches = async (fork) => {
    const res = await get("branches", fork.split("/")[0], fork.split("/")[1]);
    setRepository((previous) => ({
      ...previous,
      branches: res.data,
    }));
    props.setRequest((previous) => ({
      ...previous,
      github_branch: res.data[0],
    }));
  };

  useEffect(() => {
    getBranches(props.request.github_fork.full_name);
  }, []);

  return (
    <Row>
      <Form.Group className="mb-3" as={Col}>
        <Form.Label style={{ fontWeight: 500 }}>Select your fork</Form.Label>
        <Form.Select
          value={props.request.github_fork.full_name}
          onChange={(e) => {
            props.setRequest((previous) => ({
              ...previous,
              github_fork: {
                full_name: e.target.value,
              },
            }));

            getBranches(e.target.value);
          }}
        >
          {props.project.github.forks.map((item, id) => {
            return <option>{item.full_name}</option>;
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group
        className="mb-3"
        as={Col}
        controlId="newProject.repositoryName"
      >
        <Form.Label style={{ fontWeight: 500 }}>Select your branch</Form.Label>
        <Form.Select
          value={props.request.github_branch.name}
          onChange={(e) => {
            props.setRequest((previous) => ({
              ...previous,
              github_branch: {
                name: e.target.value,
              },
            }));
          }}
        >
          {repository.branches.map((item, id) => {
            return <option>{item.name}</option>;
          })}
        </Form.Select>
      </Form.Group>
    </Row>
  );
};

export default GitHubBranch;
