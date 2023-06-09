import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { showRequestErrorMessage } from '../util/request.util'

type QueryProviderProps = {
  children: ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: showRequestErrorMessage,
    },
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onError: showRequestErrorMessage,
    },
  },
})

const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider
