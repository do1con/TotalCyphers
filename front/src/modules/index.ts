import { combineReducers } from "redux";
import totalCyphers from "./totalCyphers";
import totalCyphersSaga from "./sagas";
import { all, AllEffect, ForkEffect } from "redux-saga/effects";

const rootReducer = combineReducers({
  totalCyphers,
});

export function* rootSaga(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  void,
  unknown
> {
  yield all([totalCyphersSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
