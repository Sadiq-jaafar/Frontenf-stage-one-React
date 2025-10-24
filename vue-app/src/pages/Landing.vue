<template>
  <div>
    <section class="hero" aria-labelledby="hero-title">
      <div class="circle one" aria-hidden="true"></div>
      <div class="circle two" aria-hidden="true"></div>

      <div class="hero-inner container">
        <div>
          <h1 id="hero-title">TicketApp — Manage work like magic</h1>
          <p>A simple multi-frontend ticket manager stage 2 (Vue implementation). Create, update, and track tickets with a clean interface.</p>
          <p style="margin-top: 12px">
            <router-link class="cta primary" to="/auth/login">Login</router-link>
            <span style="margin-left: 10px"></span>
            <router-link class="cta ghost" to="/auth/signup">Get Started</router-link>
          </p>
        </div>

        <div class="card" aria-hidden="true">
          <strong>Quick features</strong>
          <ul style="margin-top: 12px">
            <li>Auth (localStorage)</li>
            <li>Ticket CRUD</li>
            <li>Protected routes</li>
            <li>Accessible forms</li>
          </ul>
        </div>
      </div>

      <div class="wave" aria-hidden="true">
        <img src="/hero-wave.svg" alt="" style="width: 100%" />
      </div>
    </section>

    <section style="margin-top: 80px" class="profile-card card">
      <h2>Why this demo</h2>
      <p>This project demonstrates consistent visuals and behavior across frameworks. The Vue version is an app using localStorage for persistence.</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Landing'
}
</script>