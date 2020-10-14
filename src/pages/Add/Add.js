import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import classes from './Add.module.css'
import { authContext } from '../../context/authContext'
import useHttp from '../../hooks/useHttp'
import Input from '../../UI/Input/Input'
import Select from '../../UI/Select/Select'
import useInput from '../../hooks/useInput'
import TextEditor from '../../components/TextEditor/TextEditor'
import { clearnTag } from '../../utils/utils'

const Add = () => {
  const history = useHistory()
  const { token } = useContext(authContext)
  const { request } = useHttp()

  const company = useInput()
  const job = useInput()
  const place = useInput()
  const phone = useInput()

  const schedule = useInput()
  const education = useInput()
  const experience = useInput()
  const salary = useInput()
  const [editer, setEditer] = useState('')

  const addOfferHandler = async () => {
    const data = {
      company: company.value,
      job: job.value,
      place: place.value,
      phone: phone.value,
      schedule: schedule.value,
      education: education.value,
      experience: experience.value,
      salary: salary.value,
      description: editer,
    }
    try {
      await request('/api/job/add', 'POST', data, {
        Authorization: `Bearer ${token}`,
      })
      history.push('/')
    } catch (e) {}
  }

  const validate = () => {
    if (
      company.value &&
      job.value &&
      place.value &&
      phone.value.length > 10 &&
      schedule.value &&
      salary.value.length > 3 &&
      clearnTag(editer).length > 30
    ) {
      return false
    }
    return true
  }

  return (
    <div className={classes.Add}>
      <h1>Добавление вакансии</h1>
      <div className={classes.Step}>
        <div className={classes.Head}>
          <h2>Информация о компании</h2>
          <span>Шаг 1 из 2</span>
        </div>
        <Input
          label="Название компании"
          required={true}
          value={company.value}
          onChange={company.onChange}
        />
        <Input
          label="Должность"
          required={true}
          value={job.value}
          onChange={job.onChange}
        />
        <Input
          label="Местоположение"
          required={true}
          value={place.value}
          onChange={place.onChange}
        />
        <Input
          label="Номер телефона"
          required={true}
          value={phone.value}
          onChange={phone.onChange}
          placeholder="+7(999)999-99-99"
        />
      </div>

      <div className={classes.Step}>
        <div className={classes.Head}>
          <h2>Детали вакансии</h2>
          <span>Шаг 2 из 2</span>
        </div>
        <Select
          label="Какой график вы предлагаете?"
          value={schedule.value}
          onChange={schedule.onChange}
          required={true}
          options={[
            { val: '', text: 'Выбрать вариант' },
            { val: 'Полная занятость', text: 'Полная занятость' },
            { val: 'Частичная занятость', text: 'Частичная занятость' },
            { val: 'Вахта', text: 'Вахта' },
          ]}
        />
        <Select
          label="Какое образование необходимо?"
          value={education.value}
          onChange={education.onChange}
          options={[
            { val: '', text: 'Выбрать вариант' },
            { val: 'Любое', text: 'Любое' },
            { val: 'Высшее', text: 'Высшее' },
            { val: 'Среднее', text: 'Среднее' },
          ]}
        />
        <Select
          label="Какое опыт работы необходим?"
          value={experience.value}
          onChange={experience.onChange}
          options={[
            { val: '', text: 'Выбрать вариант' },
            { val: 'Без опыта', text: 'Без опыта' },
            { val: '1 год', text: '1 год' },
            { val: '2 года', text: '2 года' },
            { val: '5 лет', text: '5 лет' },
          ]}
        />
        <Input
          label="Заработная плата"
          required={true}
          type="number"
          value={salary.value}
          onChange={salary.onChange}
        />
        <div>
          <p>
            Опишите должностные обязанности, требуемый опыт работы, необходимые
            навыки и образование.
          </p>
          <TextEditor setEditer={setEditer} />
        </div>
        <button
          className={classes.Submit}
          disabled={validate()}
          onClick={addOfferHandler}>
          Добавить вакансию
        </button>
      </div>
    </div>
  )
}

export default Add
