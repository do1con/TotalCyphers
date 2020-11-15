import { combineReducers } from "redux";
import totalCyphers from "./totalCyphers";

const rootReducer = combineReducers({
  totalCyphers,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
