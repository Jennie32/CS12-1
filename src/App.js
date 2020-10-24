import React from "react";
import "./App.css";
import ClaimForm from "./components/ClaimForm";
import ExecutionList from "./components/ExecutionList";
import ExecutionDetail from "./components/ExecutionDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={ClaimForm} />
        <Route path="/execution-list" component={ExecutionList} />
        <Route path="/execution-detail" component={ExecutionDetail} />
      </Router>
    </div>
  );
}

export default App;
