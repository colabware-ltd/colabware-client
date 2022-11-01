import { Button, Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import axios from "axios";

const Home = (props) => {
  const stripeHandler = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/stripe`;
    try {
      let res = await axios.get(url);
      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  const authView = () => {
    if (!props.user.authorized) {
      return <h3>Welcome to Colabware</h3>;
    } else {
      return (
        <div>
          <Row>
            <h3>
              Welcome back,{" "}
              <span style={{ fontWeight: "bold" }}>
                @{props.user.current.login}
              </span>
            </h3>
          </Row>
          <Row>
            <Col>
              <Button variant="outline-secondary" onClick={stripeHandler}>
                Connect Stripe
              </Button>
            </Col>
          </Row>
        </div>
      );
    }
  };

  return (
    <div>
      <Header user={props.user} />
      <Container style={{ marginTop: "40px" }}>{authView()}</Container>
    </div>
  );
};

export default Home;
