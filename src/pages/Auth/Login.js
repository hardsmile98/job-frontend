import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import classes from './Auth.module.css'
import useInput from '../../hooks/useInput'
import useHttp from '../../hooks/useHttp'
import { authContext } from '../../context/authContext'
import { validateEmail } from '../../utils/utils'
import Input from '../../UI/Input/Input'

const Login = () => {
  const auth = useContext(authContext)
  const { request, error } = useHttp()
  const email = useInput()
  const password = useInput()

  const loginHandler = async () => {
    const authData = {
      email: email.value,
      password: password.value,
    }
    try {
      const { token } = await request('/api/auth/login', 'POST', authData)
      auth.login(token)
    } catch (e) {}
  }

  const validate = () => {
    if (validateEmail(email.value) && password.value.length > 5) {
      return false
    }
    return true
  }

  return (
    <div className={classes.Auth}>
      <h1>Вход</h1>
      <div className={classes.Form}>
        <Input
          label="E-mail"
          required={true}
          value={email.value}
          onChange={email.onChange}
        />
        <Input
          label="Пароль"
          type="password"
          required={true}
          value={password.value}
          onChange={password.onChange}
        />
        {error && <p className={classes.Error}>{error}</p>}
        <button
          className={classes.Submit}
          onClick={loginHandler}
          disabled={validate()}>
          Войти
        </button>
        <p className={classes.Policy}>
          Нажимая Войти, вы подтверждаете, что ознакомлены, полностью согласны и
          принимаете нашу политику конфиденциальности.
        </p>
        <div className={classes.Divider}>
          <div>или</div>
        </div>
        <p className={classes.Create}>
          Ещё не зарегистрированы?
          <Link className={classes.Link} to="/reg">
            Регистрация
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
