import {
  Card,
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  Modal,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/forms/CheckoutForm";
import GitHubBranch from "../../../components/GitHubBranch"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewRequest = (props) => {
  const defaultExpiry = new Date();
  defaultExpiry.setDate(defaultExpiry.getDate() + 7);
  let [payment, setPayment] = useState(false);
  const [startDate, setStartDate] = useState(defaultExpiry);
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
  let [request, setRequest] = useState({
    name: "",
    description: "",
    categories: [],
    expiry: defaultExpiry.toISOString(),
    // github_fork: props.project.github.forks[0],
    // github_branch: {
    //   name: ""
    // },
    contributions: [],
    status: "open",
  });
  const [form, setForm] = useState({
    repositoryValid: true,
    error: "",
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
        props.setStripeClientSecret(res.data.client_secret);
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
                setRequest((previous) => ({
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
                setRequest((previous) => ({
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
          <Form.Group
            controlId="formBasicPassword"
            style={{ marginBottom: "40px" }}
          >
            <Form.Control
              as="textarea"
              placeholder="Description"
              rows={3}
              onChange={(e) => {
                setRequest((previous) => ({
                  ...previous,
                  description: e.target.value,
                }));
              }}
            />
          </Form.Group>
          <Row>
            <Col>
              {" "}
              <Form.Group style={{ marginBottom: "40px" }}>
                <h5>Set a bounty</h5>
                <p>
                  Attach a starting bounty to attract project contributors to
                  your request
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
            </Col>
            <Col>
              {" "}
              <Form.Group style={{ marginBottom: "40px" }}>
                <h5>Set an expiry date</h5>
                <p>
                  Set a date after which your project request will expire, and
                  all contributed funds are refunded
                </p>
                <InputGroup className="mb-3">
                  <ReactDatePicker
                    className="form-control"
                    selected={startDate}
                    onChange={(date) => {
                      setRequest((previous) => ({
                        ...previous,
                        expiry: date.toISOString(),
                      }));
                      setStartDate(date);
                    }}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          {/* <Form.Group style={{ marginBottom: "40px" }}>
            <h5>Merge options</h5>
            <p>
              Specify a fork where you would like the requested changes merged
            </p>
            <Row>
              <GitHubBranch project={props.project} request={request} setRequest={setRequest} />
            </Row>
            <p style={{ fontWeight: "600" }}>
              If no fork is specified, any changes made as part of your feature
              request will only be merged into the original project, subject to
              a vote by token holders.
            </p>
            {!form.repositoryValid && (
              <Row>
                <Form.Group>
                  <Alert variant="danger">{form.error}</Alert>
                </Form.Group>
              </Row>
            )}
          </Form.Group> */}
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
                    )}/request/${createdRequest._id}/contribution`}
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
