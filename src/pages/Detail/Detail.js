import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import classes from './Detail.module.css'
import useHttp from '../../hooks/useHttp'
import Loader from '../../components/Loader/Loader'
import Crumbs from '../../components/Crumbs/Crumbs'
import JobDetail from '../../components/JobDetail/JobDetail'
import Recommends from '../../components/Recommends/Recommends'
import Placeholder from '../../components/Placeholder/Placeholder'

const Detail = () => {
  const [loading, setLoading] = useState(true)
  const [dead, setDead] = useState(false)
  const [detail, setDetail] = useState(null)
  const [recommends, setRecommends] = useState(null)
  const { id } = useParams()
  const { request } = useHttp()

  const fetch = useCallback(async () => {
    try {
      const data = await request(`/api/job/${id}`, 'GET', null)
      setDetail(data.detail)
      setRecommends(data.recommends)
    } catch (e) {
      setDead(true)
    }
    setLoading(false)
  }, [request, id])

  useEffect(() => {
    fetch()
  }, [fetch])

  if (loading) {
    return <Loader />
  }

  return (
    <div className={classes.Detail}>
      {dead ? (
        <Placeholder
          title="Страница вакансии не найдена"
          desc="Попробуйте попозже или поменяйте свой запрос"
        />
      ) : (
        <>
          <Crumbs currentLink={detail.job} />
          <div className={classes.Main}>
            <JobDetail detail={detail} />
            <Recommends recommends={recommends} />
          </div>
        </>
      )}
    </div>
  )
}

export default Detail
