import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { updateUsers } from '../../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../reducers/authReducer'
import { deleteUsers } from '../../reducers/userReducer'
//import axios from 'axios'

export default function Settings() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authUser = useSelector(state => state.auth)

  const [editedUsername, setEditedUsername] = useState(authUser.username)
  const [editedEmail, setEditedEmail] = useState(authUser.email)
  const [editedPassword, setEditedPassword] = useState('')
  //const [file] = useState(null)
  const [image, setImage] = useState([])

  // const upload = async () => {
  //   try {
  //     const formData = new FormData()
  //     formData.append('file', file)

  //     const res = await axios.post('/api/upload', formData)
  //     console.log('resdata', res.data)
  //     return res.data

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const handleImage = (e) => {
    const file = e.target.files[0]
    setFileToBase(file)
    console.log('imagefile', file)
  }

  console.log('image', image)

  const setFileToBase = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  const handleUpdate = async (e) => {

    e.preventDefault()

    //const imgUrl = await upload()
    //console.log('userimgurl', imgUrl)

    const updatedUser = {
      ...authUser,
      id: authUser.id,
      username: editedUsername,
      email: editedEmail,
      password: editedPassword,
      profilePic: image ? image : authUser?.profilePic?.url
    }

    //console.log('file', file)

    dispatch(updateUsers(updatedUser))

    dispatch(logout())
    //navigate('/login')
    //window.location.reload()
  }

  const handleDelete = () => {
    if (window.confirm(`Delete user ${authUser.username} permanently`)) {
      const id = authUser.id
      console.log('look', id)
      dispatch(deleteUsers( id ))
      dispatch(logout())
      navigate('/login')
    }
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={handleDelete}>Delete Account</span>
        </div>
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={image.length === 0 ? authUser.profilePic : image }alt="" />

            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{' '}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: 'none' }}
              className="settingsPPInput"
              onChange={handleImage}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={authUser.username}
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={authUser.email}
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder=""
            onChange={(e) => setEditedPassword(e.target.value)}
          />
          <button
            className="settingsSubmitButton"
            onClick={handleUpdate}
          >
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  )
}


// {file ? <img
//   src={URL.createObjectURL(file)} //create a temporary URL for the uploaded image file
//   alt=""
// />
//   :
//   <img
//     src={`/images/${authUser.profilePic}`}
//     alt=""
//   />
// }
