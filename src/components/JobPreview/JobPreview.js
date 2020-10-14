import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './JobPreview.module.css'
import { LocationIcon, PhoneIcon } from '../Icons/Icons'
import Saved from '../Saved/Saved'
import { clearnTag, limitStr } from '../../utils/utils'

const JobPreview = ({ job }) => {
  const [format, setFormat] = useState(true)

  return (
    <div className={classes.JobPreview}>
      <div className={classes.JobHead}>
        <h3>
          <Link to={`/job/${job._id}`}>{job.job}</Link>
        </h3>
        <div>{job.salary.toLocaleString()} руб.</div>
      </div>

      {format ? (
        <div onClick={() => setFormat(!format)} className={classes.Description}>
          {limitStr(clearnTag(job.description), 300)}
        </div>
      ) : (
        <div
          onClick={() => setFormat(!format)}
          className={classes.Description}
          dangerouslySetInnerHTML={{ __html: job.description }}></div>
      )}

      <div className={classes.Bottom}>
        <div className={classes.Company}>{job.company}</div>
        <div className={classes.Location}>
          <LocationIcon />
          {job.place}
        </div>
      </div>

      <div className={classes.Actions}>
        <div className={classes.Buttons}>
          <button className={classes.Respond}>Откликнуться</button>
          <a href={`tel:${job.phone}`} className={classes.Call}>
            <PhoneIcon />
            Позвонить
          </a>
        </div>
        <div>
          <Saved title={job.job} jobId={job._id} />
        </div>
      </div>
    </div>
  )
}

export default JobPreview
