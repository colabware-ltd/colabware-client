import { Container } from "react-bootstrap";
import Header from "../components/Header";

const Home = (props) => {
  return (
    <div>
      <Header user={props.user} />
      <Container>
        <h1>{props.user.current.email}</h1>
      </Container>
    </div>
  );
};

export default Home;
