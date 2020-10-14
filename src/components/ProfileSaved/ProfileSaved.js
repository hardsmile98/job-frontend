import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import classes from './ProfileSaved.module.css'
import { SavedContext } from '../../context/savedContext'
import Saved from '../Saved/Saved'

const ProfileSaved = () => {
  const { saved } = useContext(SavedContext)

  return (
    <div className={classes.ProfileSaved}>
      <h1>Сохранённые вакансии</h1>

      {saved.length ? (
        <div className={classes.Saves}>
          {saved.map((save) => (
            <div className={classes.Save} key={save.id}>
              <Link to={`/job/${save.id}`}>{save.title}</Link>
              <Saved title={save.titile} jobId={save.id} />
            </div>
          ))}
        </div>
      ) : (
        <div className={classes.Empty}>Сохраненных вакансий пока что нет</div>
      )}
    </div>
  )
}

export default ProfileSaved
