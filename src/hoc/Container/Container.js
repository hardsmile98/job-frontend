import React from 'react'
import classes from './Container.module.css'

const Container = ({ children }) => {
  return <div className={classes.Container}>{children}</div>
}

export default Container
