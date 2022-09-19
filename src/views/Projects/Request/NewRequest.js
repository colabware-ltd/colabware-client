import {
  Card,
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  FloatingLabel,
  Modal,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/forms/CheckoutForm";

const NewRequest = (props) => {
  let [payment, setPayment] = useState(false);
  const handleClosePayment = () => {
    setPayment(false);
    props.setParentView({
      current: "request_list",
    });
  };
  const handleShowPayment = () => setPayment(true);
  let [transaction, setTransaction] = useState({
    amount: 0,
    type: "bounty",
  });
  let [createdRequest, setCreatedRequest] = useState({
    _id: "",
  });
  let [request, updateRequest] = useState({
    name: "",
    description: "",
    type: "",
    github: {
      repoOwner: "",
      repoName: "",
    },
    bountyContributions: [],
  });

  let createRequest = () => {
    let url = `http://${process.env.REACT_APP_BACKEND_URL}/api/user/project/${props.projectId}/request`;
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios.post(url, request, headers).then(
      (res) => {
        setCreatedRequest(res.data);
        createPaymentIntent();
      },
      (err) => {
        console.log(err);
      }
    );
    // props.setParentView({
    //   current: "request_list",
    // });
  };

  const createPaymentIntent = () => {
    let url = `http://${process.env.REACT_APP_BACKEND_URL}/api/user/payment-intent`;
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios.post(url, transaction, headers).then(
      (res) => {
        props.setStripeClientSecret(res.data.clientSecret);
        handleShowPayment();
      },
      (err) => {
        console.log(err);
      }
    );
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
                  type: e.target.value,
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
          <Form.Group
            controlId="formBasicPassword"
            style={{ marginBottom: "40px" }}
          >
            <Form.Control
              as="textarea"
              placeholder="Description"
              rows={3}
              onChange={(e) => {
                updateRequest((previous) => ({
                  ...previous,
                  description: e.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group style={{ marginBottom: "40px" }}>
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
                  setTransaction((previous) => ({
                    ...previous,
                    amount: parseFloat(e.target.value),
                  }));
                }}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group style={{ marginBottom: "40px" }}>
            <h5>Merge options</h5>
            <p>
              Specify a fork where you would like the requested changes merged
            </p>
            <Row>
              <Form.Group as={Col} controlId="newProject.repositoryOwner">
                <FloatingLabel
                  controlId="floatingInput"
                  label="GitHub repository owner"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="colabware"
                    onChange={(e) => {
                      this.props.updateRequest((previous) => ({
                        ...previous,
                        github: {
                          ...previous.github,
                          repoOwner: e.target.value,
                        },
                      }));
                    }}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} controlId="newProject.repositoryName">
                <FloatingLabel
                  controlId="floatingInput"
                  label="GitHub repository name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="my-project"
                    onChange={(e) => {
                      this.props.updateRequest((previous) => ({
                        ...previous,
                        github: {
                          ...previous.github,
                          repoName: e.target.value,
                        },
                      }));
                    }}
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <p style={{ fontWeight: "600" }}>
              If no fork is specified, any changes made as part of your feature
              request will only be merged into the original project, subject to
              a vote by token holders.
            </p>
          </Form.Group>
          <Button variant="primary" onClick={createRequest}>
            Submit
          </Button>
          <Modal show={payment} onHide={handleClosePayment}>
            <div style={{ padding: "40px" }}>
              {props.stripeClientSecret && (
                <Elements
                  options={props.stripeOptions}
                  stripe={props.stripePromise}
                >
                  <CheckoutForm
                    returnUrl={`http://localhost:3000/api/user/project/${encodeURIComponent(
                      props.project.name
                    )}/request/${createdRequest._id}/bounty`}
                  />
                </Elements>
              )}
            </div>
          </Modal>
        </Form>
      </Card>
    </div>
  );
};

export default NewRequest;
