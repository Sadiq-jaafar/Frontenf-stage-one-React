const TICKETS_KEY = 'ticketapp_tickets'

// Load only tickets for the current user
function loadTickets(throwOnError = false){
  try{
    const raw = localStorage.getItem(TICKETS_KEY)
    const session = JSON.parse(localStorage.getItem('ticketapp_session'))
    const userId = session?.user?.id
    
    if (!userId) return []
    
    const allTickets = raw ? JSON.parse(raw) : []
    return allTickets.filter(t => t.userId === userId)
  }catch(e){ 
    console.log(e)
    if(throwOnError) throw e
    return [] 
  }
}

function saveTickets(list){
  // When saving, merge with other users' tickets
  const raw = localStorage.getItem(TICKETS_KEY)
  const allTickets = raw ? JSON.parse(raw) : []
  const session = JSON.parse(localStorage.getItem('ticketapp_session'))
  const userId = session?.user?.id

  if (!userId) return

  // Remove current user's tickets and add the new ones
  const otherTickets = allTickets.filter(t => t.userId !== userId)
  localStorage.setItem(TICKETS_KEY, JSON.stringify([...list, ...otherTickets]))
}

function addTicket(ticket){
  const session = JSON.parse(localStorage.getItem('ticketapp_session'))
  const userId = session?.user?.id
  
  if (!userId) throw new Error('Must be logged in to create tickets')
  
  const list = loadTickets()
  const newTicket = { ...ticket, userId }
  list.unshift(newTicket)
  saveTickets(list)
  return newTicket
}

function updateTicket(updated){
  const session = JSON.parse(localStorage.getItem('ticketapp_session'))
  const userId = session?.user?.id
  
  if (!userId) throw new Error('Must be logged in to update tickets')
  
  const list = loadTickets()
  const ticket = list.find(t => t.id === updated.id)
  
  if (!ticket || ticket.userId !== userId) {
    throw new Error('Cannot update ticket: not found or not authorized')
  }
  
  const newList = list.map(t => t.id === updated.id ? { ...updated, userId } : t)
  saveTickets(newList)
  return updated
}

function deleteTicket(id){
  const session = JSON.parse(localStorage.getItem('ticketapp_session'))
  const userId = session?.user?.id
  
  if (!userId) throw new Error('Must be logged in to delete tickets')
  
  const list = loadTickets()
  const ticket = list.find(t => t.id === id)
  
  if (!ticket || ticket.userId !== userId) {
    throw new Error('Cannot delete ticket: not found or not authorized')
  }
  
  const newList = list.filter(t => t.id !== id)
  saveTickets(newList)
}

export { 
  TICKETS_KEY,
  loadTickets,
  saveTickets,
  addTicket,
  updateTicket,
  deleteTicket
}
