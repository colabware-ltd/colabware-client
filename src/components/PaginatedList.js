import { Row, Col, Badge } from "react-bootstrap";
import PaginationComponent from "./Pagination";
import { useNavigate } from "react-router-dom";

const PaginatedList = (props) => {
  return (
    <div>
      <div>
        {props.data.results != null &&
          props.data.results.map((item, id) => {
            return (
              <div
                style={{
                  borderBottom: "1px solid #ced4da",
                  paddingTop: "15px",
                  paddingBottom: "15px",
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
                          props.request(true);
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
                          <Badge pill bg="primary" className="margin-right-sm">
                            {o}
                          </Badge>
                        );
                      })}
                  </Col>
                </Row>
                <Row>
                  <p id="project-desc-trunc">{item.description}</p>
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
