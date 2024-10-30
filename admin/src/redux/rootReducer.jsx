import { combineReducers } from "redux";
import {
  loginUserReducer,
  paginationPageNumberReducer,
  paginationRefreshReducer,
  singleContactReducer,
  editUserIdReducer,
  logoutReducer,
  changeBackgroundColorReducer,
  chatboxReducer,
  chatboxToggleReducer,
  altSidebarReducer,
  sidebarReducer,
  altbarContactLoadingReducer,
  recieverIdReducer,
  postImageReducer,
  postSingleImageReducer,
  postRefreshReducer,
  postEditState,
  commentState,
  industrytStateReducer,
  serviceStateReducer,
  productStateReducer,
  teamMemberStateReducer,
  addressStateReducer
} from "./reducer";

const rootRed = combineReducers({
  loginUserReducer,
  paginationPageNumberReducer,
  paginationRefreshReducer,
  singleContactReducer,
  editUserIdReducer,
  changeBackgroundColorReducer,
  logoutReducer,
  chatboxReducer,
  chatboxToggleReducer,
  altSidebarReducer,
  sidebarReducer,
  altbarContactLoadingReducer,
  recieverIdReducer,
  postImageReducer,
  postSingleImageReducer,
  postRefreshReducer,
  postEditState,
  commentState,
  industrytStateReducer,
  serviceStateReducer,
  productStateReducer,
  teamMemberStateReducer,
  addressStateReducer
});

export default rootRed;
