import React from "react";
import Navbar from "./Navbar";
import News from "./News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<News pageSize={8} country="in" category="general" />}
          />
          <Route
            path="/business"
            element={<News pageSize={8} country="in" category="business" />}
          />
          <Route
            path="/entertainment"
            element={
              <News pageSize={8} country="in" category="entertainment" />
            }
          />
          <Route
            path="/health"
            element={<News pageSize={8} country="in" category="health" />}
          />
          <Route
            path="/science"
            element={<News pageSize={8} country="in" category="science" />}
          />
          <Route
            path="/sports"
            element={<News pageSize={8} country="in" category="sports" />}
          />
          <Route
            path="/technology"
            element={<News pageSize={8} country="in" category="technology" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
