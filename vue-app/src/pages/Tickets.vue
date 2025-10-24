<template>
  <section>
    <div class="profile-card card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h2>Tickets</h2>
        <div>
          <button @click="startCreate">New Ticket</button>
        </div>
      </div>

      <TicketForm
        v-if="showForm"
        :initial="editing"
        :onCancel="() => { showForm = false; editing = null }"
        :onCreate="handleCreate"
        :onUpdate="handleUpdate"
      />

      <div style="margin-top:12px">
        <div v-if="tickets.length === 0" class="card">No tickets yet. Create one to get started.</div>

        <div v-else>
          <div v-for="t in tickets" :key="t.id" class="ticket" role="article" :aria-label="t.title">
            <div class="meta">
              <strong>{{ t.title }}</strong>
              <small>{{ t.description ? (t.description.slice(0,140)) : 'No description' }}</small>
              <small>Created: {{ formatDate(t.createdAt) }}</small>
            </div>
            <div style="text-align:right">
              <div :class="['status', t.status]">{{ t.status }}</div>
              <div class="actions" style="margin-top:8px">
                <button @click="startEdit(t)" :aria-label="`Edit ${t.title}`">Edit</button>
                <button @click="handleDelete(t.id)" :aria-label="`Delete ${t.title}`" style="background:#ffdddd;color:#900">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal
      :show="deleteModal.show"
      title="Delete Ticket"
      message="Are you sure you want to delete this ticket? This action cannot be undone."
      confirmText="Delete"
      @close="() => { deleteModal.show = false; deleteModal.ticketId = null }"
      @confirm="confirmDelete"
    />
  </section>
</template>

<script>
import { ref, onMounted, inject } from 'vue'
import { loadTickets, addTicket, updateTicket, deleteTicket as storageDelete } from '/src/lib/storage.js'
import TicketForm from './TicketForm.vue'
import Modal from '../components/Modal.vue'

export default {
  name: 'Tickets',
  components: { TicketForm, Modal },
  props: {
    showToast: {
      type: Function,
      required: false
    }
  },
  setup(props) {
    const injectedShowToast = inject('showToast', null)
    const tickets = ref([])
    const editing = ref(null)
    const showForm = ref(false)
    const deleteModal = ref({ show: false, ticketId: null })

    const load = () => {
      try {
        tickets.value = loadTickets(true)
      } catch (e) {
        console.error('Failed to load tickets', e)
        tickets.value = []
          const toastFn = props.showToast || injectedShowToast
          if (typeof toastFn === 'function') toastFn('Failed to load tickets. Please retry.', 'error')
      }
    }

    const handleCreate = (payload) => {
      addTicket(payload)
      tickets.value = loadTickets()
      showForm.value = false
      const toastFn = props.showToast || injectedShowToast
      if (typeof toastFn === 'function') toastFn('Ticket created', 'success')
    }

    const handleUpdate = (payload) => {
      updateTicket(payload)
      tickets.value = loadTickets()
      editing.value = null
      showForm.value = false
      const toastFn = props.showToast || injectedShowToast
      if (typeof toastFn === 'function') toastFn('Ticket updated', 'success')
    }

    const handleDelete = (id) => {
      deleteModal.value = { show: true, ticketId: id }
    }

    const confirmDelete = () => {
      const { ticketId } = deleteModal.value
      if (!ticketId) return
      storageDelete(ticketId)
      tickets.value = loadTickets()
      const toastFn = props.showToast || injectedShowToast
      if (typeof toastFn === 'function') toastFn('Ticket deleted', 'success')
      deleteModal.value = { show: false, ticketId: null }
    }

    const startEdit = (t) => {
      editing.value = t
      showForm.value = true
    }

    const startCreate = () => {
      editing.value = null
      showForm.value = true
    }

    const formatDate = (d) => new Date(d).toLocaleString()

    onMounted(load)

    return {
      tickets,
      editing,
      showForm,
      deleteModal,
      handleCreate,
      handleUpdate,
      handleDelete,
      confirmDelete,
      startEdit,
      startCreate,
      formatDate
    }
  }
}
</script>

<style scoped>
.ticket {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px;
  border-radius: 6px;
  background: white;
  margin-bottom: 8px;
}

.ticket .meta small {
  display: block;
  color: #666;
}

.status {
  padding: 6px 10px;
  border-radius: 4px;
  color: #fff;
  text-transform: capitalize;
}

.status.open { background: #2d8fdd }
.status.in_progress { background: #f0ad4e }
.status.closed { background: #6c757d }

.actions button { margin-left: 8px }

</style>