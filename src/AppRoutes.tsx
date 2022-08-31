import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
// import Loadable from 'modules/loading/Loadable'
import { Home } from './features/home/Home'
import ReactGA from 'react-ga'
import { useCurrentUserId } from './features/users/useCurrentUserId'
// import { find } from 'lodash'

// const PUBLIC_PATHS = ['/login', '/signup']

export default function AppRouter () {
  const [userId, userIdLoading] = useCurrentUserId()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  }, [location.pathname])

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
      {/* <Route path='/profiles/:profileId' element={<ProfileDetail />} /> */}
    </Routes>
  )
}
