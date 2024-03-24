import { configureStore } from '@reduxjs/toolkit'
import hotelReducer from './hotel'

export default configureStore({
  reducer: {
    hotel: hotelReducer
  }
})
