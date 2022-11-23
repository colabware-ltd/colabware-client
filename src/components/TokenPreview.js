import { Button, Card, Col, Row, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
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

  const buyUSDT = () => {
    new RampInstantSDK({
      hostAppName: "your dApp",
      hostLogoUrl: "https://yourdapp.com/yourlogo.png", // 150 ETH in wei
      userAddress: props.user.current.wallet_address,
      // Special URL to use staging RAMP, do not change until reaching production
      url: 'https://ri-widget-staging.firebaseapp.com/',
      fiatCurrency: "USD",
      // ETH has low liquidity on testing network, hencing using GOERLI_TEST instead
      swapAsset: 'GOERLI_TEST',
      fiatValue: 100.0,
    })
      .on("PURCHASE_CREATED", (event) => {
        let bodyContent = {
          purchase_id: event.payload.purchase.id,
          purchase_secret: event.payload.purchaseViewToken,
          project_wallet_id: props.project.wallet,
          user_wallet_addr: props.user.current.wallet_address,
          crypto_amount: 5,
        }
        console.log(bodyContent)
        const res = post("purchaseToken", { 
          body: bodyContent
        });
        console.log(res);
        
      }
        )
      .show();
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
          <Button onClick={buyUSDT}>
            Purchase {props.token.symbol} tokens
          </Button>
        )}
      </Card>
    </div>
  );
};

export default TokenPreview;
