
import axios from 'axios'
import { store } from '../app/store'

// Base URL from backend:
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/eventManagement'

const _client = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  // Attach token from Redux state on every request
  _client.interceptors.request.use(
    config => {
      const { auth } = store.getState()
      if (auth?.token && config.headers) {
        config.headers.Authorization = `Bearer ${auth.token}`
      }
      return config
    },
    error => Promise.reject(error),
  )

export default _client
