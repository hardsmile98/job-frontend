import React from 'react'
import classes from './Input.module.css'

const Input = ({ label, required, value, onChange, type, placeholder }) => {
  const inputType = type || 'text'

  return (
    <div className={classes.Input}>
      <p>
        {label} {required && <span>*</span>}
      </p>
      <input
        placeholder={placeholder}
        type={inputType}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
