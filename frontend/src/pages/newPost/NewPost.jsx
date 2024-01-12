import './newPost.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
//import axios from 'axios'

export default function NewPost() {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [ file ] = useState(null)
  const [ image, setImage ] = useState([])
  console.log('upload file', file)

  const notification = useSelector((state) => state.notifications)
  const authUser = useSelector((state) => state.auth)

  // const upload = async () => {
  //   try {
  //     const formData = new FormData()
  //     const filename = Date.now() + file.name
  //     formData.append('name', filename)
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

  const handleNewBlog = async(e) => {

    e.preventDefault()

    const title = e.target.title.value
    const desc = e.target.desc.value
    // const imgUrl = await upload()
    // console.log('imgurl', imgUrl)

    e.target.title.value = ''
    e.target.desc.value = ''

    const createdBlog = {
      title: title,
      desc: desc,
      photo: image ? image : '',
    }

    dispatch(createBlog(createdBlog))
    navigate('/')
    dispatch(setNotification(`a new blog ${title} by ${authUser.username} added`, 5))
  }

  // useEffect(() => {
  //   if (notification) {
  //     // Reload the page when there is a new blog post and notification
  //     window.location.reload(true)
  //   }
  // }, [notification])

  return (
    <div className="newPost">
      {/* {file && <img
        className="newPostImg"
        src={URL.createObjectURL(file)}
        alt=""
      />} */}
      <img
        className="newPostImg"
        src={image}
        alt=""
      />
      <div>
        {notification && (
          <div>
            <div className="alert alert-danger" role="alert">
              {notification}
            </div>
          </div>
        )}
      </div>
      <form className="newPostForm" onSubmit={handleNewBlog}>

        <div className="newPostFormGroup">

          <label htmlFor="fileInput">
            <i className="newPostIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: 'none' }}
            //onChange={(e) => setFile(e.target.files[0])}
            onChange={handleImage}
            accept='.jpg, .png, .jpeg'
          />

          <input
            className="newPostInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            id="title"
          />
        </div>

        <div className="newPostFormGroup">
          <textarea
            className="newPostInput newPostText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            id="desc"
          />
        </div>

        <button className="newPostSubmit" type="submit">
            Publish
        </button>

      </form>
    </div>
  )
}