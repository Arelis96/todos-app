import { useState } from 'react'

const useVisible = (defaultVisible = false) => {
  const [visible, setVisible] = useState<boolean>(defaultVisible)

  const open = () => setVisible(true)

  const close = () => setVisible(false)

  return {
    visible,
    open,
    close,
  }
}

export default useVisible
