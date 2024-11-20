import { ApiFetchReq } from "../../../../api/ApiRequest"

 

// http://localhost:5000/social/post
export const getPostsReq = async () => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/social/post`)
}


export const addPostReq = async (id,formData) => {
  return await ApiFetchReq('POST', `${process.env.REACT_APP_BASE_URL}/social/post/${id}`,formData)
}

export const deletePostReq = async (id) => {
  return await ApiFetchReq('DELETE', `${process.env.REACT_APP_BASE_URL}/social/post/single/${id}`)
}

export const singlePostReq = async (id) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/social/post/single/${id}`)
}

export const updatePostReq = async (id,formData) => {
  return await ApiFetchReq('PUT', `${process.env.REACT_APP_BASE_URL}/social/post/single/${id}`,formData)
}

export const updateLikeReq = async (id,formData) => {
  return await ApiFetchReq('PUT', `${process.env.REACT_APP_BASE_URL}/social/post/likes/${id}`,formData)
}

//comment Requests
export const addPostCommentReq = async (postEditState,id,formData) => {
  return await ApiFetchReq('POST', `${process.env.REACT_APP_BASE_URL}/post/comments/${postEditState}/${id}`,formData)
}

export const getCommentsReq = async (id) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/post/comments/${id}`)
}

export const singleCommentReq = async (id) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/post/comments/single/${id}`)
}

export const updateCommentReq = async (id,formData) => {
  return await ApiFetchReq('PUT', `${process.env.REACT_APP_BASE_URL}/post/comments/single/edit/${id}`,formData)
}

export const deleteCommentReq = async (id) => {
  return await ApiFetchReq('DELETE', `${process.env.REACT_APP_BASE_URL}/post/comments/single/${id}`)
}