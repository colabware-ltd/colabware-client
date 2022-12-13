import {
  Card,
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/forms/CheckoutForm";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { post } from "../../../utils/Api";

const NewRequest = (props) => {
  const defaultExpiry = new Date();
  defaultExpiry.setDate(defaultExpiry.getDate() + 7);
  const [startDate, setStartDate] = useState(defaultExpiry);

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
  let [requestId, setRequestId] = useState("");
  let [request, setRequest] = useState({
    name: "",
    description: "",
    categories: [],
    expiry: defaultExpiry.toISOString(),
    is_approved: false,
    contributions: [],
    // status: "open",
  });

  let createRequest = async () => {
    const res = await post("request", {
      params: [props.project._id],
      body: request,
    });
    setRequestId(res.data._id);
    createPaymentIntent();
  };

  const createPaymentIntent = async () => {
    const res = await post("paymentIntent", {
      body: transaction,
    });
    props.setStripeClientSecret(res.data.client_secret);
    handleShowPayment();
  };

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
                    )}/request/${requestId}/contribution`}
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
