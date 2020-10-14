import React, { createContext, useState } from 'react'

function noop() {}

export const SavedContext = createContext({
  saved: null,
  setSaved: noop,
  addSaved: noop,
  isSaved: noop,
  deleteSaved: noop,
})

export const SavedProvider = ({ children }) => {
  const locSaved = JSON.parse(localStorage.getItem('saved'))
  const [saved, setSaved] = useState(locSaved ? locSaved : [])

  const addSaved = (id, title) => {
    let state
    if (!saved) {
      state = [{ id, title }]
    } else {
      state = [...saved]
      state.push({ id, title })
    }
    setSaved(state)
    localStorage.setItem('saved', JSON.stringify(state))
  }

  const deleteSaved = (id) => {
    let state = [...saved]
    state = state.filter((save) => save.id !== id)
    setSaved(state)
    localStorage.setItem('saved', JSON.stringify(state))
  }

  const isSaved = (id) => {
    const clone = [...saved]
    const ids = clone.map((save) => save.id)
    return ids.indexOf(id) !== -1
  }

  return (
    <SavedContext.Provider
      value={{ saved, setSaved, addSaved, isSaved, deleteSaved }}>
      {children}
    </SavedContext.Provider>
  )
}
