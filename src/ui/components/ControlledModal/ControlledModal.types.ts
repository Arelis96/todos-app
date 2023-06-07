/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement } from 'react'
import { ModalProps } from 'antd'

export type ControlledModalProps = {
  visibleState: {
    visible: boolean
    open?: () => void
    close: () => void
  }
} & ModalProps

export type ModalChildren = ReactElement<
  any,
  string | JSXElementConstructor<any>
>
