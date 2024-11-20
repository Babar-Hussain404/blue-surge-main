import { ApiFetchReq } from "../../../api/ApiRequest"

export const getIndustryReq = async (page) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/industry?page=${page}`)
}
export const getSingleIndustryReq = async (id) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/industry/${id}`)
}

export const geIndustryOptionsReq = async (id) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/industry/options`)
}

export const postIndustryReq = async (data) => {
  return await ApiFetchReq('POST', `${process.env.REACT_APP_BASE_URL}/industry`, data)
}
export const putIndustryReq = async (id, data) => {
  return await ApiFetchReq('PUT', `${process.env.REACT_APP_BASE_URL}/industry/${id}`, data)
}

export const deleteIndustryReq = async (id) => {
  return await ApiFetchReq('DELETE', `${process.env.REACT_APP_BASE_URL}/industry/${id}`)
}

