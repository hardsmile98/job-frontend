import { useState, useCallback } from 'react'

const useHttp = () => {
  const [error, setError] = useState(null)

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      const deployUrl = 'https://intense-temple-11712.herokuapp.com' + url
      try {
        if (body) {
          body = JSON.stringify(body)
          headers['Content-Type'] = 'application/json'
        }

        const response = await fetch(deployUrl, {
          method,
          body,
          headers,
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Что-то пошло не так')
        }

        return data
      } catch (e) {
        setError(e.message)
        throw e
      }
    },
    []
  )

  const clearError = useCallback(() => setError(null), [])

  return { error, request, clearError }
}

export default useHttp
