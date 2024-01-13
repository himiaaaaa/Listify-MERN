import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlog(state, action){
      return action.payload
    },
    appendBlog(state, action){
      state.push(action.payload)
    },
    deleteBlog(state, action){
      state.filter((blog) => blog.id !== action.payload.id)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    }
  }
})

export const { setBlog, appendBlog, deleteBlog, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlogs = id => {
  return async dispatch => {
    const newBlog = await blogService.remove(id)
    dispatch(deleteBlog(newBlog))
  }
}

export const updateBlogs = (content) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(content)
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer