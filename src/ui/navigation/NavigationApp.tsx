import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from '../views/Login/Login'
import Register from '../views/Register/Register'
import Todos from '../views/Todos/Todos'

import { RoutePaths } from './constants'
import { selectSession } from '../state/session/session.selectors'

const NavigationApp = () => {
  const session = useSelector(selectSession)

  return (
    <Routes>
      {session ? (
        <Route path={RoutePaths.todos} element={<Todos />} />
      ) : (
        <>
          <Route path={RoutePaths.login} element={<Login />} />
          <Route path={RoutePaths.register} element={<Register />} />
        </>
      )}
      <Route
        path='*'
        element={
          <Navigate to={session ? RoutePaths.todos : RoutePaths.login} />
        }
      />
    </Routes>
  )
}

export default NavigationApp
