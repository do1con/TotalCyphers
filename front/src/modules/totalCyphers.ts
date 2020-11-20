import {
  DECREASE_TEST_ASYNC_SUCCESS,
  SEARCH_USER_NICKNAME_REQUEST,
  SEARCH_USER_NICKNAME_SUCCESS,
  SEARCH_USER_NICKNAME_FAILURE,
  decreaseTestAsync,
  searchUserSuccess,
  searchUserFailed,
} from "./sagas";

// 액션 타입 선언
export const ADD_TEST = "totalCyphers/ADD_TEST" as const;

// 액션 생성함수 선언
export const addTest = (test: number) => ({
  type: ADD_TEST,
  payload: {
    test,
  },
});
export const searchUserByNickname = (nickname: string) => ({
  type: SEARCH_USER_NICKNAME_REQUEST,
  payload: {
    nickname,
  },
});

// 액션 객체 타입
type TotalCyphersAction =
  | ReturnType<typeof addTest>
  | ReturnType<typeof decreaseTestAsync>
  | ReturnType<typeof searchUserSuccess>
  | ReturnType<typeof searchUserFailed>
  | ReturnType<typeof searchUserByNickname>;

// 기본값 타입
export type totalCypherState = {
  test: number;
  searchedPlayers: Array<any>;
  searchUserErrorReason: string;
};

// type searchedPlayersArray = {};

// 기본값
export const initialState: totalCypherState = {
  test: 0,
  searchedPlayers: [],
  searchUserErrorReason: "",
};

// 리듀서
export default function totalCyphersReducer(
  state: totalCypherState = initialState,
  action: any
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
    case SEARCH_USER_NICKNAME_SUCCESS: {
      return {
        ...state,
        searchedPlayers: action.payload.searchedPlayers,
      };
    }
    case SEARCH_USER_NICKNAME_FAILURE: {
      return {
        ...state,
        searchedPlayers: action.payload,
      };
    }
    default:
      return state;
  }
}
