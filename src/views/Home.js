import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserHome from "./UserHome";

const Home = (props) => {
  const authView = () => {
    if (!props.user.authorized) {
      return <h3>Welcome to Colabware</h3>;
    } else {
      return <UserHome user={props.user} />;
    }
  };

  return (
    <div>
      <Header user={props.user} />
      {authView()}
    </div>
  );
};

export default Home;
