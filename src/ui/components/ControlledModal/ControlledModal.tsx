import { cloneElement } from 'react'
import { Modal } from 'antd'

import { ControlledModalProps, ModalChildren } from './ControlledModal.types'

const ControlledModal = ({
  visibleState,
  children,
  ...props
}: ControlledModalProps) => {
  const newChildren = cloneElement((children || <></>) as ModalChildren, {
    close: visibleState.close,
  })

  return (
    <Modal open={visibleState.visible} onCancel={visibleState.close} {...props}>
      {newChildren}
    </Modal>
  )
}

ControlledModal.defaultProps = {
  footer: null,
} as ControlledModalProps

export default ControlledModal
