import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import NavigationApp from './NavigationApp'

const router = createBrowserRouter([{ path: '*', element: <NavigationApp /> }])

const AppRouterProvider = () => {
  return <RouterProvider router={router} />
}

export default AppRouterProvider
