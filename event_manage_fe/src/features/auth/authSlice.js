// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Base URL for your backend
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/eventManagement'

// Thunk: login
export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password }
      )
      return response.data       // { token, tokenType }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Thunk: register
export const registerThunk = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/register`,
        { name, email, password }
      )
      return response.data       // often an ID or empty object
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    status: 'idle',          // for login
    error: null,             // login error
    registerStatus: 'idle',  // for registration
    registerError: null      // registration error
  },
  reducers: {
    logout(state) {
      state.token = null
    }
  },
  extraReducers: builder => {
    // ─── LOGIN ───────────────────────────────────────────────────────────────
    builder
      .addCase(loginThunk.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.token = payload.token
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

    // ─── REGISTER ────────────────────────────────────────────────────────────
    builder
      .addCase(registerThunk.pending, state => {
        state.registerStatus = 'loading'
        state.registerError = null
      })
      .addCase(registerThunk.fulfilled, state => {
        state.registerStatus = 'succeeded'
      })
      .addCase(registerThunk.rejected, (state, { payload }) => {
        state.registerStatus = 'failed'
        state.registerError = payload
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
