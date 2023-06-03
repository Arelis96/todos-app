import { RootState } from '../store'

export const selectSession = (state: RootState) => state.session
export const selectSessionUser = (state: RootState) => state.session?.user
export const selectToken = (state: RootState) => state.session?.token
