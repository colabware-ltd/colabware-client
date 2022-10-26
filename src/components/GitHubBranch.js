
import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
} from "react-bootstrap";
import axios from "axios";

const GitHubBranch = (props) => {
    const [repository, setRepository] = useState({
        branches: [],
    })

    const getBranches = async (fork) => {
        const url = `http://${
          process.env.REACT_APP_BACKEND_URL
        }/api/user/project/branches/${fork.split("/")[0]}/${fork.split("/")[1]}`;
        try {
          const res = await axios.get(url, {
            validateStatus: function (status) {
              return (status >= 200 && status <= 302) || status == 401;
            },
          });
          if (res.status == 302) {
            setRepository((previous) => ({
              ...previous,
              branches: res.data,
            }));
            props.setRequest((previous) => ({
                ...previous,
                github_branch: res.data[0],
              }));
          }
        } catch (err) {
          console.log(err);
        }
    }

    useEffect(() => {
        getBranches(props.request.github_fork.full_name);
      }, []);

    return (
        <Row>
            <Form.Group
              className="mb-3"
              as={Col}
            >
              <Form.Label style={{ fontWeight: 500 }}>
                Select your fork
              </Form.Label>
              <Form.Select
                value={props.request.github_fork.full_name}
                onChange={(e) => {
                  props.setRequest((previous) => ({
                    ...previous,
                    github_fork: {
                      full_name: e.target.value,
                    } 
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
              <Form.Label style={{ fontWeight: 500 }}>
                Select your branch
              </Form.Label>
              <Form.Select
                value={props.request.github_branch.name}
                onChange={(e) => {
                  props.setRequest((previous) => ({
                    ...previous,
                    github_branch: {
                      name: e.target.value,
                    }
                  }));
                }}
              >
                {repository.branches.map((item, id) => {
                  return <option>{item.name}</option>;
                })}
              </Form.Select>
            </Form.Group>
        </Row>
    )
}

export default GitHubBranch