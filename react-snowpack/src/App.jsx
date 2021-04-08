import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Pub, Sub } from "./message";
const App = () => {
  return (
    <BrowserRouter>
      <Route path="/send" component={Pub} />
      <Route path="/get" component={Sub} />
      <Link to="/send">SendMESSAGE</Link>
      <br />
      <Link to="/get">GETMESSAGE</Link>
    </BrowserRouter>
  );
};

export default App;
