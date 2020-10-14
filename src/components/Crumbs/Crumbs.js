import React from 'react'
import { Link } from 'react-router-dom'
import { CrumbsIcon } from '../Icons/Icons'
import classes from './Crumbs.module.css'

const Crumbs = ({ currentLink }) => {
  return (
    <div className={classes.CrumbsWrap}>
      <ul className={classes.Crumbs}>
        <li>
          <Link to="/">Вакансии в Кирове</Link>
          <CrumbsIcon />
        </li>
        <li>
          <span>{currentLink}</span>
        </li>
      </ul>
    </div>
  )
}

export default Crumbs
