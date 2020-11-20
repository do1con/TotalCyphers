import { delay, put, takeLatest, takeEvery, call } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";

export const DECREASE_TEST_ASYNC = "totalCyphers/DECREASE_TEST_ASYNC" as const;
export const DECREASE_TEST_ASYNC_SUCCESS = "totalCyphers/DECREASE_TEST_ASYNC_SUCCESS" as const;
export const SEARCH_USER_NICKNAME_REQUEST = "totalCyphers/SEARCH_USER_NICKNAME_REQUEST" as const;
export const SEARCH_USER_NICKNAME_SUCCESS = "totalCyphers/SEARCH_USER_NICKNAME_SUCCESS" as const;
export const SEARCH_USER_NICKNAME_FAILURE = "totalCyphers/SEARCH_USER_NICKNAME_FAILURE" as const;

// 액션 객체 타입
interface TotalCyphersPayloadAction {
  type: string;
  payload: {
    test: number;
  };
}
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
  | ReturnType<typeof decreaseTestAsync>
  | ReturnType<typeof searchUserSuccess>
  | ReturnType<typeof searchUserFailed>;

export const decreaseTestAsync = (data: number): TotalCyphersPayloadAction => ({
  type: DECREASE_TEST_ASYNC_SUCCESS,
  payload: {
    test: data,
  },
});
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

// sagas
function* decreaseTest(data: any) {
  yield delay(1000);
  yield put(decreaseTestAsync(data));
}
// 유저 닉네임으로 검색
export function* searchUserNickname(data: any) {
  yield searchByNickname(data.payload.nickname);
}

function searchByNicknameAPI(payload: any) {
  return axios.post("http://localhost:5000/proxy/totalcyphers/", payload);
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
    const result = yield call(searchByNicknameAPI, payloadData);
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

export default function* totalCyphersSaga() {
  yield takeLatest(DECREASE_TEST_ASYNC, decreaseTest);
  yield takeEvery(SEARCH_USER_NICKNAME_REQUEST, searchUserNickname);
}
