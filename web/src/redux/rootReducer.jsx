import { combineReducers } from "redux";
import {
    PageNumberReducer,
    PageNumberRefreshReducer,
    aboutDataReducer,
    homeServicesReducer,
    technologyReducer,
    mailReducer,
    readMoreBtnReducer
} from "./reducer";

const rootRed = combineReducers({
    PageNumberReducer,
    PageNumberRefreshReducer,
    aboutDataReducer,
    homeServicesReducer,
    technologyReducer,
    mailReducer,
    readMoreBtnReducer
});

export default rootRed;
