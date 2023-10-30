import {
  configureStore,
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import {Alert} from '@lib/types'

const alertInitialState: Array<Alert> = []

export const alertAddThenRemove: (arg0: Alert) => any = createAsyncThunk(
  'alert/alertAddThenRemove',
  (alert: Alert, thunkAPI) => {
    const dateKey = +dayjs()

    const _alert = {
      ...alert,
      dateKey,
      timeoutID: window.setTimeout(() => {
        thunkAPI.dispatch(alertSlice.actions.alertRemove(dateKey))
      }, 3000),
    }

    thunkAPI.dispatch(alertSlice.actions.alertAdd(_alert))

    return _alert
  }
)

const alertSlice = createSlice({
  name: 'alert',
  initialState: alertInitialState,
  reducers: {
    alertAdd: (state, action: PayloadAction<Alert>) => {
      return [...state, action.payload]
    },
    alertRemove: (state, action: PayloadAction<number>) => {
      return state.filter((x) => x.dateKey != action.payload)
    },
  },
})

export const {alertAdd, alertRemove} = alertSlice.actions

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
