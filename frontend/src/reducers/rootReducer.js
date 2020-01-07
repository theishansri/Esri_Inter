import { combineReducers } from "redux"

import ItemReducer from './itemReducer';

const rootReducer=combineReducers({
    items:ItemReducer
})
export default rootReducer;