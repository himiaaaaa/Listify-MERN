import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './singlePost.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlogs, updateBlogs } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

export default function SinglePost({ blog }) {
  //const isPhotoUrl = blog.photo.startsWith('https')
  const authUser = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notification = useSelector((state) => state.notifications)

  useEffect(() => {
    if (notification) {
      // Reload the page when there is a new blog post and notification
      window.location.reload()
    }
  }, [notification])


  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(blog.title)
  const [editedDesc, setEditedDesc] = useState(blog.desc)

  const handleDelete = () => {
    if (window.confirm(`Are you sure to remove blog ${blog.title} by ${blog.user.username}?`)) {
      dispatch(deleteBlogs(blog.id))
      dispatch(setNotification(`You deleted "${blog.title}" !`, 5))
      navigate('/')
      window.location.reload
    }
  }

  const handleEditBtn = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleEdit = () => {
    const updatedBlog = {
      ...blog,
      title: editedTitle,
      desc: editedDesc,
    }

    dispatch(updateBlogs(updatedBlog))

    window.location.reload()
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {/* {isPhotoUrl ? (
          <img className="singlePostImg" src={blog.photo} alt="" />
        ) : (
          <img className="singlePostImg" src={`/images/${blog.photo}`} alt="" />
        )} */}
        <img className="singlePostImg" src={blog?.photo?.url} alt="" />
        <h1 className="singlePostTitle">
          {isEditing ?
            <>
              <input
                className='singlePostTitleEdit'
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </>
            :
            <>
              {blog && blog.title}

              {authUser && authUser.username && blog && blog.user && blog.user.username === authUser.username &&
              <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" onClick={handleEditBtn}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
              </div>
              }
            </>
          }
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/blogs?username=${blog.user.username}`}>
                {blog.user.username}
              </Link>
            </b>
          </span>
          <span>{new Date(blog.createdAt).toDateString()}</span>
        </div>
        {isEditing ? (
          <div className='singlePostEditVersion'>
            <div>
              <textarea
                value={editedDesc}
                onChange={(e) => setEditedDesc(e.target.value)}
                className="singlePostDescEdit"
              />
            </div>
            <div className="singlePostBtnEdit">
              <button onClick={handleEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <p className="singlePostDesc">
              {blog.desc}
            </p>
          </>
        )}


      </div>
    </div>
  )
}