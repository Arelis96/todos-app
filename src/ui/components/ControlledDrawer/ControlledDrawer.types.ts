/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement } from 'react'
import { DrawerProps } from 'antd'

export type ControlledDrawerProps = {
  visibleState: {
    visible: boolean
    open?: () => void
    close: () => void
  }
  afterClose?: () => void
} & DrawerProps

export type DrawerChildren = ReactElement<
  any,
  string | JSXElementConstructor<any>
>
