import { createContext, useContext, useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db, googleProvider, githubProvider } from '../config/firebase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  // Sign in with email and password
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: userCredential.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      // Check if user document exists, if not create it
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          displayName: user.displayName || 'User',
          role: 'user', // Default role
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      }

      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Sign in with GitHub
  const signInWithGitHub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider)
      const user = result.user

      // Check if user document exists, if not create it
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0] || 'User',
          role: 'user', // Default role
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      }

      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth)
      setUserRole(null)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Get user role from Firestore
  const getUserRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        return userDoc.data().role || 'user'
      }
      return 'user' // Default role
    } catch (error) {
      console.error('Error getting user role:', error)
      return 'user'
    }
  }

  // Update user role (admin only)
  const updateUserRole = async (uid, newRole) => {
    try {
      await setDoc(
        doc(db, 'users', uid),
        { role: newRole, updatedAt: new Date().toISOString() },
        { merge: true }
      )
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Check if user has specific role
  const hasRole = (requiredRole) => {
    if (!userRole) return false
    
    // Role hierarchy: admin > moderator > user
    const roleHierarchy = {
      user: 1,
      moderator: 2,
      admin: 3
    }
    
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
  }

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(userRole)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user)
        const role = await getUserRole(user.uid)
        setUserRole(role)
      } else {
        setCurrentUser(null)
        setUserRole(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userRole,
    loading,
    login,
    signInWithGoogle,
    signInWithGitHub,
    logout,
    updateUserRole,
    hasRole,
    hasAnyRole
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}


