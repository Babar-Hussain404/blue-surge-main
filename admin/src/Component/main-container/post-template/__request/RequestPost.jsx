import { ApiFetchReq } from "../../../../api/ApiRequest"

 

// http://localhost:5000/social/post
export const getPostsReq = async () => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/social/post`)
}


export const addPostReq = async (id,formData) => {
  return await ApiFetchReq('POST', `https://web.bluesurge.com.pk/social/post/${id}`,formData)
}

export const deletePostReq = async (id) => {
  return await ApiFetchReq('DELETE', `https://web.bluesurge.com.pk/social/post/single/${id}`)
}

export const singlePostReq = async (id) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/social/post/single/${id}`)
}

export const updatePostReq = async (id,formData) => {
  return await ApiFetchReq('PUT', `https://web.bluesurge.com.pk/social/post/single/${id}`,formData)
}

export const updateLikeReq = async (id,formData) => {
  return await ApiFetchReq('PUT', `https://web.bluesurge.com.pk/social/post/likes/${id}`,formData)
}

//comment Requests
export const addPostCommentReq = async (postEditState,id,formData) => {
  return await ApiFetchReq('POST', `https://web.bluesurge.com.pk/post/comments/${postEditState}/${id}`,formData)
}

export const getCommentsReq = async (id) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/post/comments/${id}`)
}

export const singleCommentReq = async (id) => {
  return await ApiFetchReq('GET', `https://web.bluesurge.com.pk/post/comments/single/${id}`)
}

export const updateCommentReq = async (id,formData) => {
  return await ApiFetchReq('PUT', `https://web.bluesurge.com.pk/post/comments/single/edit/${id}`,formData)
}

export const deleteCommentReq = async (id) => {
  return await ApiFetchReq('DELETE', `https://web.bluesurge.com.pk/post/comments/single/${id}`)
}