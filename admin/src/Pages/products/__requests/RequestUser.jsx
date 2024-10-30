import { ApiFetchReq } from "../../../api/ApiRequest"

export const getProductReq = async (page) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/product?page=${page}`)
}
export const getSingleProductReq = async (id) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/product/${id}`)
}  

export const postProductReq = async (data) => {
  return await ApiFetchReq('POST', `${process.env.REACT_APP_BASE_URL}/product`, data)
}
export const editProductReq = async (id,data) => {
  return await ApiFetchReq('PUT', `${process.env.REACT_APP_BASE_URL}/product/${id}`, data)
}

export const deleteProductReq = async (id) => {
  return await ApiFetchReq('DELETE', `${process.env.REACT_APP_BASE_URL}/product/${id}`)
}