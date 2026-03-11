import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import ProtectedRoute from '../components/ProtectedRoute'
import './Profile.css'

const Profile = () => {
  const { currentUser, userRole } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'
  const email = currentUser?.email || 'N/A'
  const photoURL = currentUser?.photoURL

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <ProtectedRoute>
      <div className="profile-container">
        <div className="profile-content">
          <h1 className="profile-title">Profile</h1>

          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar-large">
                {photoURL ? (
                  <img src={photoURL} alt={displayName} />
                ) : (
                  <span>{getInitials(displayName)}</span>
                )}
              </div>
              <div className="profile-info">
                <h2 className="profile-name">{displayName}</h2>
                <p className="profile-email">{email}</p>
                <div className="profile-role">
                  Role: <span className={`role-badge role-${userRole || 'user'}`}>
                    {userRole || 'user'}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-details">
              <div className="profile-detail-item">
                <label>User ID</label>
                <p>{currentUser?.uid || 'N/A'}</p>
              </div>
              <div className="profile-detail-item">
                <label>Email Verified</label>
                <p>{currentUser?.emailVerified ? 'Yes' : 'No'}</p>
              </div>
              <div className="profile-detail-item">
                <label>Account Created</label>
                <p>
                  {currentUser?.metadata?.creationTime
                    ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <div className="profile-detail-item">
                <label>Last Sign In</label>
                <p>
                  {currentUser?.metadata?.lastSignInTime
                    ? new Date(currentUser.metadata.lastSignInTime).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Profile


