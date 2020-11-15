import React, { useEffect, useCallback } from "react";
import { addTest, ADD_TEST } from "./modules/totalCyphers";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./modules";

function App(): JSX.Element {
  const test = useSelector((state: RootState) => state.totalCyphers.test);
  const dispatch = useDispatch();
  const onClickBtn = useCallback(() => {
    dispatch(addTest(3));
  }, [dispatch, ADD_TEST]);
  useEffect(() => {
    console.log(addTest);
    console.log(test);
  });
  return (
    <div className="App">
      <p>스테이트 : {test}</p>
      <button onClick={onClickBtn}>테스트 액션트리거</button>
    </div>
  );
}

export default App;
