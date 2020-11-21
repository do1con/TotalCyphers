import { delay, put, takeLatest, takeEvery, call } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";

export const SEARCH_USER_NICKNAME_REQUEST = "totalCyphers/SEARCH_USER_NICKNAME_REQUEST" as const;
export const SEARCH_USER_NICKNAME_SUCCESS = "totalCyphers/SEARCH_USER_NICKNAME_SUCCESS" as const;
export const SEARCH_USER_NICKNAME_FAILURE = "totalCyphers/SEARCH_USER_NICKNAME_FAILURE" as const;
export const GET_USER_INFO_REQUEST = "totalCyphers/GET_USER_INFO_REQUEST" as const;
export const GET_USER_INFO_SUCCESS = "totalCyphers/GET_USER_INFO_SUCCESS" as const;
export const GET_USER_INFO_FAILURE = "totalCyphers/GET_USER_INFO_FAILURE" as const;

// 액션 객체 타입
interface TotalCyphersNoPayloadAction {
  type: string;
}

interface TotalCyphersSuccessSearchUser {
  type: string;
  payload: {
    playerId: string;
    nickname: string;
    grade: number;
  };
}

type TotalCyphersAction =
  | ReturnType<typeof searchUserSuccess>
  | ReturnType<typeof searchUserFailed>;

// 응답 액션 정의
// 유저 닉네임으로 검색
export const searchUserSuccess = (data: any) => ({
  type: SEARCH_USER_NICKNAME_SUCCESS,
  payload: {
    searchedPlayers: data.rows,
  },
});
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
      url: `http://localhost:5000/proxy/totalcyphers`,
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
      url: `http://localhost:5000/proxy/totalcyphers`,
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

// API 요청 통일 됨
function callAPI(payload: any) {
  return axios.post("http://localhost:5000/proxy/totalcyphers/", payload);
}

export default function* totalCyphersSaga() {
  yield takeLatest(SEARCH_USER_NICKNAME_REQUEST, searchUserNickname);
  yield takeLatest(GET_USER_INFO_REQUEST, getUserInfo);
}
