import StateProvider from './ui/state/StateProvider'
import UIProvider from './ui/providers/UIProvider'
import QueryProvider from './ui/providers/QueryProvider'
import AppRouterProvider from './ui/navigation/AppRouterProvider'

const App = () => {
  return (
    <StateProvider>
      <UIProvider>
        <QueryProvider>
          <AppRouterProvider />
        </QueryProvider>
      </UIProvider>
    </StateProvider>
  )
}

export default App
