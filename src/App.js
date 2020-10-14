import React from 'react'
import { useAuth } from './hooks/useAuth'
import { authContext } from './context/authContext'
import { SavedProvider } from './context/savedContext'
import Routing from './Routing'
import Loader from './components/Loader/Loader'

function App() {
  const { token, ready, login, logout } = useAuth()

  if (!ready) {
    return <Loader />
  }

  return (
    <authContext.Provider value={{ token, login, logout }}>
      <SavedProvider>
        <Routing />
      </SavedProvider>
    </authContext.Provider>
  )
}

export default App
