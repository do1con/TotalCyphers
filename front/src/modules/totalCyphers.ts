import {
  SEARCH_USER_NICKNAME_REQUEST,
  SEARCH_USER_NICKNAME_SUCCESS,
  SEARCH_USER_NICKNAME_FAILURE,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  searchUserSuccess,
  searchUserFailed,
} from "./sagas";

// 액션 타입 선언
const RESET_SEARCHED_USER_LIST = "totalCyphers/RESET_SEARCHED_USER_LIST" as const;

// 액션 생성함수 선언
export const searchUserByNickname = (nickname: string) => ({
  type: SEARCH_USER_NICKNAME_REQUEST,
  payload: {
    nickname,
  },
});
export const getUserByUserId = (userId: string) => ({
  type: GET_USER_INFO_REQUEST,
  payload: {
    userId,
  },
});

export const resetSearchUserList = {
  type: RESET_SEARCHED_USER_LIST,
};

// 액션 객체 타입
type TotalCyphersAction =
  | ReturnType<typeof searchUserSuccess>
  | ReturnType<typeof searchUserFailed>;

// 기본값 타입
export type totalCypherState = {
  searchedPlayers: Array<any>;
  searchUserErrorReason: string;
  focusedUser: any;
};

// type searchedPlayersArray = {};

// 기본값
export const initialState: totalCypherState = {
  searchedPlayers: [],
  searchUserErrorReason: "",
  focusedUser: "",
};

// 리듀서
export default function totalCyphersReducer(
  state: totalCypherState = initialState,
  action: any
): totalCypherState {
  switch (action.type) {
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
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        focusedUser: action.payload.focusedUser,
      };
    }
    case RESET_SEARCHED_USER_LIST: {
      return {
        ...state,
        searchedPlayers: [],
      };
    }
    default:
      return state;
  }
}
