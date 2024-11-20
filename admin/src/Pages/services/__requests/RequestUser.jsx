import { ApiFetchReq } from "../../../api/ApiRequest"

export const getIndustryReq = async (page) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/service?page=${page}`)
}
export const getSingleServiceReq = async (id) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/service/${id}`)
}
export const getServiceOptionReq = async (id) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/service/option/${id}`)
}

export const postServiceReq = async (data) => {
  return await ApiFetchReq('POST', `${process.env.REACT_APP_BASE_URL}/service`, data)
}

export const putServiceReq = async (id, data) => {
  return await ApiFetchReq('PUT', `${process.env.REACT_APP_BASE_URL}/service/${id}`, data)
}

export const deleteIndustryReq = async (id) => {
  return await ApiFetchReq('DELETE', `${process.env.REACT_APP_BASE_URL}/service/${id}`)
}