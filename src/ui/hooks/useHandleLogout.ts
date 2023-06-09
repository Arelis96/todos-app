import { useDispatch } from 'react-redux'
import { App } from 'antd'

import { logout } from '../state/session/session.slice'

const useHandleLogout = () => {
  const { modal } = App.useApp()

  const dispatch = useDispatch()

  return () => {
    modal.confirm({
      title: 'Cerrar sesión',
      content: '¿Estás seguro?',
      onOk: (close) => {
        dispatch(logout())
        close()
      },
    })
  }
}

export default useHandleLogout
