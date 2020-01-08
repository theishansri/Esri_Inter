import { combineReducers } from "redux"

import ItemReducer from './itemReducer';
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
const rootReducer=combineReducers({
    items:ItemReducer,
    error:errorReducer,
    auth:authReducer
})
export default rootReducer;