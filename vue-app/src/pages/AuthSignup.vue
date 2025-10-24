<template>
  <section class="profile-card card" aria-labelledby="signup-title">
    <h2 id="signup-title">Create Account</h2>
    <form @submit.prevent="submit" novalidate>
      <div class="form-group">
        <label for="name">Full name</label>
        <input 
          id="name" 
          type="text" 
          v-model="name" 
          :aria-describedby="errors.name ? 'err-name' : undefined" 
        />
        <small v-if="errors.name" id="err-name" role="alert" style="color:red">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email" 
          type="email" 
          v-model="email" 
          :aria-describedby="errors.email ? 'err-email' : undefined" 
        />
        <small v-if="errors.email" id="err-email" role="alert" style="color:red">{{ errors.email }}</small>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          id="password" 
          type="password" 
          v-model="password" 
          :aria-describedby="errors.password ? 'err-password' : undefined" 
        />
        <small v-if="errors.password" id="err-password" role="alert" style="color:red">{{ errors.password }}</small>
      </div>

      <div style="display:flex; gap:8px">
        <button type="submit">Create account</button>
        <router-link to="/auth/login">
          <button type="button" class="secondary">Back to login</button>
        </router-link>
      </div>
    </form>
  </section>
</template>

<script>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { createUser, createSession } from '../lib/auth'

export default {
  name: 'AuthSignup',
  props: {
    showToast: {
      type: Function,
      required: false
    }
  },
  setup(props) {
    const router = useRouter()
    const injectedShowToast = inject('showToast', null)
    
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const errors = ref({})

    const submit = async (e) => {
      const errs = {}
      if (!name.value.trim()) errs.name = 'Name required'
      if (!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
        errs.email = 'Valid email required'
      }
      if (!password.value || password.value.length < 6) {
        errs.password = 'Password must be >= 6 chars'
      }
      errors.value = errs
      if (Object.keys(errs).length) return

      try {
        const user = createUser({ 
          name: name.value, 
          email: email.value, 
          password: password.value 
        })
        createSession(user)
        const toastFn = props.showToast || injectedShowToast
        if (typeof toastFn === 'function') {
          toastFn('Account created — logged in', 'success')
        }
        router.push('/dashboard')
      } catch (err) {
        errors.value = { form: err.message }
      }
    }

    return {
      name,
      email,
      password,
      errors,
      submit
    }
  }
}
</script>