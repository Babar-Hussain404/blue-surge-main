import { ApiFetchReq } from "../../../api/ApiRequest"

export const getProductReq = async (page) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/product?page=${page}`)
}
export const getSingleProductReq = async (id) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/product/${id}`)
}  

export const postProductReq = async (data) => {
  return await ApiFetchReq('POST', `https://web.bluesurge.com.pk/product`, data)
}
export const editProductReq = async (id,data) => {
  return await ApiFetchReq('PUT', `https://web.bluesurge.com.pk/product/${id}`, data)
}

export const deleteProductReq = async (id) => {
  return await ApiFetchReq('DELETE', `https://web.bluesurge.com.pk/product/${id}`)
}