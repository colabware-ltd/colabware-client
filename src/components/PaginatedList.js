import { Row, Col, Badge } from "react-bootstrap";
import PaginationComponent from "./Pagination";

const PaginatedList = (props) => {
  return (
    <div>
      {props.data.results == null && (
        <div>
          <h3
            style={{
              textAlign: "center",
              marginTop: "70px",
              marginBottom: "70px",
            }}
          >
            No results found
          </h3>
        </div>
      )}
      <div>
        {props.data.results != null &&
          props.data.results.map((item, id) => {
            return (
              <div
                key={id}
                style={{
                  borderBottom: "1px solid #f2f2f2",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                <Row>
                  <Col md="auto">
                    <h5
                      className="label-link"
                      onClick={() => {
                        if (props.project) {
                          props.project(`/project/${item.name}`);
                        } else if (props.request) {
                          props.setParentView({
                            current: "request_view",
                          });
                          props.setSelectedRequest(item);
                        }
                      }}
                    >
                      {item.name}
                    </h5>
                  </Col>
                  <Col>
                    {item.categories != null &&
                      item.categories.map((o, i) => {
                        return (
                          <Badge
                            key={i}
                            pill
                            bg="primary"
                            className="margin-right-sm"
                          >
                            {o}
                          </Badge>
                        );
                      })}
                  </Col>
                </Row>
                <Row>
                  <p className="desc-trunc">{item.description}</p>
                </Row>
              </div>
            );
          })}
      </div>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          marginTop: "45px",
        }}
      >
        <PaginationComponent
          itemsCount={props.data.total}
          itemsPerPage={props.pageLimit}
          currentPage={props.pageCurrent}
          setCurrentPage={props.updatePage}
          alwaysShown={false}
        />
      </div>
    </div>
  );
};

export default PaginatedList;
