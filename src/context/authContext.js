import { createContext } from 'react'

function noop() {}

export const authContext = createContext({
  token: null,
  login: noop,
  logout: noop,
})
