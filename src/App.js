import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewProject from "./views/Projects/NewProject";
import Project from "./views/Projects/Project";
import Home from "./views/Home";
import { useEffect, useState } from "react";
import Browse from "./views/Projects/Browse";
import { get } from "./utils/Api";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
  const projectCategories = [
    "Blockchain",
    "Security",
    "E-commerce",
    "Multimedia",
    "Other",
    "Database",
    "Education",
    "Software development",
    "System development",
    "Internet",
    "Business",
    "Communications",
    "Science and Engineering",
    "Text editors",
  ].sort();

  useEffect(() => {
    (async () => {
      const res = await get("user");
      if (res.data === null) {
        setUser({
          authorized: false,
          current: {},
        });
      } else {
        setUser({
          authorized: true,
          current: res.data,
        });
      }
    })();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header user={user} />
        <div className="body-container">
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
            <Route
              path="/browse"
              element={<Browse categories={projectCategories} user={user} />}
              exact
            />
            <Route
              path="/project/new"
              element={<NewProject categories={projectCategories} />}
              exact
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
