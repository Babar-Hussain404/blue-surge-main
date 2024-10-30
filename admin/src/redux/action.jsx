import {
  ALT_BAR_CONTACT_LOADING_STATE,
  ALT_SIDEBAR_STATE,
  CHANGE_BG_COLOR,
  CHAT_BOX_STATE,
  CHAT_BOX_TOGGLE_STATE,
  COMMENT_VIEW_STATE,
  EDIT_USER_ID,
  INDUSTRY_VIEW_STATE,
  LOGOUT_STATE,
  PAGINATION_PAGE_NUMBER,
  PAGINATION_REFRESH,
  POST_EDIT_VIEW_STATE,
  POST_IMAGE_STATE,
  POST_REFRESH,
  POST_SINGLE_IMAGE_STATE,
  PRODUCT_VIEW_STATE,
  RECIEVER_ID_ACTION,
  SERVICE_VIEW_STATE,
  SIDEBAR_STATE,
  SINGLE_MESSAGE,
  TEAM_MEMBER_VIEW_STATE,
  USER_STATE,
  CONTACT_ADDRESS_VIEW_STATE
} from "./constant";

export const changeBackgroundColor = (name) => {
  return {
    type: CHANGE_BG_COLOR,
    payload: name,
  };
};

export const logoutAction = (logoutState) => {
  return {
    type: LOGOUT_STATE,
    payload: logoutState,
  };
};
export const paginationPageNumberAction = (page) => {
  return {
    type: PAGINATION_PAGE_NUMBER,
    payload: page,
  };
};
export const paginationRefreshAction = (page) => {
  return {
    type: PAGINATION_REFRESH,
    payload: page,
  };
};
export const singleContactAction = (page) => {
  return {
    type: SINGLE_MESSAGE,
    payload: page,
  };
};

export const userAction = (userState) => {
  return {
    type: USER_STATE,
    payload: userState,
  };
};
export const editUserIdAction = (userState) => {
  return {
    type: EDIT_USER_ID,
    payload: userState,
  };
};
// chatbox
export const chatboxAction = (userState) => {
  return {
    type: CHAT_BOX_STATE,
    payload: userState,
  };
};
export const chatboxToggleAction = (userState) => {
  return {
    type: CHAT_BOX_TOGGLE_STATE,
    payload: userState,
  };
};
// chatbox
// sidebar
export const altSidebarAction = (userState) => {
  return {
    type: ALT_SIDEBAR_STATE,
    payload: userState,
  };
};
export const altSidebarContactLoadingAction = (userState) => {
  return {
    type: ALT_BAR_CONTACT_LOADING_STATE,
    payload: userState,
  };
};
export const sidebarAction = (userState) => {
  return {
    type: SIDEBAR_STATE,
    payload: userState,
  };
};

// messages
export const recieverIdAction = (userState) => {
  return {
    type: RECIEVER_ID_ACTION,
    payload: userState,
  };
};
export const postImagesAction = (userState) => {
  return {
    type: POST_IMAGE_STATE,
    payload: userState,
  };
};
export const postSingleImagesAction = (userState) => {
  return {
    type: POST_SINGLE_IMAGE_STATE,
    payload: userState,
  };
};
export const postRefresh = (userState) => {
  return {
    type: POST_REFRESH,
    payload: userState,
  };
};

export const postEditViewState = (poststate) => {
  // console.log("poststate",poststate)
  return {
    type: POST_EDIT_VIEW_STATE,
    payload: poststate,
  };
};

export const commentViewState = (commentstate) => {
  console.log("commentstate", commentstate);
  return {
    type: COMMENT_VIEW_STATE,
    payload: commentstate,
  };
};

export const industryViewState = (industrystate) => {
  console.log("industrystate", industrystate);
  return {
    type: INDUSTRY_VIEW_STATE,
    payload: industrystate,
  };
};
export const serviceViewState = (servicestate) => {
  console.log("industrystate", servicestate);
  return {
    type: SERVICE_VIEW_STATE,
    payload: servicestate,
  };
};
export const productViewState = (productstate) => {
  console.log("industrystate", productstate);
  return {
    type: PRODUCT_VIEW_STATE,
    payload: productstate,
  };
};
export const aboutTeamMeberState = (productstate) => {
  console.log("industrystate", productstate);
  return {
    type: TEAM_MEMBER_VIEW_STATE,
    payload: productstate,
  };
};
export const addressState = (productstate) => {
  console.log("industrystate", productstate);
  return {
    type: CONTACT_ADDRESS_VIEW_STATE,
    payload: productstate,
  };
};
