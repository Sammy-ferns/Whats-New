import "./App.css";
import React, { Component } from "react";
import Navbar from "./Navbar";
import News from "./News";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <News pageSize={5} country="in" category="general" />
      </div>
    );
  }
}
