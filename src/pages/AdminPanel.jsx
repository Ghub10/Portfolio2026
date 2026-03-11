import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import ProtectedRoute from '../components/ProtectedRoute'
import './AdminPanel.css'

const AdminPanel = () => {
  const { currentUser, userRole, updateUserRole } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (userRole === 'admin') {
      fetchUsers()
    }
  }, [userRole])

  const fetchUsers = async () => {
    try {
      const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(usersQuery)
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setUsers(usersData)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch users')
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId, newRole) => {
    try {
      const result = await updateUserRole(userId, newRole)
      if (result.success) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        ))
      } else {
        setError(result.error || 'Failed to update role')
      }
    } catch (err) {
      setError('Failed to update role')
    }
  }

  if (loading) {
    return (
      <div className="admin-panel-container">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="admin-panel-container">
        <div className="admin-panel-content">
          <h1 className="admin-title">Admin Panel</h1>
          <p className="admin-subtitle">Manage users and roles</p>

          {error && <div className="admin-error">{error}</div>}

          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Display Name</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.displayName || 'N/A'}</td>
                    <td>
                      <span className={`role-badge role-${user.role}`}>
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td>
                      {user.createdAt 
                        ? new Date(user.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td>
                      <select
                        value={user.role || 'user'}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="role-select"
                        disabled={user.id === currentUser?.uid}
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default AdminPanel


