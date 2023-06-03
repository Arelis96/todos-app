import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Session } from '../../../domain/models/session.model'

import { StateSliceKeys } from '../constants'

const initialState = null as unknown as Session | undefined

const sessionSlice = createSlice({
  name: StateSliceKeys.SESSION,
  initialState,
  reducers: {
    login: (_, action: PayloadAction<Session>) => {
      return action.payload
    },
    logout: () => initialState,
  },
})

export const { login, logout } = sessionSlice.actions

export default sessionSlice.reducer
