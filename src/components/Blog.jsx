import { useState } from 'react';
import blogService from '../services/blogs.js';

const Blog = ({ blog, blogUpdated }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [expanded, setExpanded] = useState(false)

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.updateBlog(blog.id, updatedBlog)
    blogUpdated()
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={() => setExpanded(!expanded)}>{expanded ? 'hide' : 'view'}</button>
      </div>
      {expanded && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.author.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
