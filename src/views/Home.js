import { Container, Row } from "react-bootstrap";
import Header from "../components/Header";

const Home = (props) => {
  const authView = () => {
    if (!props.user.authorized) {
      return <h3>Welcome to Colabware</h3>;
    } else {
      return (
        <Row>
          <h3>
            Welcome back,{" "}
            <span style={{ fontWeight: "bold" }}>
              {props.user.current.email}
            </span>
          </h3>
        </Row>
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
