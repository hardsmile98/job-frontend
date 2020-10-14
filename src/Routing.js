import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { authContext } from './context/authContext'
import Container from './hoc/Container/Container'
import Nav from './components/Nav/Nav'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Reg from './pages/Auth/Reg'
import Add from './pages/Add/Add'
import Detail from './pages/Detail/Detail'
import Profile from './pages/Profile/Profile'

const Routing = () => {
  const { token } = useContext(authContext)
  const isAuth = !!token

  let routes = (
    <Switch>
      <Route path="/job/:id" component={Detail} />
      <Route path="/add" component={Add} />
      <Route path="/profile" component={Profile} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  )

  if (!isAuth) {
    routes = (
      <Switch>
        <Route path="/job/:id" component={Detail} />
        <Route path="/reg" component={Reg} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <BrowserRouter>
      <Nav />
      <Container>{routes}</Container>
    </BrowserRouter>
  )
}

export default Routing
