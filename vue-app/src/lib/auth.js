import { setStorageItem, getStorageItem, removeStorageItem } from './storage'

// 6 hours in milliseconds
const SESSION_EXPIRY = 6 * 60 * 60 * 1000

// Utility functions for user storage
const getUsersFromStorage = () => {
  return getStorageItem('users') || []
}

const saveUsersToStorage = (users) => {
  setStorageItem('users', users)
}

export const createUser = (userData) => {
  const users = getUsersFromStorage()
  
  // Check if email already exists
  if (users.some(u => u.email === userData.email)) {
    throw new Error('Email already registered')
  }

  const user = {
    id: 'u_' + Math.random().toString(36).slice(2),
    name: userData.name || userData.email.split('@')[0],
    email: userData.email,
    password: userData.password, // In real app, would hash password
    createdAt: Date.now()
  }

  users.push(user)
  saveUsersToStorage(users)
  return user
}

export const createSession = (user) => {
  // Remove password from session data
  const sessionUser = { ...user }
  delete sessionUser.password
  setStorageItem('auth', sessionUser, { expiresIn: SESSION_EXPIRY })
  return sessionUser
}

export const mockLogin = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsersFromStorage()
      const user = users.find(u => u.email === credentials.email)
      
      if (user && user.password === credentials.password) {
        const sessionUser = createSession(user)
        resolve(sessionUser)
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 500)
  })
}

export const getSession = () => {
  return getStorageItem('auth')
}

export const clearSession = () => {
  removeStorageItem('auth')
}

export const isAuthenticated = () => {
  return !!getSession()
}