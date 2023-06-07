import { useSelector } from 'react-redux'
import { Avatar } from 'antd'

import { Session } from '../../../domain/models/session.model'

import { selectSession } from '../../state/session/session.selectors'

const Header = () => {
  const session = useSelector(selectSession) as Session

  return (
    <div className='py-3 px-6 flex justify-between items-center'>
      <span className='text-lg font-medium'>TodoApp</span>
      <div className='flex items-center gap-2'>
        <span className='text-sm'>{session.user.name}</span>
        <Avatar className='bg-primary'>
          {session.user.name[0].toUpperCase()}
        </Avatar>
      </div>
    </div>
  )
}

export default Header
