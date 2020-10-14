import React from 'react'
import classes from './Search.module.css'
import { SearchIcon, CloseIcon } from '../Icons/Icons'
import useInput from '../../hooks/useInput'
import useHttp from '../../hooks/useHttp'

const Search = ({ setJobs }) => {
  const search = useInput()
  const { request } = useHttp()

  const searchHandler = async () => {
    const data = {
      search: search.value,
    }
    try {
      const response = await request('/api/job/search', 'POST', data)
      setJobs(response)
    } catch (e) {}
  }

  return (
    <div className={classes.Search}>
      <h2>Поиск работы в Кирове</h2>
      <form
        className={classes.Form}
        onSubmit={(e) => {
          e.preventDefault()
        }}>
        <div className={classes.Input}>
          <div className={classes.Icon}>
            <SearchIcon />
          </div>
          <input
            type="text"
            onChange={search.onChange}
            value={search.value}
            placeholder="Должность"
          />
          {search.value && (
            <div className={classes.Close} onClick={() => search.setValue('')}>
              <CloseIcon />
            </div>
          )}
        </div>

        <button className={classes.Submit} onClick={searchHandler}>
          Найти
        </button>
      </form>

      <div className={classes.Bg}></div>
    </div>
  )
}

export default Search
