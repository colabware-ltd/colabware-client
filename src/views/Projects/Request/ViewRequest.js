import {
  Card,
  Row,
  Col,
  Badge,
  OverlayTrigger,
  Tooltip,
  ButtonGroup,
  Button,
  InputGroup,
  Form,
  Modal,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/forms/CheckoutForm";

const ViewRequest = (props) => {
  let [payment, setPayment] = useState(false);
  const handleClosePayment = () => {
    setPayment(false);
  };
  const handleShowPayment = () => setPayment(true);
  const transactionFixed = [25, 50, 100];
  let [transaction, setTransaction] = useState({
    amount: 0,
    type: "bounty",
  });

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
          props.setParentView({
            current: "request_list",
          });
        }}
      >
        &lsaquo; Back
      </p>
      <Row>
        <Col xs={8}>
          <Card className="card-content">
            <Row>
              <Col md="auto">
                <h3>{props.request.name}</h3>
              </Col>
              <Col>
                <Badge
                  pill
                  bg="primary"
                  className="margin-right-sm"
                  style={{ marginLeft: "10px" }}
                >
                  {props.request.categories[0]}
                </Badge>
              </Col>
            </Row>
            <Row style={{ marginTop: "5px" }}>
              <Col>
                <span>Created by </span>
              </Col>
              <Col>
                <span>
                  Created on <b>{props.request.created.split("T")[0]}</b>
                </span>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <p>{props.request.description}</p>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <Button variant="outline-secondary">View in GitHub</Button>
              </Col>
              <Col style={{ textAlign: "right" }}>
                <Button>Complete request</Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={4}>
          <Card
            className="card-content"
            style={{ border: "none", backgroundColor: "#f5f5f5" }}
          >
            <Row style={{ textAlign: "center" }}>
              <h1>${props.request.bounty}</h1>
            </Row>
            <Row
              style={{
                textAlign: "center",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              <h5>
                <span>
                  Funds raised{" "}
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        This amount will be released to anyone who completes the
                        current request.
                      </Tooltip>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-question-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                    </svg>
                  </OverlayTrigger>
                </span>
              </h5>
            </Row>
            <ButtonGroup
              size="sm"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              {transactionFixed.map((amount) => {
                return (
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      setTransaction({
                        amount: parseFloat(amount),
                      });
                    }}
                  >
                    ${amount}
                  </Button>
                );
              })}
            </ButtonGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
              <Form.Control
                placeholder="1,000"
                aria-label="1,000"
                aria-describedby="basic-addon1"
                value={transaction.amount}
                onChange={(e) => {
                  setTransaction({
                    amount: parseFloat(e.target.value),
                  });
                }}
              />
            </InputGroup>
            <Button
              style={{ marginTop: "30px" }}
              variant="primary"
              onClick={createPaymentIntent}
            >
              Contribute funds
            </Button>
          </Card>
        </Col>
      </Row>
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
                )}/request/${props.request._id}/bounty`}
              />
            </Elements>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ViewRequest;
