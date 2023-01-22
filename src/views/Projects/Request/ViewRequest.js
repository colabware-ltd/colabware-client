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
  ProgressBar,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/forms/CheckoutForm";
import { get, post } from "../../../api/Colabware";
import NewProposal from "../Proposal/NewProposal";
import PayoutConfirmation from "./PayoutConfirmation";

const ViewRequest = (props) => {
  const transactionFixed = [25, 50, 100];

  const [proposal, setProposal] = useState({
    create: false,
    selected: "",
    merged: "",
    submitted: [],
  });
  const showNewProposal = () => {
    setProposal((prev) => ({
      ...prev,
      create: true,
    }));
  };
  const closeNewProposal = () => {
    setProposal((prev) => ({
      ...prev,
      create: false,
    }));
  };
  const [payment, setPayment] = useState(false);
  const handleClosePayment = () => {
    setPayment(false);
  };
  const handleShowPayment = () => setPayment(true);
  let [transaction, setTransaction] = useState({
    amount: 0,
    type: "bounty",
  });
  const [contributions, setContributions] = useState([]);
  const [approvers, setApprovers] = useState({
    tokens: 0,
    approverList: [],
  });
  const [payout, setPayout] = useState(false);

  const createPaymentIntent = async () => {
    const res = await post("paymentIntent", {
      body: transaction,
    });
    props.setStripeClientSecret(res.data.client_secret);
    handleShowPayment();
  };

  const selectProposal = async (proposalId) => {
    await get("selectProposal", props.request._id, proposalId);
    setProposal((prev) => ({
      ...prev,
      selected: proposalId,
    }));
    getProposals();
  };

  const mergeProposal = (proposalId) => {
    setProposal((prev) => ({
      ...prev,
      merged: proposalId,
    }));
    setPayout(true);
  };

  const getProposals = async () => {
    const res = await get("proposals", props.request._id);
    setProposal((prev) => ({
      ...prev,
      submitted: res.data,
    }));
  };

  const getApprovers = async () => {
    const res = await get("approvers", props.request._id);
    setApprovers({
      tokens: res.data.tokens,
      approverList: res.data.approvers,
    });
    props.setSelectedRequest((previous) => ({
      ...previous,
      approved: res.data.approved,
    }));
  };

  const getContributions = async () => {
    const res = await get("contributions", props.request._id);
    setContributions(res.data);

    res.data.map((item) => {
      if (item.creator_id === props.user.current._id) {
        setProposal((prev) => ({
          ...prev,
          selected: item.selected_proposal,
        }));
      }
    });
  };

  const approveRequest = async () => {
    const res = await get("approveRequest", props.request._id);
    props.setSelectedRequest((previous) => ({
      ...previous,
      approved: res.data.approved,
    }));
    getApprovers();
  };

  const isApprover = () => {
    if (approvers.approverList == null) return false;
    const approvingUsers = approvers.approverList.map(
      ({ wallet_address }) => wallet_address
    );

    if (isMaintainer()) {
      return approvingUsers.includes(props.project.wallet_address);
    } else {
      return approvingUsers.includes(props.user.current.wallet_address);
    }
  };

  const isTokenHolder = () => {
    return props.tokenHolding.balance == 0 ? false : true;
  };

  const isMaintainer = () => {
    return props.project.maintainers.includes(props.user.current._id);
  };

  const isContributor = () => {
    if (contributions == null) return false;
    const contributingUsers = contributions.map(
      ({ creator_name }) => creator_name
    );
    return contributingUsers.includes(props.user.current.login);
  };

  useEffect(() => {
    getProposals();
    getContributions();
    getApprovers();
  }, []);

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
                <span>
                  Created by <b>@{props.request.creator_name}</b>
                </span>
              </Col>
              <Col>
                <span>
                  Created on <b>{props.request.created.split("T")[0]}</b>
                </span>
              </Col>
              <Col>
                <span>
                  Expires on <b>{props.request.expiry.split("T")[0]}</b>
                </span>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <p>{props.request.description}</p>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    window.open(
                      `https://github.com/${props.project.github.repoOwner}/${props.project.github.repoName}/issues/${props.request.github_issue}`
                    );
                  }}
                >
                  View in GitHub
                </Button>
              </Col>
              <Col style={{ textAlign: "right" }}>
                {props.request.approved && props.request.status != "closed" && (
                  <Button onClick={showNewProposal}>Submit code</Button>
                )}
                {!props.request.approved && (
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        At least{" "}
                        {props.project.approval_config.tokens_required * 100}%
                        of token holders must approve this request before any
                        code submissions can be made.
                      </Tooltip>
                    }
                  >
                    <Button style={{ opacity: 0.65 }}>Pending approval</Button>
                  </OverlayTrigger>
                )}
              </Col>
            </Row>
            <Row>
              <div
                style={{
                  borderTop: "1px solid #ced4da",
                  marginTop: "40px",
                  marginBottom: "20px",
                }}
              />
              <div>
                <h5>Roadmap approval</h5>
                <ProgressBar
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  <ProgressBar
                    variant="primary"
                    now={
                      (approvers.tokens /
                        (props.project.approval_config.tokens_required *
                          (props.token.maintainer_balance +
                            props.token.investor_balance))) *
                      100
                    }
                    key={2}
                  />
                </ProgressBar>
                <Card>
                  <Row style={{ margin: "20px" }}>
                    <Col md={4}>
                      {" "}
                      <div className="text-align-center">
                        <h2>
                          {props.tokenHolding.balance != null
                            ? props.tokenHolding.balance.toLocaleString("en")
                            : 0}
                        </h2>
                        <p>Tokens held</p>
                      </div>
                    </Col>
                    <Col md={4}>
                      {" "}
                      <div className="text-align-center">
                        <h2>
                          {props.tokenHolding.balance != null
                            ? (
                                (props.tokenHolding.balance /
                                  (props.token.investor_balance +
                                    props.token.maintainer_balance)) *
                                100
                              ).toFixed(2)
                            : 0}
                          %
                        </h2>
                        <p>Stake</p>
                      </div>
                    </Col>
                    <Col md={4}>
                      <Row>
                        {!isApprover() && isTokenHolder() && (
                          <Button onClick={approveRequest}>
                            Approve request
                          </Button>
                        )}
                        {!isApprover() && !isTokenHolder() && (
                          <OverlayTrigger
                            key="top"
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-top">
                                You must be a token holder to approve this
                                request.
                              </Tooltip>
                            }
                          >
                            <Button style={{ opacity: 0.5 }}>
                              No tokens held
                            </Button>
                          </OverlayTrigger>
                        )}
                        {isApprover() && <Button disabled>Approved</Button>}
                      </Row>
                      <Row>
                        <Button
                          variant="outline-secondary"
                          style={{ marginTop: "10px" }}
                        >
                          Purchase tokens
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </div>
              <div
                style={{
                  borderTop: "1px solid #ced4da",
                  marginTop: "40px",
                  marginBottom: "20px",
                }}
              />
              <div>
                <h5>View submissions</h5>
                {proposal.submitted != null &&
                  proposal.submitted.length > 0 &&
                  proposal.submitted.map((item, id) => {
                    return (
                      <div>
                        <Row
                          className="align-items-center"
                          style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                          <Col>
                            <Row>
                              <p>
                                Submission by <b>@{item.creator_name}</b>
                              </p>
                            </Row>
                            <Row>
                              <p>
                                <b>
                                  {Math.round(
                                    (item.contribution_total /
                                      props.request.contribution_total) *
                                      100
                                  )}
                                  %
                                </b>{" "}
                                funds allocated{" "}
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      Proportion of funds raised allocated to
                                      this submission.
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
                              </p>
                            </Row>
                          </Col>
                          <Col style={{ textAlign: "right" }}>
                            <Button
                              variant="outline-secondary"
                              style={{ marginRight: "10px" }}
                              onClick={() => {
                                window.open(
                                  `https://github.com/${item.repository}/pull/${item.pull_request_number}`
                                );
                              }}
                            >
                              View
                            </Button>
                            {isMaintainer() &&
                              props.request.status != "closed" && (
                                <Button
                                  variant="secondary"
                                  style={{ marginRight: "10px" }}
                                  onClick={() => {
                                    mergeProposal(item._id);
                                  }}
                                >
                                  Merge
                                </Button>
                              )}

                            {item._id != proposal.selected &&
                              isContributor() &&
                              props.request.status != "closed" && (
                                <Button
                                  style={{ width: "90px" }}
                                  onClick={() => {
                                    selectProposal(item._id);
                                  }}
                                >
                                  Fund
                                </Button>
                              )}
                            {item._id == proposal.selected &&
                              props.request.status != "closed" && (
                                <Button style={{ width: "90px" }} disabled>
                                  Selected
                                </Button>
                              )}
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                {proposal.submitted == null && (
                  <Card
                    style={{
                      padding: "40px",
                      backgroundColor: "#e1e9fc",
                      border: "none",
                      boxShadow: "0px 0px 5px #f2f2f2",
                      marginBottom: "40px",
                      textAlign: "center",
                      marginTop: "40px",
                    }}
                  >
                    <h5>No proposals submitted</h5>
                    <p>
                      Development proposals submitted to complete this request
                      will appear here.
                    </p>
                  </Card>
                )}
              </div>
            </Row>
          </Card>
        </Col>
        <Col xs={4}>
          <Card
            className="card-content"
            style={{ border: "none", backgroundColor: "#f5f5f5" }}
          >
            <Row style={{ textAlign: "center" }}>
              <h1>${props.request.contribution_total}</h1>
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
            {props.request.status != "closed" && (
              <Button
                style={{ marginTop: "30px" }}
                variant="primary"
                onClick={createPaymentIntent}
              >
                Contribute funds
              </Button>
            )}
            {props.request.status == "closed" && (
              <Button style={{ marginTop: "30px" }} variant="primary" disabled>
                Request closed
              </Button>
            )}
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
                )}/request/${props.request._id}/contribution`}
              />
            </Elements>
          )}
        </div>
      </Modal>
      <Modal show={proposal.create} onHide={closeNewProposal} size="lg">
        <NewProposal
          project={props.project}
          request={props.request}
          user={props.user}
          closeNewProposal={closeNewProposal}
        />
      </Modal>
      <Modal
        show={payout}
        onHide={() => {
          setPayout(false);
        }}
        size="lg"
      >
        <PayoutConfirmation
          proposal={proposal}
          setPayout={setPayout}
          request={props.request}
        />
      </Modal>
    </div>
  );
};

export default ViewRequest;
