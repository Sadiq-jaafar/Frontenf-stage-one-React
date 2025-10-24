<template>
  <div>
    <Navbar />
    <router-view></router-view>
    <Toast :msg="toastMessage" :type="toastType" :show="showToast" @close="hideToast" />
    <footer class="app-footer">
      © {{ new Date().getFullYear() }} TicketApp — Built for Frontend Stage 2
    </footer>
  </div>
</template>

<script>
import { ref, provide } from 'vue'
import Toast from './components/Toast.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Toast,
    Navbar
  },
  setup() {
    const toastMessage = ref('')
    const toastType = ref('info')
    const showToast = ref(false)
    const toastTimeout = ref(null)

    const showToastMessage = (message, type = 'info') => {
      toastMessage.value = message
      toastType.value = type
      showToast.value = true

      if (toastTimeout.value) {
        clearTimeout(toastTimeout.value)
      }

      toastTimeout.value = setTimeout(() => {
        hideToast()
      }, 3500)
    }

    const hideToast = () => {
      showToast.value = false
      toastMessage.value = ''
    }

    // provide the toast function so pages can inject it instead of receiving a prop
    provide('showToast', showToastMessage)

    return {
      toastMessage,
      toastType,
      showToast,
      hideToast,
      showToastMessage
    }
  }
}
</script>