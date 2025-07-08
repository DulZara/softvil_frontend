// src/api/axiosClient.js
import axios from 'axios'
import { store } from '../app/store'

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:8080/eventManagement'

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT on every request
client.interceptors.request.use(
  config => {
    const { auth } = store.getState()
    if (config.headers && auth.token && auth.tokenType) {
      config.headers.Authorization = `${auth.tokenType} ${auth.token}`
    }
    return config
  },
  error => Promise.reject(error)
)

export default client

