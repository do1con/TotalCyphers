import { delay, put, takeLatest, takeEvery } from "redux-saga/effects";
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
export const searchUserSuccess = (
  data: any
): TotalCyphersSuccessSearchUser => ({
  type: SEARCH_USER_NICKNAME_SUCCESS,
  payload: {
    playerId: data.rows[0].playerId,
    nickname: data.rows[0].nickname,
    grade: data.rows[0].grade,
  },
});
export const searchUserFailed = () => ({
  type: SEARCH_USER_NICKNAME_FAILURE,
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

function* searchByNickname(data: string) {
  try {
    const result: AxiosResponse = yield axios.get(
      `cy/players?nickname=굿치면뎐짐&wordType=full&apikey=비밀`
    );
    console.log(result);
    yield put(searchUserSuccess(result));
  } catch (error) {
    yield put(searchUserFailed());
  }
}

export default function* totalCyphersSaga() {
  yield takeLatest(DECREASE_TEST_ASYNC, decreaseTest);
  yield takeEvery(SEARCH_USER_NICKNAME_REQUEST, searchUserNickname);
}
