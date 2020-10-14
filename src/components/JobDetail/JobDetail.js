import React from 'react'
import classes from './JobDetail.module.css'
import { LocationIcon, PhoneIcon } from '../Icons/Icons'
import Saved from '../Saved/Saved'

const JobDetail = ({ detail }) => {
  return (
    <div className={classes.JobDetail}>
      <div className={classes.Wrap}>
        <div className={classes.Head}>
          <div className={classes.About}>
            <h1>{detail.job}</h1>
            <div className={classes.Salary}>
              {detail.salary.toLocaleString()} руб.
            </div>

            <div className={classes.Table}>
              <div className={classes.Line}>
                <div className={classes.Label}>График</div>
                <div className={classes.Text}>
                  {detail.schedule ? detail.schedule : 'Не указано'}
                </div>
              </div>
              <div className={classes.Line}>
                <div className={classes.Label}>Образование</div>
                <div className={classes.Text}>
                  {detail.education ? detail.education : 'Не указано'}
                </div>
              </div>
              <div className={classes.Line}>
                <div className={classes.Label}>Опыт работы</div>
                <div className={classes.Text}>
                  {detail.experience ? detail.experience : 'Не указано'}
                </div>
              </div>
            </div>
          </div>

          <div className={classes.Company}>
            <div>Компания:</div>
            <div className={classes.Bold}>{detail.company}</div>
          </div>
        </div>

        <div
          className={classes.Description}
          dangerouslySetInnerHTML={{ __html: detail.description }}></div>
        <div className={classes.Place}>
          <div className={classes.Bold}>Место:</div>
          <div className={classes.PlaceVal}>
            <LocationIcon />
            {detail.place}
          </div>
        </div>
        <div className={classes.Date}>
          Вакансия опубликована:{' '}
          {new Date(detail.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className={classes.Actions}>
        <div className={classes.Buttons}>
          <button className={classes.Respond}>Откликнуться</button>
          <a href={`tel:${detail.phone}`} className={classes.Call}>
            <PhoneIcon />
            Позвонить
          </a>
        </div>
        <div>
          <Saved title={detail.job} jobId={detail._id} />
        </div>
      </div>
    </div>
  )
}

export default JobDetail
