import {
    PAGE_NUMBER,
    PAGE_NUMBER_Refresh,
    ABOUT_DATA,
    HOME_SERVICES_DATA,
    TECHNOLOGY_DATA,
    MAIL_DATA,
    READ_MORE_BTN
} from './constant'

export const PageNumberReducer = (state = [], action) => {
    if (action.type === PAGE_NUMBER) {
      return action.payload;
    } else {
      return state;
    }
  };
export const readMoreBtnReducer = (state = [], action) => {
    if (action.type === READ_MORE_BTN) {
      return action.payload;
    } else {
      return state;
    }
  };
export const PageNumberRefreshReducer = (state = [], action) => {
    if (action.type === PAGE_NUMBER_Refresh) {
      return action.payload;
    } else {
      return state;
    }
  };
export const aboutDataReducer = (state = [], action) => {
    if (action.type === ABOUT_DATA) {
      return action.payload;
    } else {
      return state;
    }
  };
export const homeServicesReducer = (state = [], action) => {
    if (action.type === HOME_SERVICES_DATA) {
      return action.payload;
    } else {
      return state;
    }
  };
export const technologyReducer = (state = [], action) => {
    if (action.type === TECHNOLOGY_DATA) {
      return action.payload;
    } else {
      return state;
    }
  };
export const mailReducer = (state = [], action) => {
    if (action.type === MAIL_DATA) {
      return action.payload;
    } else {
      return state;
    }
  };
