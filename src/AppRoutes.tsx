import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
// import Loadable from 'modules/loading/Loadable'
import { Home } from './features/home/Home'
import ReactGA from 'react-ga'
import { useAuth } from 'features/users/useAuth'
import { ProfileDetail } from 'features/profile/ProfileDetail'
import { ProfileEdit } from 'features/profile/ProfileEdit'
// import { find } from 'lodash'

// const PUBLIC_PATHS = ['/login', '/signup']

export default function AppRouter () {
  const { auth, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    // if ()
  }, [!!auth])

  // useEffect(() => {
  //   if (location.pathname === '/') return navigate('/w')
  //   if (userIdLoading || userId || find(PUBLIC_PATHS, (path) => location.pathname.startsWith(path))) return
  //   navigate('/login', {
  //     state: {
  //       redirectTo: location.pathname,
  //       redirectState: location.state,
  //     },
  //   })
  // }, [location.pathname, location.state, navigate, userId, userIdLoading])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profiles/:account' element={<ProfileDetail />} />
      <Route path='/profiles/edit' element={<ProfileEdit />} />
    </Routes>
  )
}
