import React from "react";
import "./App.css";
import Home from "./components/Home";
import ClaimForm from "./components/ClaimForm";
import ExecutionList from "./components/ExecutionList";
import ExecutionDetail from "./components/ExecutionDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/workflows/payment-claim" component={ExecutionList} />
        <Route path="/workflows/new-payment-claim" component={ClaimForm} />
        <Route path="/workflows/payment-claim/:id" component={ExecutionDetail} />
      </Router>
    </div>
  );
}

export default App;
