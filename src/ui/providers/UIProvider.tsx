import type { ReactNode } from 'react'
import { ConfigProvider } from 'antd'

import antdEsLocale from 'antd/lib/locale/es_ES'

export type UIProviderProps = {
  children: ReactNode
}

const UIProvider = ({ children }: UIProviderProps) => {
  return (
    <ConfigProvider
      locale={antdEsLocale}
      theme={{
        token: {
          colorPrimary: '#40128B',
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default UIProvider
