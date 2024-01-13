import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import categoryReducer from './reducers/categoryReducer'
import authReducer from './reducers/authReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    users: userReducer,
    blogs: blogReducer,
    categories: categoryReducer,
    auth: authReducer,
    notifications: notificationReducer,
  }
})

store.subscribe(() => {console.log('store getstate', store.getState())})

export default store