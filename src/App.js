import Header from "./components/Header";
import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewProject from "./views/Projects/NewProject";
import Project from "./views/Projects/Project";
import Home from "./views/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import Browse from "./views/Projects/Browse";

const App = () => {
  let [user, setUser] = useState({
    const: false,
    current: {},
  });
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = loadStripe(
    "pk_test_51J2rxbB2yNlUi1mddmHQEpvnWQOdMHyecelWPpRffHJcIBYlnIFVYfbdX19XsxR4yds0Q2IV6EwWEJ2MQD0xriIC00YuyFjf31"
  );
  const appearance = {
    theme: "stripe",
  };
  const stripeOptions = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    const getUser = async () => {
      // TODO: Update request URL
      let url = `${process.env.REACT_APP_BACKEND_URL}/user/`;
      try {
        const res = await axios.get(url, {
          validateStatus: function (status) {
            return (status >= 200 && status <= 302) || status == 401;
          },
        });
        if (res.status == 302)
          setUser({
            authorized: true,
            current: res.data,
          });
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home user={user} />} exact />
          <Route
            path="/project/:projectId"
            element={
              <Project
                stripeOptions={stripeOptions}
                stripePromise={stripePromise}
                stripeClientSecret={clientSecret}
                setStripeClientSecret={setClientSecret}
                user={user}
              />
            }
            exact
          />
          <Route path="/browse" element={<Browse user={user} />} exact />
          <Route path="/project/new" element={<NewProject />} exact />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
