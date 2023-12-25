/* import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import authReducer from './reducers/authReducer'
import commentReducer from './reducers/commentReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notifications: notificationReducer,
    users: userReducer,
    authUser: authReducer,
    comments: commentReducer
  }
})

store.subscribe(() => {console.log(store.getState())})

export default store */

import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import categoryReducer from './reducers/categoryReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    categories: categoryReducer
  }
})

store.subscribe(() => {console.log(store.getState())})

export default store