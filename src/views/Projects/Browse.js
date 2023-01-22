import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge, Form, Card } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PaginatedList from "../../components/PaginatedList";
import { get } from "../../api/Colabware";

const Browse = (props) => {
  let navigate = useNavigate();

  let [data, setData] = useState({
    total: 0,
    results: [],
  });
  let [pageCurrent, setPageCurrent] = useState(1);
  let [pageLimit, setPageLimit] = useState(10);
  let [parameters, setParameters] = useState({
    categories: [],
    orderBy: "created",
    descending: true,
  });

  const sortOptions = [
    { name: "Most recently created", field: "created", descending: true },
    {
      name: "Least recently created",
      field: "created",
      descending: false,
    },
    { name: "Most requests", field: "request_count", descending: true },
    { name: "Least requests", field: "request_count", descending: false },
  ];

  const updateCategories = (option) => {
    let c = parameters.categories;
    if (!parameters.categories.includes(option)) {
      c.push(option);
    } else {
      let index = parameters.categories.indexOf(option);
      if (index > -1) {
        c.splice(index, 1);
      }
    }
    setParameters((prev) => ({
      ...prev,
      categories: c,
    }));
    getProjects(
      pageCurrent,
      pageLimit,
      parameters.orderBy,
      parameters.descending,
      c.toString()
    );
  };

  const updateSort = (option) => {
    setParameters((prev) => ({
      ...prev,
      orderBy: option.field,
      descending: option.descending,
    }));
    getProjects(
      pageCurrent,
      pageLimit,
      option.field,
      option.descending,
      parameters.categories.toString()
    );
  };

  const getProjects = async (page, limit, orderBy, desc, filterBy) => {
    if (page >= 1) {
      const res = await get("projects", page, limit, orderBy, desc, filterBy);
      setData(res.data);
    }
  };

  const updatePage = (page) => {
    setPageCurrent(page);
    getProjects(
      page,
      pageLimit,
      parameters.orderBy,
      parameters.descending,
      parameters.categories.toString()
    );
  };

  useEffect(() => {
    getProjects(
      pageCurrent,
      pageLimit,
      parameters.orderBy,
      parameters.descending,
      parameters.categories.toString()
    );
  }, []);

  return (
    <Container
      style={{
        paddingTop: "35px",
        paddingLeft: "120px",
        paddingRight: "120px",
      }}
    >
      <Row>
        <Col xs={3}>
          <div
            style={{
              height: "100%",
              paddingRight: "15px",
            }}
          >
            <Form.Group>
              <Form.Select
                style={{ marginBottom: "20px" }}
                onChange={(e) => {
                  updateSort(JSON.parse(e.target.value));
                }}
              >
                {sortOptions.map((o, i) => {
                  return (
                    <option key={i} value={JSON.stringify(o)}>
                      {o.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Card>
              <Card.Body>
                <p style={{ fontWeight: "600", marginBottom: 0 }}>
                  Filter by project type
                </p>
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {props.categories.map((o, i) => {
                    return (
                      <Badge
                        key={i}
                        pill
                        bg="primary"
                        className="margin-right-sm"
                        style={
                          parameters.categories.includes(o)
                            ? {
                                marginRight: "5px",
                                marginBottom: "3px",
                                cursor: "pointer",
                                transition: "0.2s",
                              }
                            : {
                                marginRight: "5px",
                                marginBottom: "3px",
                                cursor: "pointer",
                                opacity: "0.4",
                                transition: "0.2s",
                              }
                        }
                        onClick={() => {
                          updateCategories(o);
                        }}
                      >
                        {o}
                      </Badge>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col xs={9}>
          <h3 style={{ marginBottom: "15px" }}>{data.total} projects found</h3>
          <PaginatedList
            data={data}
            pageLimit={pageLimit}
            pageCurrent={pageCurrent}
            updatePage={updatePage}
            project={navigate}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Browse;
