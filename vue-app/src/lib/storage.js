export const getTicketsKey = (userId) => `tickets_${userId}`

export const setStorageItem = (key, value, options = {}) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
      ...options
    }
    localStorage.setItem(key, JSON.stringify(item))
  } catch (error) {
    console.error('Error setting storage item:', error)
  }
}

export const getStorageItem = (key) => {
  try {
    const item = localStorage.getItem(key)
    if (!item) return null

    const parsed = JSON.parse(item)
    
    // Check expiration if set
    if (parsed.expiresIn) {
      const now = Date.now()
      const expiresAt = parsed.timestamp + parsed.expiresIn
      
      if (now > expiresAt) {
        localStorage.removeItem(key)
        return null
      }
    }
    
    return parsed.value
  } catch (error) {
    console.error('Error getting storage item:', error)
    return null
  }
}

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing storage item:', error)
  }
}

export const loadTickets = (skipAuth = false) => {
  const user = getStorageItem('auth')
  if (!skipAuth && !user) throw new Error('Not authenticated')
  return getStorageItem(getTicketsKey(user?.id)) || []
}

export const addTicket = (ticket) => {
  const user = getStorageItem('auth')
  if (!user) throw new Error('Not authenticated')
  
  const tickets = loadTickets(true)
  tickets.push({ ...ticket, userId: user.id })
  setStorageItem(getTicketsKey(user.id), tickets)
}

export const updateTicket = (ticket) => {
  const user = getStorageItem('auth')
  if (!user) throw new Error('Not authenticated')
  
  const tickets = loadTickets(true)
  const index = tickets.findIndex(t => t.id === ticket.id)
  if (index === -1) throw new Error('Ticket not found')
  
  tickets[index] = { ...ticket, userId: user.id }
  setStorageItem(getTicketsKey(user.id), tickets)
}

export const deleteTicket = (ticketId) => {
  const user = getStorageItem('auth')
  if (!user) throw new Error('Not authenticated')
  
  const tickets = loadTickets(true)
  const filtered = tickets.filter(t => t.id !== ticketId)
  setStorageItem(getTicketsKey(user.id), filtered)
}