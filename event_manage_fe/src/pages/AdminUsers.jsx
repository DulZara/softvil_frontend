// src/pages/AdminUsers.jsx
import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Alert
} from '@mui/material'
import axiosClient from '../api/axiosClient'  // adjust path if needed

export default function AdminUsers() {
  const [users, setUsers]         = useState([])
  const [loading, setLoading]     = useState(false)
  const [updating, setUpdating]   = useState({})    // { [userId]: bool }
  const [error, setError]         = useState(null)

  // 1️⃣ Fetch users on mount
  useEffect(() => {
    setLoading(true)
    axiosClient.get('/admin/users')
      .then(res => setUsers(res.data))
      .catch(err => setError(err.message || 'Failed to load users'))
      .finally(() => setLoading(false))
  }, [])

  // update local state when select changes
  const handleRoleChange = (userId, newRole) => {
    setUsers(us =>
      us.map(u => (u.id === userId ? { ...u, role: newRole } : u))
    )
  }

  // call backend to persist
  const handleUpdate = userId => {
    const user = users.find(u => u.id === userId)
    if (!user) return

    setUpdating(u => ({ ...u, [userId]: true }))
    axiosClient
      .put(`/admin/users/${userId}/role`, { role: user.role })
      .then(() => {
        // optionally show a toast/snackbar here
      })
      .catch(err => {
        setError(`Couldn't update ${user.email}: ${err.response?.data?.message || err.message}`)
      })
      .finally(() => {
        setUpdating(u => ({ ...u, [userId]: false }))
      })
  }

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading
        ? <CircularProgress />
        : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      size="small"
                      onChange={e => handleRoleChange(user.id, e.target.value)}
                    >
                      <MenuItem value="USER">User</MenuItem>
                      <MenuItem value="ADMIN">Admin</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      disabled={updating[user.id]}
                      onClick={() => handleUpdate(user.id)}
                    >
                      {updating[user.id]
                        ? <CircularProgress size={16} color="inherit" />
                        : 'Change'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      }
    </Box>
  )
}
