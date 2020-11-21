import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import Header from "./Layout/Header";
import MainPageBody from "./Layout/MainPageBody";
import Footer from "./Layout/Footer";
import UserInfo from "./inc/UserInfo";

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route path="/" component={MainPageBody} exact />
        <Route path="/userInfo" component={UserInfo} />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
