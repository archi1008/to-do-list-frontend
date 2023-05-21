import { createStore,applyMiddleware } from "redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import RootReducer from "./rootReducer";

const middleWare = [thunk];

if(process.env.NODE_ENV === "developement"){
    middleWare.push(logger);
}

const store = createStore(RootReducer,applyMiddleware(...middleWare));

export default store;

