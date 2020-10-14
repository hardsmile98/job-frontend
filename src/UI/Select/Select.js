import React from 'react'
import classes from './Select.module.css'

const Select = ({ label, required, value, onChange, options }) => {
  return (
    <div className={classes.Select}>
      <p>
        {label} {required && <span>*</span>}
      </p>
      <select value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={option.val + index} value={option.val}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
