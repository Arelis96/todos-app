import QueryProvider from './ui/providers/QueryProvider'
import UIProvider from './ui/providers/UIProvider'
import Login from './ui/views/Login/Login'

const App = () => {
  return (
    <UIProvider>
      <QueryProvider>
        <Login />
      </QueryProvider>
    </UIProvider>
  )
}

export default App
