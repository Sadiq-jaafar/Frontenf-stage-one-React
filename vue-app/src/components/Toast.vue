<template>
  <Transition name="toast">
    <div v-if="show" 
         class="toast" 
         role="status" 
         :aria-live="type === 'error' ? 'assertive' : 'polite'"
         :style="toastStyle">
      {{ msg }}
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    msg: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info'
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    variantStyles() {
      return {
        success: { background: '#2f855a', color: '#fff' }, // green
        error: { background: '#b00020', color: '#fff' },   // red
        info: { background: '#111', color: '#fff' }        // dark
      }
    },
    toastStyle() {
      return {
        ...(this.variantStyles[this.type] || this.variantStyles.info),
        padding: '0.8rem 1rem',
        borderRadius: '8px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        maxWidth: '420px'
      }
    }
  }
}
</script>

<style>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>