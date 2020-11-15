import { delay, put, takeLatest } from "redux-saga/effects";
import { types } from "util";

export const DECREASE_TEST_ASYNC = "totalCyphers/DECREASE_TEST_ASYNC" as const;
export const DECREASE_TEST_ASYNC_SUCCESS = "totalCyphers/DECREASE_TEST_ASYNC_SUCCESS" as const;

// 액션 객체 타입
interface TotalCyphersAction {
  type: string;
  payload: {
    test: number;
  };
}

export const decreaseTestAsync = (data: number): TotalCyphersAction => ({
  type: DECREASE_TEST_ASYNC_SUCCESS,
  payload: {
    test: data,
  },
});

// sagas
function* decreaseTest(data: any) {
  yield delay(1000);
  yield put(decreaseTestAsync(data));
}

export default function* totalCyphersSaga() {
  yield takeLatest(DECREASE_TEST_ASYNC, decreaseTest);
}
