import { useState, useEffect, useRef } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import PaginatedList from "../../../components/PaginatedList";
import NewRequest from "./NewRequest";
import ViewRequest from "./ViewRequest";
import axios from "axios";

const ProjectRequests = (props) => {
  const ref = useRef(null);
  let [view, setView] = useState({
    current: "request_list",
  });
  let [selectedRequest, setSelectedRequest] = useState({});
  let [pageCurrent, setPageCurrent] = useState(1);
  let [pageLimit, setPageLimit] = useState(10);

  const updatePage = (page) => {
    setPageCurrent(page);
    props.getRequests(page, pageLimit);
  };

  return (
    <div
      style={{
        marginLeft: "120px",
        marginRight: "120px",
      }}
    >
      {view.current == "request_list" && (
        <div>
          <Row style={{ marginBottom: "15px" }}>
            <Col xs={10}>
              <Form.Control type="search" placeholder="Search for an issue" />
            </Col>
            <Col xs={2}>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setView({
                    current: "request_new",
                  });
                }}
                style={{ height: "100%" }}
              >
                New Request
              </Button>
            </Col>
          </Row>
          <Row>
            <PaginatedList
              data={props.requests}
              pageLimit={pageLimit}
              pageCurrent={pageCurrent}
              updatePage={updatePage}
              request={true}
              setParentView={setView}
              setSelectedRequest={setSelectedRequest}
            />
          </Row>
        </div>
      )}
      {view.current == "request_new" && (
        <NewRequest
          ref={ref}
          setParentView={setView}
          projectId={props.projectId}
          project={props.project}
          stripeOptions={props.stripeOptions}
          stripePromise={props.stripePromise}
          stripeClientSecret={props.stripeClientSecret}
          setStripeClientSecret={props.setStripeClientSecret}
        />
      )}
      {view.current == "request_view" && (
        <ViewRequest
          setParentView={setView}
          request={selectedRequest}
          project={props.project}
          stripeOptions={props.stripeOptions}
          stripePromise={props.stripePromise}
          stripeClientSecret={props.stripeClientSecret}
          setStripeClientSecret={props.setStripeClientSecret}
        />
      )}
    </div>
  );
};

export default ProjectRequests;
