import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    updateUser(state, action) {
      const updatedUser = action.payload
      return state.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    },
    deleteUser(state, action){
      state.filter((user) => user.id !== action.payload.id)
    },
  },
})

export const { setUser, updateUser, deleteUser } = userSlice.actions

export const initializeAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUser(users))
  }
}

export const updateUsers = (updatedUserData) => {
  return async (dispatch) => {

    const updatedUser = await userService.updateTheUser(updatedUserData)
    dispatch(updateUser(updatedUser))

  }}

export const deleteUsers = (id) => {
  return async (dispatch) => {

    const delete_user = await userService.deleteTheUser(id)
    dispatch(deleteUser(delete_user))

  }}

export default userSlice.reducer