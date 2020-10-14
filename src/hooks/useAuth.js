import { useState, useCallback, useEffect } from 'react'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)

  const login = useCallback((jwtToken) => {
    setToken(jwtToken)
    localStorage.setItem('token', jwtToken)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    localStorage.removeItem('token')
  }, [])

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      login(localToken)
    }
    setReady(true)
  }, [login])

  return { token, ready, setToken, login, logout }
}
