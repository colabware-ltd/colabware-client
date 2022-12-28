import { useState } from "react";
import { Button, Col, Row, Form, Nav, Tab } from "react-bootstrap";
import PaginatedList from "../../../components/PaginatedList";
import NewRequest from "./NewRequest";
import ViewRequest from "./ViewRequest";
import { get } from "../../../utils/Api";

const ProjectRequests = (props) => {
  let [view, setView] = useState({
    current: "request_list",
  });
  let [selectedRequest, setSelectedRequest] = useState({});
  let [pageCurrent, setPageCurrent] = useState(1);
  let [pageLimit, setPageLimit] = useState(10);

  const updatePage = async (page) => {
    setPageCurrent(page);
    if (props.project !== null && props.project._id !== "") {
      const requests = (
        await get("projectRequests", props.project._id, pageCurrent, pageLimit)
      ).data;
      props.setRequests((prev) => ({
        ...prev,
        open: requests,
      }));
    }
  };

  return (
    <div
      style={{
        marginLeft: "120px",
        marginRight: "120px",
      }}
    >
      {view.current === "request_list" && (
        <div>
          <Row style={{ marginBottom: "15px" }}>
            <Col md={2}>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setView({
                    current: "request_new",
                  });
                }}
                style={{ height: "100%", width: "100%" }}
              >
                New Request
              </Button>
            </Col>
            <Col md={10}>
              <Form.Control type="search" placeholder="Search for an issue" />
            </Col>
          </Row>
          <Row>
            <Tab.Container defaultActiveKey="open">
              <Col md={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="open">Open</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="pending">Pending</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="closed">Closed</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col>
                <Tab.Content>
                  <Tab.Pane eventKey="open">
                    <PaginatedList
                      data={props.requests.open}
                      pageLimit={pageLimit}
                      pageCurrent={pageCurrent}
                      updatePage={updatePage}
                      request={true}
                      setParentView={setView}
                      setSelectedRequest={setSelectedRequest}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="pending">
                    <PaginatedList
                      data={props.requests.pending}
                      pageLimit={pageLimit}
                      pageCurrent={pageCurrent}
                      updatePage={updatePage}
                      request={true}
                      setParentView={setView}
                      setSelectedRequest={setSelectedRequest}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="closed">
                    <PaginatedList
                      data={props.requests.closed}
                      pageLimit={pageLimit}
                      pageCurrent={pageCurrent}
                      updatePage={updatePage}
                      request={true}
                      setParentView={setView}
                      setSelectedRequest={setSelectedRequest}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Tab.Container>
          </Row>
        </div>
      )}
      {view.current === "request_new" && (
        <NewRequest
          setParentView={setView}
          project={props.project}
          stripeOptions={props.stripeOptions}
          stripePromise={props.stripePromise}
          stripeClientSecret={props.stripeClientSecret}
          setStripeClientSecret={props.setStripeClientSecret}
        />
      )}
      {view.current === "request_view" && (
        <ViewRequest
          setParentView={setView}
          request={selectedRequest}
          project={props.project}
          stripeOptions={props.stripeOptions}
          stripePromise={props.stripePromise}
          stripeClientSecret={props.stripeClientSecret}
          setStripeClientSecret={props.setStripeClientSecret}
          setSelectedRequest={setSelectedRequest}
          tokenHolding={props.tokenHolding}
          token={props.token}
          user={props.user}
        />
      )}
    </div>
  );
};

export default ProjectRequests;
