import {
  Button,
  Card,
  Col,
  Row,
  Form,
  Modal,
  InputGroup,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import { post } from "../utils/Api";

const TokenPreview = (props) => {
  let [paymentView, setPaymentView] = useState(false);
  const handleClosePayment = () => setPaymentView(false);
  const handleShowPayment = () => setPaymentView(true);
  let [transaction, setTransaction] = useState({
    amount: 1,
    tokens: 1,
    project: props.project._id,
    type: "token",
  });

  const ONE_TOKEN = 1000000000000000000;

  const buyUSDT = () => {
    if (props.user.authorized) {
      new RampInstantSDK({
        hostAppName: "Colabware",
        hostLogoUrl:
          "http://localhost:3000/static/media/colabware.76108bd7dabe78130e12d4069bcd1b68.svg", // 150 ETH in wei
        userAddress: props.user.current.wallet_address,
        // Special URL to use staging RAMP, do not change until reaching production
        url: "https://ri-widget-staging.firebaseapp.com/",
        fiatCurrency: "USD",
        // TODO: Update to MATIC_USDC in prod
        swapAsset: "MATIC_TEST",
        swapAmount: transaction.amount * ONE_TOKEN,
        // swapAmount: transaction.amount * 1000000,
      })
        .on("PURCHASE_CREATED", (event) => {
          let bodyContent = {
            purchase_id: event.payload.purchase.id,
            purchase_secret: event.payload.purchaseViewToken,
            project_wallet_id: props.project.wallet,
            user_wallet_addr: props.user.current.wallet_address,
            crypto_amount: parseInt(event.payload.purchase.cryptoAmount),
          };
          console.log(bodyContent);
          const res = post("purchaseToken", {
            body: bodyContent,
          });
          console.log(res);
        })
        .show();
    }
  };

  const contractDeployed = () => {
    return (
      props.token.maintainer_balance !== null &&
      props.token.investor_balance !== null
    );
  };

  useEffect(() => {
    setTransaction((previous) => ({
      ...previous,
      project: props.project._id,
      amount: props.project.token.price,
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
                    props.token.maintainer_balance -
                    props.token.maintainer_reserved
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
                    (props.token.maintainer_reserved /
                      (props.token.maintainer_balance +
                        props.token.investor_balance)) *
                      100
                  )}
                  %
                </h2>
              )}
              {!contractDeployed() && <h2>-- %</h2>}
              <p>Maintainer control</p>
            </div>
          </Col>
          <Col>
            <div className="text-align-center">
              {contractDeployed() && <h2>${props.project.token.price}</h2>}
              {!contractDeployed() && <h2>--</h2>}
              <p>Price (USDC)</p>
            </div>
          </Col>
        </Row>
        {contractDeployed() && (
          <div>
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    {props.project.token.symbol}
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Tokens"
                    value={transaction.tokens}
                    onChange={(e) => {
                      let val = "0";
                      if (e.target.value != "" && e.target.value >= 0) {
                        if (
                          e.target.value.length > 1 &&
                          e.target.value.charAt(0) == "0"
                        ) {
                          e.target.value = e.target.value.substring(1);
                        }
                        val = e.target.value;
                      }
                      setTransaction((previous) => ({
                        ...previous,
                        tokens: parseInt(val),
                        amount: parseInt(val) * props.project.token.price,
                      }));
                    }}
                  />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Text>USDC$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Amount"
                    value={transaction.amount}
                    disabled
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  {props.user.authorized && (
                    <Button onClick={buyUSDT} style={{ width: "100%" }}>
                      Purchase tokens
                    </Button>
                  )}
                  {!props.user.authorized && (
                    <Button disabled style={{ width: "100%" }}>
                      Purchase tokens
                    </Button>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Button
                  variant="outline-secondary"
                  style={{ width: "100%" }}
                  onClick={() => {
                    window.open(
                      `https://mumbai.polygonscan.com/token/${props.project.token.address}`
                    );
                  }}
                >
                  View contract
                </Button>
              </Col>
            </Row>
          </div>
        )}
        {!contractDeployed() && (
          <Button disabled>Contract pending deployment</Button>
        )}
      </Card>
    </div>
  );
};

export default TokenPreview;
