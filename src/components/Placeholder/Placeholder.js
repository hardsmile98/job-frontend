import React from 'react'
import classes from './Placeholder.module.css'

const Placeholder = ({ title, desc }) => {
  return (
    <div className={classes.Placeholder}>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  )
}

export default Placeholder
