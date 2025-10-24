const SESSION_KEY = 'ticketapp_session'
const USERS_KEY = 'ticketapp_users'

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('Failed to load users:', e)
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function createUser({ name, email, password }) {
  const users = getStoredUsers()
  const exists = users.find(u => u.email === email)
  if (exists) throw new Error('Email already registered')

  const user = {
    id: Date.now(),
    name,
    email,
    password, // In a real app, this would be hashed
    createdAt: Date.now()
  }

  users.push(user)
  saveUsers(users)
  return user
}

export function createSession(user){
  const payload = {
    token: Math.random().toString(36).slice(2),
    user: { ...user, password: undefined }, // Never expose password in session
    expiresAt: Date.now() + 1000 * 60 * 60 * 6 // 6 hours
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload))
  return payload
}

export function getSession(){
  try{
    const raw = localStorage.getItem(SESSION_KEY)
    if(!raw) return null
    const s = JSON.parse(raw)
    if(s.expiresAt && s.expiresAt < Date.now()){
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return s
  }catch(error){
    console.log(error)
    return null
  }
}

export function clearSession(){
  localStorage.removeItem(SESSION_KEY)
}

export function isAuthenticated(){
  return !!getSession()
}

// Login with stored users
export function mockLogin({email, password}){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      const users = getStoredUsers()
      const user = users.find(u => u.email === email)

      if (!user || user.password !== password) {
        reject(new Error('Invalid email or password'))
        return
      }

      resolve(createSession(user))
    }, 400)
  })
}
