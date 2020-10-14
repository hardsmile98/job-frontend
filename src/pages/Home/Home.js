import React, { useState, useCallback, useEffect } from 'react'
import classes from './Home.module.css'
import useHttp from '../../hooks/useHttp'
import Loader from '../../components/Loader/Loader'
import Search from '../../components/Search/Search'
import JobPreview from '../../components/JobPreview/JobPreview'
import Placeholder from '../../components/Placeholder/Placeholder'

const Home = () => {
  const { request } = useHttp()

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    try {
      const data = await request('/api/job/', 'GET', null)
      setJobs(data)
    } catch (e) {}
    setLoading(false)
  }, [request])

  useEffect(() => {
    fetch()
  }, [fetch])

  if (loading) {
    return <Loader />
  }

  return (
    <div className={classes.Home}>
      <Search setJobs={setJobs} />
      <div className={classes.Jobs}>
        {jobs.length ? (
          jobs.map((job) => <JobPreview key={job._id} job={job} />)
        ) : (
          <Placeholder
            title="Доступных вакансий не найдено"
            desc="Попробуйте попозже или поменяйте свой запрос"
          />
        )}
      </div>
    </div>
  )
}

export default Home
