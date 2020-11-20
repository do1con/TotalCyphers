import React, { useEffect, useCallback } from "react";
import { addTest } from "./modules/totalCyphers";
import { decreaseTestAsync } from "./modules/sagas";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { RootState } from "./modules";
import "antd/dist/antd.css";
import Header from "./Layout/Header";
import MainPageBody from "./Layout/MainPageBody";
import Footer from "./Layout/Footer";
import TestComp from "./inc/TestComp";

function App(): JSX.Element {
  const test = useSelector((state: RootState) => state.totalCyphers.test);
  const dispatch = useDispatch();
  const onClickIncBtn = useCallback(() => {
    dispatch(addTest(3));
  }, [dispatch, addTest]);
  useEffect(() => {
    console.log(addTest);
    console.log(test);
  });
  const onClickDecBtn = useCallback(() => {
    dispatch(decreaseTestAsync(2));
  }, [dispatch, decreaseTestAsync]);
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Route path="/" component={MainPageBody} exact />
        <Route path="/test" component={TestComp} exact />
        {/* <p>스테이트 : {test}</p>
      <button onClick={onClickIncBtn}>테스트 액션트리거</button>
      <button onClick={onClickDecBtn}>테스트 사가액션 트리거</button> */}
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
