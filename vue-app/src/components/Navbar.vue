<template>
  <nav class="nav" aria-label="Main navigation">
    <button 
      class="nav-toggle" 
      @click="toggleMenu"
      :aria-expanded="isOpen"
      aria-controls="nav-menu"
    >
      <span class="sr-only">Menu</span>
      <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>

    <div :class="['nav-menu', { 'show': isOpen }]" id="nav-menu">
      <router-link to="/" @click="toggleMenu">Home</router-link>
      <router-link to="/tickets" @click="toggleMenu">Tickets</router-link>
      <router-link to="/dashboard" @click="toggleMenu">Dashboard</router-link>
      <template v-if="!session">
        <router-link to="/auth/login" @click="toggleMenu">Login</router-link>
      </template>
      <template v-else>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </template>
    </div>
  </nav>
</template>

<script>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getSession, clearSession } from '../lib/auth'

// Reactive auth state
const useAuth = () => {
  const session = ref(getSession())
  
  // Update session when storage changes
  window.addEventListener('storage', (e) => {
    if (e.key === 'auth') {
      session.value = e.newValue ? JSON.parse(e.newValue).value : null
    }
  })

  // Check session periodically
  setInterval(() => {
    session.value = getSession()
  }, 1000)

  return session
}

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter()
    const session = useAuth()
    const isOpen = ref(false)

    const logout = () => {
      clearSession()
      router.push('/')
    }

    const toggleMenu = () => {
      isOpen.value = !isOpen.value
    }

    const handleLogout = () => {
      logout()
      toggleMenu()
    }

    return {
      session,
      isOpen,
      toggleMenu,
      handleLogout
    }
  }
}
</script>