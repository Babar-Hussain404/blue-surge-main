import {
  ALT_BAR_CONTACT_LOADING_STATE,
  ALT_SIDEBAR_STATE,
  CHANGE_BG_COLOR,
  CHAT_BOX_STATE,
  CHAT_BOX_TOGGLE_STATE,
  LOGOUT_STATE,
  POST_IMAGE_STATE,
  POST_SINGLE_IMAGE_STATE,
  RECIEVER_ID_ACTION,
  SIDEBAR_STATE,
  USER_STATE,
  POST_REFRESH,
  POST_EDIT_VIEW_STATE,
  COMMENT_VIEW_STATE,
  PAGINATION_PAGE_NUMBER,
  PAGINATION_REFRESH,
  SINGLE_MESSAGE,
  INDUSTRY_VIEW_STATE,
  SERVICE_VIEW_STATE,
  PRODUCT_VIEW_STATE,
  EDIT_USER_ID,
  TEAM_MEMBER_VIEW_STATE,
  CONTACT_ADDRESS_VIEW_STATE
} from "./constant";

export const changeBackgroundColorReducer = (state = [], action) => {
  if (action.type === CHANGE_BG_COLOR) {
    return action.payload;
  } else {
    return state;
  }
};

export const logoutReducer = (state = [], action) => {
  if (action.type === LOGOUT_STATE) {
    if (action.payload === "") {
      action.payload = false;
    }
    return action.payload;
  } else {
    return state;
  }
};
export const paginationPageNumberReducer = (state = [], action) => {
  if (action.type === PAGINATION_PAGE_NUMBER) {
    return action.payload;
  } else {
    return state;
  }
};
export const editUserIdReducer = (state = [], action) => {
  if (action.type === EDIT_USER_ID) {
    return action.payload;
  } else {
    return state;
  }
};
export const paginationRefreshReducer = (state = [], action) => {
  if (action.type === PAGINATION_REFRESH) {
    return action.payload;
  } else {
    return state;
  }
};
export const singleContactReducer = (state = [], action) => {
  if (action.type === SINGLE_MESSAGE) {
    return action.payload;
  } else {
    return state;
  }
};

export const loginUserReducer = (state = [], action) => {
  if (action.type === USER_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const chatboxReducer = (state = [], action) => {
  if (action.type === CHAT_BOX_STATE) {
    return action.payload;
  } else {
    return state;
  }
};

export const chatboxToggleReducer = (state = [], action) => {
  if (action.type === CHAT_BOX_TOGGLE_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const altSidebarReducer = (state = [], action) => {
  if (action.type === ALT_SIDEBAR_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const altbarContactLoadingReducer = (state = [], action) => {
  if (action.type === ALT_BAR_CONTACT_LOADING_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const sidebarReducer = (state = [], action) => {
  if (action.type === SIDEBAR_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const recieverIdReducer = (state = [], action) => {
  if (action.type === RECIEVER_ID_ACTION) {
    return action.payload;
  } else {
    return state;
  }
};
export const postImageReducer = (state = [], action) => {
  if (action.type === POST_IMAGE_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const postSingleImageReducer = (state = [], action) => {
  if (action.type === POST_SINGLE_IMAGE_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const postRefreshReducer = (state = [], action) => {
  if (action.type === POST_REFRESH) {
    return action.payload;
  } else {
    return state;
  }
};
export const postEditState = (state = [], action) => {
  if (action.type === POST_EDIT_VIEW_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const commentState = (state = [], action) => {
  if (action.type === COMMENT_VIEW_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const industrytStateReducer = (state = [], action) => {
  if (action.type === INDUSTRY_VIEW_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const serviceStateReducer = (state = [], action) => {
  if (action.type === SERVICE_VIEW_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const productStateReducer = (state = [], action) => {
  if (action.type === PRODUCT_VIEW_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const teamMemberStateReducer = (state = [], action) => {
  if (action.type === TEAM_MEMBER_VIEW_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const addressStateReducer = (state = [], action) => {
  if (action.type === CONTACT_ADDRESS_VIEW_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
