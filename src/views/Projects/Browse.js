import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge, Form, Card } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import PaginatedList from "../../components/PaginatedList";

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
    orderBy: "Date created",
    descending: false,
  });

  const sortOptions = [
    { name: "Date created", id: 1 },
    { name: "Number of investors", id: 2 },
    { name: "Number of maintainers", id: 3 },
  ];

  const categories = [
    { name: "Blockchain", id: 1 },
    { name: "CRM", id: 2 },
    { name: "Development", id: 3 },
    { name: "Multimedia", id: 4 },
    { name: "Security", id: 5 },
  ];

  const getProjects = async (page, limit) => {
    let url = `http://127.0.0.1/api/project/list?page=${page}&limit=${limit}`;
    try {
      const res = await axios.get(url, {
        validateStatus: function (status) {
          return (status >= 200 && status <= 302) || status == 401;
        },
      });
      if (res.status == 302)
        setData({
          results: res.data.results,
          total: res.data.total,
        });
    } catch (err) {
      console.log(err);
    }
  };

  const updatePage = (page) => {
    setPageCurrent(page);
    getProjects(page, pageLimit);
  };

  useEffect(() => {
    getProjects(pageCurrent, pageLimit);
  }, []);

  return (
    <div>
      <Header user={props.user} />
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
                <Form.Select style={{ marginBottom: "20px" }}>
                  <option>Most recently created</option>
                  <option>Least recently created</option>
                  <option>Most investors</option>
                  <option>Fewest investors</option>
                  <option>Most contributors</option>
                  <option>Fewest contributors</option>
                </Form.Select>
                <Form.Control
                  type="email"
                  placeholder="Search"
                  style={{ marginBottom: "20px" }}
                />
              </Form.Group>
              <Card>
                <Card.Body>
                  <p style={{ fontWeight: "600", marginBottom: 0 }}>
                    Filter by project type
                  </p>
                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    {categories.map((o, i) => {
                      return (
                        <Badge
                          pill
                          bg="primary"
                          className="margin-right-sm"
                          style={
                            parameters.categories.includes(o.name)
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
                            let c = parameters.categories;
                            if (!parameters.categories.includes(o.name)) {
                              c.push(o.name);
                            } else {
                              let index = parameters.categories.indexOf(o.name);
                              if (index > -1) {
                                c.splice(index, 1);
                              }
                            }
                            setParameters({ categories: c });
                          }}
                        >
                          {o.name}
                        </Badge>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col xs={9}>
            <h3 style={{ marginBottom: "15px" }}>
              {data.total} projects found
            </h3>
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
      <Footer />
    </div>
  );
};

export default Browse;
