import { Link } from 'react-router-dom'
import './post.css'

export default function Post({ blog }) {

  //const isPhotoUrl = blog && blog.photo && blog.photo.startsWith('https')

  return (
    <div className="post">
      {/* {isPhotoUrl ? (
        <img className="postImg" src={blog?.photo} alt="" />
      ) : (
        <img className="postImg" src={blog?.photo?.url} alt="" />
      )}  */}
      <img className="postImg" src={blog?.photo?.url} alt="" />
      <div className="postInfo">
        <div className="postCats">
          {blog.categories.map((cat) => (
            <span key={cat} className="postCat">
              <Link key={cat} className="link" to={`/blogs?cat=${cat}`}>
                {cat}
              </Link>
            </span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/blogs/${blog.id}`} className="link">
            {blog.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(blog.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">
        {blog.desc}
      </p>
    </div>
  )
}
