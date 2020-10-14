import React, { useContext, useState, useEffect, useCallback } from 'react'
import classes from './Profile.module.css'
import Loader from '../../components/Loader/Loader'
import ProfileSaved from '../../components/ProfileSaved/ProfileSaved'
import ProfileEdit from '../../components/ProfileEdit/ProfileEdit'
import Crumbs from '../../components/Crumbs/Crumbs'
import useHttp from '../../hooks/useHttp'
import { authContext } from '../../context/authContext'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const { request } = useHttp()
  const { token } = useContext(authContext)

  const fetch = useCallback(async () => {
    try {
      const data = await request(`/api/user`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setProfile(data)
    } catch (e) {}
    setLoading(false)
  }, [request, token])

  useEffect(() => {
    fetch()
  }, [fetch])

  if (loading) {
    return <Loader />
  }

  return (
    <div className={classes.Profile}>
      <Crumbs currentLink="Мой профиль" />
      <ProfileSaved />
      <ProfileEdit profile={profile} />
    </div>
  )
}

export default Profile
