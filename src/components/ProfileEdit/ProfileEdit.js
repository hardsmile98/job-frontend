import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import classes from './ProfileEdit.module.css'
import useInput from '../../hooks/useInput'
import Input from '../../UI/Input/Input'
import { validateEmail, uploadImage } from '../../utils/utils'
import useHttp from '../../hooks/useHttp'
import { authContext } from '../../context/authContext'

const ProfileEdit = ({ profile }) => {
  const [avatar, setAvatar] = useState(profile?.avatar)
  const name = useInput(profile?.name)
  const email = useInput(profile?.email)
  const phone = useInput(profile?.phone)

  const { token } = useContext(authContext)
  const { request } = useHttp()
  const history = useHistory()

  const saveProfileHandler = async () => {
    const data = {
      avatar,
      name: name.value,
      email: email.value,
      phone: phone.value,
    }
    try {
      await request(`/api/user/edit`, 'PUT', data, {
        Authorization: `Bearer ${token}`,
      })
      history.push('/')
    } catch (e) {}
  }

  const changeAvatarHandler = async (e) => {
    if (e.target.files[0]) {
      try {
        const res = await uploadImage(e.target.files[0])
        setAvatar(res)
      } catch (e) {}
    }
  }

  const validate = () => {
    if (validateEmail(email.value) && name.value) {
      return false
    }
    return true
  }

  return (
    <div className={classes.ProfileSettings}>
      <h1>Настройки профиля</h1>
      <div className={classes.Wrap}>
        <div className={classes.Avatar}>
          <img src={avatar} alt="avatar" />

          <div className={classes.Change}>
            <label htmlFor="change-avatar">
              <span>Изменить аватар</span>
            </label>
            <input
              id="change-avatar"
              accept="image/*"
              type="file"
              onChange={changeAvatarHandler}
            />
          </div>
        </div>

        <div className={classes.Info}>
          <Input
            label="Имя"
            required={true}
            value={name.value}
            onChange={name.onChange}
          />
          <Input
            label="Email"
            required={true}
            value={email.value}
            onChange={email.onChange}
          />
          <Input
            label="Телефон"
            value={phone.value}
            onChange={phone.onChange}
          />
          <button
            disabled={validate()}
            onClick={saveProfileHandler}
            className={classes.Submit}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
