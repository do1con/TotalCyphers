import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

export const SEARCH_USER_NICKNAME_REQUEST = "totalCyphers/SEARCH_USER_NICKNAME_REQUEST" as const;
export const SEARCH_USER_NICKNAME_SUCCESS = "totalCyphers/SEARCH_USER_NICKNAME_SUCCESS" as const;
export const SEARCH_USER_NICKNAME_FAILURE = "totalCyphers/SEARCH_USER_NICKNAME_FAILURE" as const;
export const GET_USER_INFO_REQUEST = "totalCyphers/GET_USER_INFO_REQUEST" as const;
export const GET_USER_INFO_SUCCESS = "totalCyphers/GET_USER_INFO_SUCCESS" as const;
export const GET_USER_INFO_FAILURE = "totalCyphers/GET_USER_INFO_FAILURE" as const;
export const GET_USER_PLAYLIST_REQUEST = "totalCyphers/GET_USER_PLAYLIST_REQUEST" as const;
export const GET_USER_PLAYLIST_SUCCESS = "totalCyphers/GET_USER_PLAYLIST_SUCCESS" as const;
export const GET_USER_PLAYLIST_FAILURE = "totalCyphers/GET_USER_PLAYLIST_FAILURE" as const;
export const GET_GAME_DETAIL_REQUEST = "totalCyphers/GET_GAME_DETAIL_REQUEST" as const;
export const GET_GAME_DETAIL_SUCCESS = "totalCyphers/GET_GAME_DETAIL_SUCCESS" as const;
export const GET_GAME_DETAIL_FAILURE = "totalCyphers/GET_GAME_DETAIL_FAILURE" as const;

// 응답 액션 정의
// 유저 닉네임으로 검색
export const searchUserSuccess = (data: any) => {
  return {
    type: SEARCH_USER_NICKNAME_SUCCESS,
    payload: {
      searchedPlayers: data.rows,
    },
  };
};
export const searchUserFailed = (err: any) => ({
  type: SEARCH_USER_NICKNAME_FAILURE,
  payload: {
    searchUserErrorReason: err,
  },
});
// 특정 유저 정보 요청
export const getUserInfoFailed = (err: any) => ({
  type: GET_USER_INFO_FAILURE,
  payload: {
    getUserInfoErrorReason: err,
  },
});

// sagas
// 특정 유저 정보 요청
export function* getUserInfo(data: any) {
  yield getUserById(data.payload.userId);
}
function* getUserById(data: string) {
  try {
    const payloadData = {
      method: "post",
      data: {
        reqMethod: "getUserInfoById",
        payload: {
          userId: data,
        },
      },
    };
    const result = yield call(callAPI, payloadData);
    yield put({
      type: GET_USER_INFO_SUCCESS,
      payload: {
        focusedUser: result.data,
      },
    });
  } catch (error) {
    yield put(getUserInfoFailed(error));
  }
}

// 유저 닉네임으로 검색
export function* searchUserNickname(data: any) {
  yield searchByNickname(data.payload.nickname);
}

function* searchByNickname(data: string) {
  try {
    const payloadData = {
      method: "post",
      data: {
        reqMethod: "getUserByNickname",
        payload: {
          nickname: data,
          wordType: "full",
        },
      },
    };
    const result = yield call(callAPI, payloadData);
    yield put({
      type: SEARCH_USER_NICKNAME_SUCCESS,
      payload: {
        searchedPlayers: result.data.rows,
      },
    });
  } catch (error) {
    yield put(searchUserFailed(error));
  }
}

// 유저 전적 검색
function* getPlayList(data: any) {
  yield getPlayListByUserId(
    data.payload.userId,
    data.payload.playType,
    data.payload.searchStartRange,
    data.payload.searchEndRange
  );
}
function* getPlayListByUserId(
  userId: string,
  playType: string,
  searchStartRange: string,
  searchEndRange: string
) {
  try {
    const payloadData = {
      method: "post",
      data: {
        reqMethod: "getUserPlayList",
        payload: {
          userId,
          playType,
          searchStartRange,
          searchEndRange,
        },
      },
    };
    const result = yield call(callAPI, payloadData);
    yield put({
      type: GET_USER_PLAYLIST_SUCCESS,
      payload: {
        playedRecords: result.data.matches.rows,
      },
    });
  } catch (error) {
    yield put({
      type: GET_USER_PLAYLIST_FAILURE,
      payload: {
        getUserPlaylistFailReason: error,
      },
    });
  }
}
// 게임전적 디테일
function* getGameDetail(data: any) {
  yield getGameDetailByMatchId(data.payload.matchId);
}
function* getGameDetailByMatchId(matchId: string) {
  try {
    const payloadData = {
      method: "post",
      data: {
        reqMethod: "getGameDetail",
        payload: {
          matchId,
        },
      },
    };
    const result = yield call(callAPI, payloadData);
    yield put({
      type: GET_GAME_DETAIL_SUCCESS,
      payload: {
        matchId,
        playedRecords: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: GET_GAME_DETAIL_FAILURE,
      payload: {
        matchId,
        getGameDetailFailReason: error,
      },
    });
  }
}

// API 요청 통일 됨
function callAPI(payload: any) {
  return axios.post(
    "https://total-cyphers.herokuapp.com/proxy/totalcyphers",
    payload
  );
}

export default function* totalCyphersSaga() {
  yield takeLatest(SEARCH_USER_NICKNAME_REQUEST, searchUserNickname);
  yield takeLatest(GET_USER_INFO_REQUEST, getUserInfo);
  yield takeLatest(GET_USER_PLAYLIST_REQUEST, getPlayList);
  yield takeLatest(GET_GAME_DETAIL_REQUEST, getGameDetail);
}
