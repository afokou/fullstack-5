import { useEffect, useState } from 'react';
import blogService from '../services/blogs.js';
import Blog from './Blog.jsx';
import CreateNewBlog from './CreateNewBlog.jsx';

const BlogsList = ({ user }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in <button onClick={() => {
        window.localStorage.removeItem('loggedBlogappUser')
        window.location.reload()
      }}>logout</button></div>
      <div>&nbsp;</div>
      <CreateNewBlog blogCreated={() => {
        // Refresh blogs list after creation
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
      }} />
      <div>&nbsp;</div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogsList;