/* eslint-disable @typescript-eslint/ban-types */
import useIsOnline from '../hooks/useIsOnline'
import useMessageService from '../hooks/useMessage'

export const useOnlineAction = () => {
  const isOnline = useIsOnline()

  const messageService = useMessageService()

  return (action: Function) => {
    if (!isOnline) {
      messageService.showOfflineWarning()
      return
    }
    action()
  }
}
