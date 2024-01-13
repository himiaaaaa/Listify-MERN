import { Link } from 'react-router-dom'
import './topbar.css'
import { logout } from '../../reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'

export default function Topbar() {
  const authUser = useSelector(state => state.auth)

  //const isPhotoUrl = authUser && authUser.profilePic && authUser.profilePic.startsWith('https')

  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          {authUser &&
            <>
              <li className="topListItem">
                <Link className="link" to="/newPost">
                       WRITE
                </Link>
              </li>
              <li className="topListItem" onClick={handleLogout}>
                  LOGOUT
              </li>
            </>
          }
        </ul>
      </div>
      <div className="topRight">
        {authUser ? (
          <Link className="link" to="/users">
            {/* {isPhotoUrl ? (
              <img className="topImg" src={authUser.profilePic.url} alt="" />
            ) : (
              <img className="topImg" src={`/images/${authUser.profilePic}`} alt="" />
            )} */}
            <img className="topImg" src={authUser?.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  )
}