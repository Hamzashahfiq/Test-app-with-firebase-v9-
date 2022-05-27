import { createStore , applyMiddleware } from "redux";
import thunk from "redux-thunk"
import RootReducer from "../store/reducer/RootReducer";

const Store  = createStore (RootReducer, applyMiddleware(thunk));

export default Store;