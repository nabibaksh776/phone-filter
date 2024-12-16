'use client'
import { configureStore } from '@reduxjs/toolkit'

// import VoiceSlice from "@/redux/voice/VoiceSlice"
import Slice from './Global/Slice'
// the store_room
export const store = configureStore({
  reducer: {
    global: Slice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
