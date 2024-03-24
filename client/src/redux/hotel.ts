import { createSlice } from '@reduxjs/toolkit'

export const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    searchQuery: {
      location: '',
      checkIn: '',
      checkOut: '',
      guests: 1
    },
    userDetails: {
      isAuthenticated: false,
      name: '',
      email: '',
      role: 'user'
    }
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },

    setUserDetails: (state, action) => {
      state.userDetails = action.payload
    }
  }
})

export const { setSearchQuery, setUserDetails } = hotelSlice.actions

export default hotelSlice.reducer
