import { Card, Button, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";


const NewRequest = (props) => {
  let [request, updateRequest] = useState({
    name: "",
    description: "",
    category: "",
    bountyContributions: [],
  });

  let createRequest = () => {
    let url = `http://${process.env.REACT_APP_BACKEND_URL}/api/user/project/${props.projectId}/request`;
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios.post(url, request, headers).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    props.setParentView({
      current: "request_list",
    });
  };

  return (
    <div>
      <p
        style={{ width: "50px" }}
        className="secondary-text label-link"
        onClick={() => {
          console.log("Hello!");
          props.setParentView({
            current: "request_list",
          });
        }}
      >
        &lsaquo; Back
      </p>
      <Card className="card-content">
        <h3>Create a new request</h3>
        <p>Submit a new feature or enhancement request for this project</p>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="title"
              placeholder="Title"
              onChange={(e) => {
                updateRequest((previous) => ({
                  ...previous,
                  name: e.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                updateRequest((previous) => ({
                  ...previous,
                  categories: [e.target.value],
                }));
              }}
            >
              <option>Select the request type</option>
              <option value="New feature">New feature</option>
              <option value="Existing feature enhancement">
                Existing feature enhancement
              </option>
              <option value="Bug fix">Bug fix</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              as="textarea"
              placeholder="Description"
              rows={3}
              style={{ marginBottom: "20px" }}
              onChange={(e) => {
                updateRequest((previous) => ({
                  ...previous,
                  description: e.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group>
            <h5>Set a bounty</h5>
            <p>
              Attach a starting bounty to attract project contributors to your
              request
            </p>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
              <Form.Control
                placeholder="1,000"
                aria-label="1,000"
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  updateRequest((previous) => ({
                    ...previous,
                    bountyContributions: [
                      {
                        amount: parseFloat(e.target.value),
                      },
                    ],
                  }));
                }}
              />
            </InputGroup>
          </Form.Group>
          <Button
            variant="primary"
            style={{ marginTop: "10px" }}
            onClick={createRequest}
          >
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default NewRequest;
