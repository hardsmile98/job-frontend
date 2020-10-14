import React, { useContext } from 'react'
import { validateEmail } from '../../utils/utils'
import { Link } from 'react-router-dom'
import classes from './Auth.module.css'
import useInput from '../../hooks/useInput'
import useHttp from '../../hooks/useHttp'
import { authContext } from '../../context/authContext'
import Input from '../../UI/Input/Input'

const Reg = () => {
  const auth = useContext(authContext)
  const { request, error } = useHttp()
  const name = useInput()
  const email = useInput()
  const password = useInput()

  const registerHandler = async () => {
    const authData = {
      email: email.value,
      name: name.value,
      password: password.value,
    }
    try {
      const { token } = await request('/api/auth/register', 'POST', authData)
      auth.login(token)
    } catch (e) {}
  }

  const validate = () => {
    if (validateEmail(email.value) && name.value && password.value.length > 5) {
      return false
    }
    return true
  }

  return (
    <div className={classes.Auth}>
      <h1>Регистрация</h1>
      <div className={classes.Form}>
        <Input
          label="Имя"
          required={true}
          value={name.value}
          onChange={name.onChange}
        />
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
          onClick={registerHandler}
          disabled={validate()}>
          Войти
        </button>
        <p className={classes.Policy}>
          Регистрируясь, вы подтверждаете, что ознакомлены, полностью согласны и
          принимаете нашу политику конфиденциальности.
        </p>
        <div className={classes.Divider}>
          <div>или</div>
        </div>
        <p className={classes.Create}>
          Уже зарегистрированы?
          <Link className={classes.Link} to="/login">
            Вход
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Reg
