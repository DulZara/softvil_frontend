// src/features/auth/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Base URL for your backend
const BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080/eventManagement'

// ─── Thunk: login ────────────────────────────────────────────────────────────────
// 1) POST /auth/login → { token, tokenType }
// 2) GET  /user/me   → { name, email, role }
export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // 1️⃣ Login
      const {
        data: { token, tokenType }
      } = await axios.post(`${BASE_URL}/auth/login`, { email, password })

      // 2️⃣ Load profile
      const {
        data: { name, email: userEmail, role }
      } = await axios.get(`${BASE_URL}/user/me`, {
        headers: { Authorization: `${tokenType} ${token}` }
      })

      return { token, tokenType, name, email: userEmail, role }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Login failed'
      return rejectWithValue(message)
    }
  }
)

// ─── Thunk: register ─────────────────────────────────────────────────────────────
// POST /auth/register → {} (or new user ID)
export const registerThunk = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password
      })
      return response.data
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Registration failed'
      return rejectWithValue(message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // login state
    token: null,
    tokenType: null,
    name: null,
    email: null,
    role: null,     // "ADMIN" or "USER"

    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,

    // registration state
    registerStatus: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
    registerError: null
  },
  reducers: {
    logout(state) {
      state.token          = null
      state.tokenType      = null
      state.name           = null
      state.email          = null
      state.role           = null
      state.status         = 'idle'
      state.error          = null
      state.registerStatus = 'idle'
      state.registerError  = null
    }
  },
  extraReducers: builder => {
    // ─── loginThunk ────────────────────────────────────────────────────────────────
    builder
      .addCase(loginThunk.pending, state => {
        state.status = 'loading'
        state.error  = null
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.status    = 'succeeded'
        state.token     = payload.token
        state.tokenType = payload.tokenType
        state.name      = payload.name
        state.email     = payload.email
        state.role      = payload.role
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error  = payload
      })

    // ─── registerThunk ────────────────────────────────────────────────────────────
    builder
      .addCase(registerThunk.pending, state => {
        state.registerStatus = 'loading'
        state.registerError  = null
      })
      .addCase(registerThunk.fulfilled, state => {
        state.registerStatus = 'succeeded'
      })
      .addCase(registerThunk.rejected, (state, { payload }) => {
        state.registerStatus = 'failed'
        state.registerError  = payload
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
