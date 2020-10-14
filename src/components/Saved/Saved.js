import React, { useState, useContext } from 'react'
import classes from './Saved.module.css'
import { SavedContext } from '../../context/savedContext'
import { SaveIcon, SaveActiveIcon } from '../Icons/Icons'

const Saved = ({ jobId, title = 'Название' }) => {
  const { addSaved, deleteSaved, isSaved } = useContext(SavedContext)
  const [savedState, setSavedState] = useState(isSaved(jobId))

  const savedHandler = () => {
    if (savedState) {
      deleteSaved(jobId)
    } else {
      addSaved(jobId, title)
    }
    setSavedState(!savedState)
  }

  if (savedState) {
    return (
      <div className={classes.Saved} onClick={savedHandler}>
        <SaveActiveIcon />
        <span>Убрать</span>
      </div>
    )
  } else {
    return (
      <div className={classes.Saved} onClick={savedHandler}>
        <SaveIcon />
        <span>Сохранить</span>
      </div>
    )
  }
}

export default Saved
