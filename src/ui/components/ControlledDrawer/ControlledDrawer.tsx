import { Drawer } from 'antd'
import { cloneElement } from 'react'

import { ControlledDrawerProps, DrawerChildren } from './ControlledDrawer.types'

const ControlledDrawer = ({
  visibleState,
  children,
  afterClose,
  ...props
}: ControlledDrawerProps) => {
  const newChildren = cloneElement((children || <></>) as DrawerChildren, {
    close: visibleState.close,
  })

  const onClose = () => {
    visibleState.close()
    if (afterClose) {
      afterClose()
    }
  }

  return (
    <Drawer open={visibleState.visible} onClose={onClose} {...props}>
      {newChildren}
    </Drawer>
  )
}

ControlledDrawer.defaultProps = {
  footer: null,
} as ControlledDrawerProps

export default ControlledDrawer
