import { useEffect, useState } from 'react'
import blogService from '../services/blogs.js'
import Blog from './Blog.jsx'
import CreateNewBlog from './CreateNewBlog.jsx'
import Togglable from './Togglable.jsx'

const BlogsList = ({ user }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      // Sort the blogs by likes first then set them to state
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in <button onClick={() => {
        window.localStorage.removeItem('loggedBlogappUser')
        window.location.reload()
      }}>logout</button></div>
      <div>&nbsp;</div>
      <Togglable buttonLabel="new blog">
        <CreateNewBlog blogCreated={() => {
          // Refresh blogs list after creation
          blogService.getAll().then(blogs => {
            // Sort the blogs by likes first then set them to state
            blogs.sort((a, b) => b.likes - a.likes)
            setBlogs(blogs)
          })
        }} />
      </Togglable>
      <div>&nbsp;</div>
      {blogs.map(blog =>
        <Blog key={blog.id} blogService={blogService} blog={blog} user={user} blogUpdated={() => {
          // Refresh blogs list after update
          blogService.getAll().then(blogs => {
            // Sort the blogs by likes first then set them to state
            blogs.sort((a, b) => b.likes - a.likes)
            setBlogs(blogs)
          })
        }} />
      )}
    </div>
  )
}

export default BlogsList
