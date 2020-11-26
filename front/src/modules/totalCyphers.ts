import {
  SEARCH_USER_NICKNAME_REQUEST,
  SEARCH_USER_NICKNAME_SUCCESS,
  SEARCH_USER_NICKNAME_FAILURE,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  GET_USER_PLAYLIST_REQUEST,
  GET_USER_PLAYLIST_SUCCESS,
  GET_USER_PLAYLIST_FAILURE,
  GET_GAME_DETAIL_REQUEST,
  GET_GAME_DETAIL_SUCCESS,
  GET_GAME_DETAIL_FAILURE,
  searchUserSuccess,
  searchUserFailed,
} from "./sagas";

// 액션 타입 선언
const RESET_SEARCHED_USER_LIST = "totalCyphers/RESET_SEARCHED_USER_LIST" as const;
const SET_CURRENT_URL = "totalCyphers/SET_CURRENT_URL" as const;

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
export const getUserPlayList = (
  userId: string,
  playType: string,
  searchStartRange: string,
  searchEndRange: string
) => ({
  type: GET_USER_PLAYLIST_REQUEST,
  payload: {
    userId,
    playType,
    searchStartRange,
    searchEndRange,
  },
});
export const getGameDetail = (matchId: string) => ({
  type: GET_GAME_DETAIL_REQUEST,
  payload: {
    matchId,
  },
});

export const resetSearchUserList = {
  type: RESET_SEARCHED_USER_LIST,
};

export const setCurrentUrl = (currentUrl: string) => ({
  type: SET_CURRENT_URL,
  payload: {
    url: currentUrl,
  },
});

// 액션 객체 타입
type TotalCyphersAction =
  | ReturnType<typeof searchUserSuccess>
  | ReturnType<typeof searchUserFailed>;

// 기본값 타입
export type totalCypherState = {
  searchedPlayers: Array<any>;
  searchUserErrorReason: string;
  focusedUser: any;
  playedRecords: Array<any>;
  getUserPlaylistFailReason: string;
  getUserInfoFailReason: string;
  currentUrl: string;
};

// type searchedPlayersArray = {};

// 기본값
export const initialState: totalCypherState = {
  searchedPlayers: [],
  searchUserErrorReason: "",
  focusedUser: "",
  playedRecords: [],
  getUserPlaylistFailReason: "",
  getUserInfoFailReason: "",
  currentUrl: "",
};

// 리듀서
export default function totalCyphersReducer(
  state: totalCypherState = initialState,
  action: any
): totalCypherState {
  switch (action.type) {
    case SET_CURRENT_URL: {
      return {
        ...state,
        currentUrl: action.payload.url,
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
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        focusedUser: action.payload.focusedUser,
      };
    }
    case GET_USER_INFO_FAILURE: {
      return {
        ...state,
        getUserInfoFailReason: action.payload.getUserInfoErrorReason,
      };
    }
    case RESET_SEARCHED_USER_LIST: {
      return {
        ...state,
        searchedPlayers: [],
      };
    }
    case GET_USER_PLAYLIST_SUCCESS: {
      return {
        ...state,
        playedRecords: action.payload.playedRecords,
      };
    }
    case GET_USER_PLAYLIST_FAILURE: {
      return {
        ...state,
        getUserPlaylistFailReason: action.payload.getUserPlaylistFailReason,
      };
    }
    case GET_GAME_DETAIL_SUCCESS: {
      return {
        ...state,
        playedRecords: state.playedRecords.map((data, index) =>
          data.matchId === action.payload.matchId
            ? { ...data, matchDetail: action.payload.playedRecords }
            : data
        ),
      };
    }
    default:
      return state;
  }
}
