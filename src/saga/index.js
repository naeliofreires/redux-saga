import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// Watcher Saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// Function that makes the api request and returns a Promise for response
function fetchUser(user) {
  return axios({
    method: "get",
    url: `https://api.github.com/users/${user}`
  });
}

// Worker Saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
  try {
    const response = yield call(fetchUser, action.user);
    const user = response.data;

    // dispatch a success action to the store with the new user
    yield put({ type: "API_CALL_SUCCESS", user });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}
