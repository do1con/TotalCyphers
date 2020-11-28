import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
        <Switch>
          <Route path="/" component={MainPageBody} exact />
          <Route exact path="/userInfo/:userId" component={UserInfo} />
          <Redirect
            exact
            from="/userInfo/:userId/reload"
            to="/userInfo/:userId"
          />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
