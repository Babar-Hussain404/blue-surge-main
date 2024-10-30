
import {
  ABOUT_DATA,
  PAGE_NUMBER,
  PAGE_NUMBER_Refresh,
  HOME_SERVICES_DATA,
  TECHNOLOGY_DATA,
  MAIL_DATA,
  READ_MORE_BTN
} from './constant';


export const pageNumber= (page) => {
    return {
      type: PAGE_NUMBER,
      payload: page,
    };
  };
export const readMoreBtnState= (page) => {
    return {
      type: READ_MORE_BTN,
      payload: page,
    };
  };

export const pageNumberRefresh= (page) => {
    return {
      type: PAGE_NUMBER_Refresh,
      payload: page,
    };
  };
export const aboutDataDispatcher = (aboutdata) => {
    return {
      type: ABOUT_DATA,
      payload: aboutdata,
    };
  };
export const homeServicesData = (service) => {
    return {
      type: HOME_SERVICES_DATA,
      payload: service,
    };
  };
export const technologyData = (service) => {
    return {
      type: TECHNOLOGY_DATA,
      payload: service,
    };
  };
export const mailData = (service) => {
    return {
      type: MAIL_DATA,
      payload: service,
    };
  };
