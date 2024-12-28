import { useState } from 'react'
import LoginForm from './components/LoginForm.jsx';
import BlogsList from './components/BlogsList.jsx';

const App = () => {
  const [user, setUser] = useState(null)

  if (!user) {
    return <LoginForm setUser={setUser} />
  }

  return <BlogsList />
}

export default App
