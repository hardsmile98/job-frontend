import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import classes from './Detail.module.css'
import useHttp from '../../hooks/useHttp'
import Loader from '../../components/Loader/Loader'
import Crumbs from '../../components/Crumbs/Crumbs'
import JobDetail from '../../components/JobDetail/JobDetail'
import Recommends from '../../components/Recommends/Recommends'

const Detail = () => {
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState(null)
  const [recommends, setRecommends] = useState(null)
  const { id } = useParams()
  const { request } = useHttp()

  const fetch = useCallback(async () => {
    try {
      const data = await request(`/api/job/${id}`, 'GET', null)
      setDetail(data.detail)
      setRecommends(data.recommends)
    } catch (e) {}
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
      <Crumbs currentLink={detail.job} />
      <div className={classes.Main}>
        <JobDetail detail={detail} />
        <Recommends recommends={recommends} />
      </div>
    </div>
  )
}

export default Detail
