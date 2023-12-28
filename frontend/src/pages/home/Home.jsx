import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'

export default function Homepage() {
  const blogs = useSelector(state => state.blogs)

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const category = searchParams.get('cat')
  const username = searchParams.get('username')

  console.log('query name', category, username)

  const blogs_filtered = category
    ? blogs.filter((blog) => blog.categories.includes(category))
    :
    username
      ? blogs.filter((blog) => blog.user && blog.user.username === username)
      : blogs

  return (
    <>
      <Header />
      <div className="home">
        <Posts blogs={blogs_filtered}/>
        <Sidebar blogs={blogs_filtered}/>
      </div>
    </>
  )
}