import Header from "./components/Header";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewProject from "./views/Projects/NewProject";
import Project from "./views/Projects/Project";
import Home from "./views/Home";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  let [user, setUser] = useState({
    email: "",
  });

  useEffect(() => {
    const getUser = async () => {
      // TODO: Update request URL
      let url = "http://127.0.0.1/api/user/";
      console.log("Getting current user...");
      try {
        const res = await axios.get(url);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/project/:projectId" element={<Project />} exact />
          <Route path="/project/new" element={<NewProject />} exact />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
