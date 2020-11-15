import { combineReducers } from "redux";
import totalCyphers from "./totalCyphers";
import totalCyphersSaga from "./sagas";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  totalCyphers,
});

export function* rootSaga() {
  yield all([totalCyphersSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
