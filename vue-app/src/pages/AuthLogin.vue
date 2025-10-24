<template>
  <section class="profile-card card" aria-labelledby="login-title">
    <h2 id="login-title">Login</h2>
    <form @submit.prevent="submit" :aria-describedby="errors.form ? 'login-error' : undefined" novalidate>
      <div v-if="errors.form" id="login-error" role="alert" style="color:red">{{ errors.form }}</div>
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
        <label for="pwd">Password</label>
        <input 
          id="pwd" 
          type="password" 
          v-model="password"
          :aria-describedby="errors.password ? 'err-pwd' : undefined"
        />
        <small v-if="errors.password" id="err-pwd" role="alert" style="color:red">{{ errors.password }}</small>
      </div>

      <div style="display:flex; gap:8px">
        <button type="submit">Login</button>
        <router-link to="/auth/signup">
          <button type="button" class="secondary">Sign up</button>
        </router-link>
      </div>

      <p style="margin-top:10px; color:#555">Need an account? Click Sign up to create one.</p>
    </form>
  </section>
</template>

<script>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { mockLogin } from '../lib/auth'

export default {
  name: 'AuthLogin',
  props: {
    showToast: {
      type: Function,
      required: false
    }
  },
  setup(props) {
    const router = useRouter()
    const injectedShowToast = inject('showToast', null)
    const email = ref('')
    const password = ref('')
    const errors = ref({})

    const submit = async () => {
      errors.value = {}
      if (!email.value.trim()) {
        errors.value = { email: 'Email is required' }
        return
      }
      if (!password.value) {
        errors.value = { password: 'Password is required' }
        return
      }

      try {
        await mockLogin({
          email: email.value,
          password: password.value
        })
        const toastFn = props.showToast || injectedShowToast
        if (typeof toastFn === 'function') {
          toastFn('Login successful', 'success')
        }
        router.push('/dashboard')
      } catch (err) {
        errors.value = { form: err.message }
    }

    return {
      email,
      password,
      isLoading,
      handleLogin
    }
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
  padding: 2rem;
}

.auth-form {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-form h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-link {
  text-align: center;
  margin-top: 1rem;
}

.auth-link a {
  color: var(--primary-color);
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>