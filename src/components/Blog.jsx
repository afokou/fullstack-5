import { useState } from 'react';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={() => setExpanded(!expanded)}>{expanded ? 'hide' : 'view'}</button>
      </div>
      {expanded && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button>like</button>
          </div>
          <div>{blog.author.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
