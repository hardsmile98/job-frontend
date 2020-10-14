import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Recommends.module.css'
import { LocationIcon } from '../Icons/Icons'

const Recommends = ({ recommends }) => {
  return (
    <div className={classes.Recommends}>
      {recommends.map((item) => (
        <div className={classes.Item} key={item._id}>
          <Link className={classes.Link} to={`/job/${item._id}`} />
          <div className={classes.Title}>{item.job}</div>
          <div className={classes.Salary}>
            {item.salary.toLocaleString()} руб.
          </div>
          <div className={classes.Company}>{item.company}</div>
          <div className={classes.Place}>
            <LocationIcon />
            {item.place}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Recommends
