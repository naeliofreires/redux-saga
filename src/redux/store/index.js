import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import reducers from "../reducers/index";
import { watcherSaga } from "../../saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  compose(applyMiddleware(sagaMiddleware, ReduxThunk))
);

sagaMiddleware.run(watcherSaga);

export default store;
