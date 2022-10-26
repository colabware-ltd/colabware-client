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
import { useState, useEffect } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/forms/CheckoutForm";
import GitHubBranch from "../../../components/GitHubBranch";
import PaginatedList from "../../../components/PaginatedList";

const ViewRequest = (props) => {
  const [response, setResponse] = useState(false);
  const handleCloseResponse = () => {
    setResponse(false);
  };
  const handleShowResponse = () => {
    setResponse(true);
  };
  const [payment, setPayment] = useState(false);
  const handleClosePayment = () => {
    setPayment(false);
  };
  const handleShowPayment = () => setPayment(true);
  const transactionFixed = [25, 50, 100];
  let [transaction, setTransaction] = useState({
    amount: 0,
    type: "bounty",
  });
  const [repository, setRepository] = useState({
    branches: [],
    github_fork: props.project.github.forks[0],
    github_branch: "",
  });
  const [responseDetails, setRepsonseDetails] = useState({
    description: "",
  });
  const [ proposals, setProposals ] = useState([]);
  const [ contributions, setContributions ] = useState([]);
  const [ selectedProposal, setSelectedProposal ] = useState("");

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

  const createProposal = async () => {
    const url = `http://${process.env.REACT_APP_BACKEND_URL}/api/user/request/${props.request._id}/proposal`
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const body = {
      repository: `${props.project.github.repoOwner}/${props.project.github.repoName}`,
      pull_request: {
        title: "Test PR",
        body: responseDetails.description,
        // Location of changes
        head: repository.github_fork.full_name.split('/')[0] + ":" + repository.github_branch.name,
        // TODO: Specify branch of main project
        base: "main"
      }
    }
    try {
      const res = await axios.post(url, body, headers)
      handleCloseResponse()
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const selectProposal = async (proposalId) => {
    const url = `http://${process.env.REACT_APP_BACKEND_URL}/api/user/request/${props.request._id}/proposal/${proposalId}/select`
    // const headers = {
    //   "Content-Type": "application/x-www-form-urlencoded",
    // };
    const body = response
    try {
      const res = await axios.get(url)
      setSelectedProposal(proposalId)
    } catch (err) {
      console.log(err)
    }
  }

  const getProposals = async () => {
    const url = `http://${process.env.REACT_APP_BACKEND_URL}/api/request/${props.request._id}/proposals`
    // const headers = {
    //   "Content-Type": "application/x-www-form-urlencoded",
    // };
    try {
      const res = await axios.get(url, {
        validateStatus: function (status) {
          return (status >= 200 && status <= 302) || status == 401;
        },
      });
      if (res.status == 302)
        setProposals(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const getContributions = async () => {
    const url = `http://${process.env.REACT_APP_BACKEND_URL}/api/request/${props.request._id}/contributions`
    // const headers = {
    //   "Content-Type": "application/x-www-form-urlencoded",
    // };
    try {
      const res = await axios.get(url, {
        validateStatus: function (status) {
          return (status >= 200 && status <= 302) || status == 401;
        },
      });
      if (res.status == 302)
        setContributions(res.data);

        // Check for user contribution and selected proposal
        res.data.map((item, id) => {
          if (item.creator_id === props.user.current._id) {
            setSelectedProposal(item.selected_proposal)
          }
        })

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProposals();
    getContributions();
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
                <Button
                  onClick={() => {
                    handleShowResponse();
                  }}
                >
                  Submit code
                </Button>
              </Col>
            </Row>
            <Row>
              <div
                style={{
                  borderTop: "1px solid #ced4da",
                  marginTop: "40px",
                  marginBottom: "20px"
                }}
              />
              <div>
                <h5>View submissions</h5>
                {proposals != null &&
                  proposals.map((item, id) => {
                    return <div>
                      <Row className="align-items-center" style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Col>
                          Submission by <b>@{item.creator_name}</b>
                        </Col>
                        <Col style={{ textAlign: "center" }}>
                          <b>{(item.contribution_total/props.request.contribution_total) * 100}%</b> pledged{" "}
                          <OverlayTrigger
                            placement="bottom"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                Pledged contributions so far.
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
                        </Col>
                        <Col style={{ textAlign: "right" }}>
                          <Button 
                            variant="outline-secondary" 
                            style={{ marginRight: "10px"}}
                            onClick={() => {
                              window.open(
                                `https://github.com/${item.repository}/pull/${item.pull_request_number}`
                              );
                            }}
                          >
                            View
                          </Button>
                          { item._id != selectedProposal && 
                              <Button style={{ width: "90px"}} onClick={() => {
                                selectProposal(item._id)
                              }}>Select</Button>
                          }
                          { item._id == selectedProposal && 
                              <Button style={{ width: "90px"}} disabled>Selected</Button>
                          }
                        </Col>
                      </Row>
                    </div>
                  })}
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
                )}/request/${props.request._id}/contribution`}
              />
            </Elements>
          )}
        </div>
      </Modal>
      <Modal show={response} onHide={handleCloseResponse} size="lg">
        <div style={{ margin: "30px" }}>
          <h4>Complete this request</h4>
          <div className="content-divider" />
          <p>
            Submit your completed code as a pull request for review, and claim
            any funds raised for its development.
          </p>
          <Row style={{ marginTop: "30px" }}>
            <GitHubBranch project={props.project} request={repository} setRequest={setRepository} />
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={{ fontWeight: 500 }}>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Please provide in about your changes here"
                value={responseDetails.description}
                onChange={(e) => {
                  setRepsonseDetails((previous) => ({
                    ...previous,
                    description: e.target.value,
                  }));
                }}
                rows={3}
              />
            </Form.Group>
          </Row>
          <Button style={{ marginTop: "30px" }} onClick={createProposal}>Create proposal</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ViewRequest;
