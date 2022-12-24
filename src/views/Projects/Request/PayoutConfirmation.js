import { Button, Row, Col, Badge } from "react-bootstrap";
import { get } from "../../../utils/Api";

const PayoutConfirmation = (props) => {
  const mergeProposal = async () => {
    // const res = await get(
    //   "mergeProposal",
    //   props.request._id,
    //   props.proposal.merged
    // );
    props.setPayout(false);
    location.reload();
  };

  return (
    <div style={{ margin: "30px" }}>
      <h4>Merge request submission</h4>
      <div className="content-divider" />
      <p className="secondary-text">
        Merge your selected submission, and confirm the payout of funds raised
        for this request.
      </p>
      <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
        {props.proposal.submitted != null &&
          props.proposal.submitted.length > 0 &&
          props.proposal.submitted.map((item, id) => {
            return (
              <Row
                className="align-items-center"
                style={{ marginBottom: "15px" }}
              >
                <Col>
                  Submission by <b>@{item.creator_name}</b>
                </Col>

                {props.proposal.merged == item._id && (
                  <Col style={{ textAlign: "center" }}>
                    <Badge
                      pill
                      bg="primary"
                      className="margin-right-sm"
                      style={{ marginLeft: "10px" }}
                    >
                      Selected
                    </Badge>
                  </Col>
                )}
                <Col style={{ textAlign: "right" }} md="auto">
                  {Math.round(
                    (item.contribution_total /
                      props.request.contribution_total) *
                      100
                  )}
                  %
                </Col>
                <Col style={{ textAlign: "right" }} md="auto">
                  ${item.contribution_total}
                </Col>
                <Col md="auto">
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      window.open(
                        `https://github.com/${item.repository}/pull/${item.pull_request_number}`
                      );
                    }}
                  >
                    View
                  </Button>
                </Col>
              </Row>
            );
          })}
        <div className="content-divider" />

        <Row>
          <Col>
            <b>Total payout</b>
          </Col>
          <Col style={{ textAlign: "right" }} md="auto">
            <b>100%</b>
          </Col>
          <Col style={{ textAlign: "right" }} md="auto">
            <b>${props.request.contribution_total}</b>
          </Col>
        </Row>
      </Row>

      <Button onClick={mergeProposal}>Merge and close request</Button>
    </div>
  );
};

export default PayoutConfirmation;
