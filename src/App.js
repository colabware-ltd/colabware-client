import Header from "./components/Header";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewProject from "./views/Projects/NewProject";
import Project from "./views/Projects/Project";
import Home from "./views/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import Browse from "./views/Projects/Browse";

const App = () => {
  let [user, setUser] = useState({
    authorized: false,
    current: {},
  });

  useEffect(() => {
    const getUser = async () => {
      // TODO: Update request URL
      let url = `http://${process.env.REACT_APP_BACKEND_URL}/api/user/`;
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
            element={<Project user={user} />}
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
