<template>
  <section class="profile-card card" aria-labelledby="dashboard-title">
    <h2 id="dashboard-title">Dashboard</h2>
    <p>Overview of tickets</p>

    <div class="stats" :style="{marginTop:12}">
      <div class="stat card">
        <div>Total tickets</div>
        <div :style="{fontSize:20, fontWeight:700}">{{ total }}</div>
      </div>

      <div class="stat card">
        <div>Open</div>
        <div :style="{fontSize:20, fontWeight:700}">{{ open }}</div>
      </div>

      <div class="stat card">
        <div>In progress</div>
        <div :style="{fontSize:20, fontWeight:700}">{{ inProgress }}</div>
      </div>

      <div class="stat card">
        <div>Resolved</div>
        <div :style="{fontSize:20, fontWeight:700}">{{ closed }}</div>
      </div>
    </div>

    <div class="btn">
      <router-link to="/tickets"><button>Go to Tickets</button></router-link>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, inject } from 'vue'
import { loadTickets } from '/src/lib/storage.js'

export default {
  setup() {
    const total = ref(0)
    const open = ref(0)
    const inProgress = ref(0)
    const closed = ref(0)
    const showToast = inject('showToast', null)

    const loadStats = () => {
      try {
        const tickets = loadTickets()
        total.value = tickets.length
        open.value = tickets.filter(t => t.status === 'open').length
        inProgress.value = tickets.filter(t => t.status === 'in_progress').length
        closed.value = tickets.filter(t => t.status === 'closed').length
      } catch (error) {
        console.error('Error loading ticket stats:', error)
        if (typeof showToast === 'function') showToast('Failed to load ticket statistics', 'error')
      }
    }

    onMounted(() => {
      loadStats()
    })

    return {
      total,
      open,
      inProgress,
      closed
    }
  }
}
</script>