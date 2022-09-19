import { Button, Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";

const Home = (props) => {
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
