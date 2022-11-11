import { Button, Card, Col, Row, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./forms/CheckoutForm";

import { post } from "../utils/Api";

const TokenPreview = (props) => {
  let [paymentView, setPaymentView] = useState(false);
  const handleClosePayment = () => setPaymentView(false);
  const handleShowPayment = () => setPaymentView(true);
  let [transaction, setTransaction] = useState({
    tokens: 1,
    project: props.project._id,
    type: "token",
  });

  const contractDeployed = () => {
    return (
      props.token.maintainerBalance !== null &&
      props.token.investorBalance !== null
    );
  };

  useEffect(() => {
    setTransaction((previous) => ({
      ...previous,
      project: props.project._id,
    }));
  }, [props.project]);

  return (
    <div>
      <Card id="project-header-card" className="card-content">
        <Row className="content-margin">
          <Col>
            <div className="text-align-center">
              {contractDeployed() && (
                <h2>
                  {(
                    props.token.maintainerBalance -
                    props.token.maintainerReserved
                  ).toLocaleString("en")}
                </h2>
              )}
              {!contractDeployed() && <h2>--</h2>}

              <p>Tokens available</p>
            </div>
          </Col>
          <Col>
            <div className="text-align-center">
              {contractDeployed() && (
                <h2>
                  {Math.round(
                    (props.token.maintainerReserved /
                      (props.token.maintainerBalance +
                        props.token.investorBalance)) *
                      100
                  )}
                  %
                </h2>
              )}
              {!contractDeployed() && <h2>-- %</h2>}
              <p>Maintainer control</p>
            </div>
          </Col>
        </Row>
        {!contractDeployed() && (
          <Form.Control
            type="number"
            placeholder="Tokens"
            className="margin-btm-sm"
            value={transaction.tokens}
            disabled
          />
        )}
        {contractDeployed() && (
          <Form.Control
            type="number"
            placeholder="Tokens"
            className="margin-btm-sm"
            value={transaction.tokens}
            onChange={(e) => {
              setTransaction((previous) => ({
                ...previous,
                tokens: parseInt(e.target.value),
              }));
            }}
          />
        )}
        {!contractDeployed() && (
          <Button disabled>Contract pending deployment</Button>
        )}
        {contractDeployed() && (
          <Button
            onClick={() => {
              console.log("TODO");
            }}
          >
            Purchase {props.token.symbol} tokens
          </Button>
        )}
      </Card>
      <Modal show={paymentView} onHide={handleClosePayment}>
        <div style={{ padding: "40px" }}>
          {props.stripeClientSecret && (
            <Elements
              options={props.stripeOptions}
              stripe={props.stripePromise}
            >
              <CheckoutForm
                returnUrl={`http://localhost:3000/project/${encodeURIComponent(
                  props.project.name
                )}`}
              />
            </Elements>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TokenPreview;
