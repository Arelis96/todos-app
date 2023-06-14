import { useEffect, useState } from 'react'

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  const onChangeStatus = () => {
    setIsOnline(navigator.onLine)
  }

  useEffect(() => {
    window.addEventListener('online', onChangeStatus)
    window.addEventListener('offline', onChangeStatus)
    return () => {
      window.removeEventListener('online', onChangeStatus)
      window.removeEventListener('offline', onChangeStatus)
    }
  }, [])

  return isOnline
}

export default useIsOnline
