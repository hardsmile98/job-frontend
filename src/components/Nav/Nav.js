import React, { useContext, useState } from 'react'
import { authContext } from '../../context/authContext'
import { Link } from 'react-router-dom'
import classes from './Nav.module.css'
import { LogoIcon, MenuIcon } from '../Icons/Icons'

const Nav = () => {
  const { token, logout } = useContext(authContext)
  const [isMenu, setIsMenu] = useState(false)
  const isAuth = !!token

  return (
    <nav className={classes.Nav}>
      <div className={classes.Wrap}>
        <div className={classes.Logo}>
          <Link to="/">
            <LogoIcon />
          </Link>
        </div>

        <div className={classes.Info}>
          <span className={classes.City}>Киров</span>
          {isAuth ? (
            <div className={classes.Profile}>
              <span className={classes.Link} onClick={() => setIsMenu(!isMenu)}>
                <MenuIcon />
              </span>
              {isMenu && (
                <div className={classes.Menu}>
                  <ul>
                    <li>
                      <Link onClick={() => setIsMenu(false)} to="/profile">
                        Профиль
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => setIsMenu(false)} to="/add">
                        Вакансии
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          setIsMenu(false)
                          logout()
                        }}
                        to="/">
                        Выйти
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link className={classes.Button} to="/login">
              Войти
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Nav
