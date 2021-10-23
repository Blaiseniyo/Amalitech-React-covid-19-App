import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./reducers";
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

const middlewares = [reduxImmutableStateInvariant(),thunk];

const initialState= {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;

const Store = process.env.NODE_ENV === 'production' ? createStore(
    RootReducer,
    initialState,
    applyMiddleware(...middlewares)
  ) : createStore(
    RootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  export default Store;