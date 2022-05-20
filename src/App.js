import Header from "./components/Header";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewProject from "./views/Projects/NewProject";
import Home from "./views/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/project/new" element={<NewProject />} exact />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
