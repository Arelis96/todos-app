import { Provider, ProviderProps } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import store, { persistor } from './store'

type StateProviderProps = {
  children: ProviderProps['children']
}

const StateProvider = ({ children }: StateProviderProps) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  )
}

export default StateProvider
