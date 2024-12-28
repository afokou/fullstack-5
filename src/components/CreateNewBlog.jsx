import blogService from '../services/blogs.js'
import { useState } from 'react';

const CreateNewBlog = ({ blogCreated }) => {
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.createBlog({
        title: title,
        url: url,
      })
      setTitle('')
      setUrl('')
      setSuccessMessage('Blog added successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      blogCreated()
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={addBlog}>
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateNewBlog
