import { Component } from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Header";

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container>
          <h1>Home</h1>
        </Container>
      </div>
    );
  }
}

export default Home;
