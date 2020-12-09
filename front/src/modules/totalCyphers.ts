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
export const searchedPlayersReset = {
  type: "SEARCHED_PLAYERS_RESET",
};
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
  searchingUser: boolean;
  searchUserErrorReason: string;
  focusedUser: any;
  focusingUser: boolean;
  gettingUserPlaylist: boolean;
  playedRecords: Array<any>;
  getUserPlaylistFailReason: string;
  getUserInfoFailReason: string;
  currentUrl: string;
};

// type searchedPlayersArray = {};

// 기본값
export const initialState: totalCypherState = {
  searchedPlayers: [],
  searchingUser: false,
  searchUserErrorReason: "",
  focusedUser: "",
  focusingUser: false,
  gettingUserPlaylist: false,
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
    case SEARCH_USER_NICKNAME_REQUEST: {
      return {
        ...state,
        searchingUser: true,
        searchedPlayers: [],
      };
    }
    case SEARCH_USER_NICKNAME_SUCCESS: {
      return {
        ...state,
        searchingUser: false,
        searchedPlayers: action.payload.searchedPlayers,
      };
    }
    case SEARCH_USER_NICKNAME_FAILURE: {
      return {
        ...state,
        searchingUser: false,
        searchedPlayers: action.payload,
      };
    }
    case "SEARCHED_PLAYERS_RESET": {
      return {
        ...state,
        searchedPlayers: [],
      };
    }
    case GET_USER_INFO_REQUEST: {
      return {
        ...state,
        focusingUser: true,
      };
    }
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        focusedUser: action.payload.focusedUser,
        focusingUser: false,
      };
    }
    case GET_USER_INFO_FAILURE: {
      return {
        ...state,
        getUserInfoFailReason: action.payload.getUserInfoErrorReason,
        focusingUser: false,
      };
    }
    case RESET_SEARCHED_USER_LIST: {
      return {
        ...state,
        searchedPlayers: [],
      };
    }
    case GET_USER_PLAYLIST_REQUEST: {
      return {
        ...state,
        gettingUserPlaylist: true,
      };
    }
    case GET_USER_PLAYLIST_SUCCESS: {
      return {
        ...state,
        playedRecords: action.payload.playedRecords,
        gettingUserPlaylist: false,
      };
    }
    case GET_USER_PLAYLIST_FAILURE: {
      return {
        ...state,
        getUserPlaylistFailReason: action.payload.getUserPlaylistFailReason,
        gettingUserPlaylist: false,
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
    case GET_GAME_DETAIL_FAILURE: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
