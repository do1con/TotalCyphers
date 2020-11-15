import { DECREASE_TEST_ASYNC_SUCCESS, decreaseTestAsync } from "./sagas";

// 액션 타입 선언
export const ADD_TEST = "totalCyphers/ADD_TEST" as const;

// 액션 생성함수 선언
export const addTest = (test: number) => ({
  type: ADD_TEST,
  payload: {
    test,
  },
});

// 액션 객체 타입
type TotalCyphersAction =
  | ReturnType<typeof addTest>
  | ReturnType<typeof decreaseTestAsync>;

// 기본값 타입
export type totalCypherState = {
  test: number;
};

// 기본값
export const initialState: totalCypherState = {
  test: 0,
};

// 리듀서
export default function totalCyphersReducer(
  state: totalCypherState = initialState,
  action: TotalCyphersAction
): totalCypherState {
  switch (action.type) {
    case ADD_TEST: {
      return {
        ...state,
        test: state.test + action.payload.test,
      };
    }
    case DECREASE_TEST_ASYNC_SUCCESS: {
      return {
        ...state,
        test: state.test - action.payload.test,
      };
    }
    default:
      return state;
  }
}
