<template>
  <form @submit.prevent="submit" class="card" style="margin-top: 12px">
    <div style="display: flex; justify-content: space-between; align-items: center">
      <strong>{{ initial ? 'Edit Ticket' : 'New Ticket' }}</strong>
      <div>
        <button type="button" class="secondary" @click="onCancel">Cancel</button>
      </div>
    </div>

    <div class="form-group">
      <label for="t-title">Title</label>
      <input 
        id="t-title" 
        type="text" 
        v-model="title" 
        :aria-describedby="errors.title ? 'err-title' : undefined" 
      />
      <small v-if="errors.title" id="err-title" role="alert" style="color: red">{{ errors.title }}</small>
    </div>

    <div class="form-group">
      <label for="t-status">Status</label>
      <select 
        id="t-status" 
        v-model="status" 
        :aria-describedby="errors.status ? 'err-status' : undefined"
      >
        <option value="open">open</option>
        <option value="in_progress">in_progress</option>
        <option value="closed">closed</option>
      </select>
      <small v-if="errors.status" id="err-status" role="alert" style="color: red">{{ errors.status }}</small>
    </div>

    <div class="form-group">
      <label for="t-desc">Description (optional)</label>
      <textarea 
        id="t-desc" 
        v-model="description" 
        :aria-describedby="errors.description ? 'err-desc' : undefined"
      />
      <small v-if="errors.description" id="err-desc" role="alert" style="color: red">{{ errors.description }}</small>
    </div>

    <div>
      <button type="submit">{{ initial ? 'Update' : 'Create' }}</button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

const allowed = ['open', 'in_progress', 'closed']

function getId() {
  return 't_' + Math.random().toString(36).slice(2,9)
}

export default {
  name: 'TicketForm',
  props: {
    initial: {
      type: Object,
      default: null
    },
    onCreate: {
      type: Function,
      required: true
    },
    onUpdate: {
      type: Function,
      required: true
    },
    onCancel: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const title = ref(props.initial ? props.initial.title : '')
    const status = ref(props.initial ? props.initial.status : 'open')
    const description = ref(props.initial ? props.initial.description : '')
    const errors = ref({})

    const validate = () => {
      const errs = {}
      if (!title.value.trim()) errs.title = 'Title is required.'
      if (!allowed.includes(status.value)) errs.status = 'Invalid status.'
      if (description.value && description.value.length > 1000) errs.description = 'Description too long.'
      errors.value = errs
      return Object.keys(errs).length === 0
    }

    const submit = (e) => {
      if (!validate()) return
      const now = Date.now()
      if (props.initial) {
        props.onUpdate({
          ...props.initial,
          title: title.value.trim(),
          status: status.value,
          description: description.value.trim(),
          updatedAt: now
        })
      } else {
        const t = {
          id: getId(),
          title: title.value.trim(),
          status: status.value,
          description: description.value.trim(),
          createdAt: now,
          updatedAt: now
        }
        props.onCreate(t)
        title.value = ''
        status.value = 'open'
        description.value = ''
      }
    }

    return {
      title,
      status,
      description,
      errors,
      submit
    }
  }
}
</script>

<style scoped>
.ticket-form {
  padding: 2rem 0;
}

.ticket-form h1 {
  margin-bottom: 2rem;
}

form {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

textarea.form-control {
  resize: vertical;
  min-height: 100px;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }

  .form-actions .btn {
    width: 100%;
  }
}
</style>