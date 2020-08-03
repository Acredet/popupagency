<template>
  <!-- Top Bar Start -->
  <div class="topbar">
    <!-- LOGO -->
    <div class="topbar-left">
      <nuxt-link to="/lediga-lokaler" class="logo">
        <span>
          <img src="/images/logo.png" alt height="40">
        </span>
        <i>
          <img src="/favo-light.png" alt height="30">
        </i>
      </nuxt-link>
    </div>

    <nav class="navbar-custom">
      <ul class="navbar-right d-flex list-inline float-right mb-0">
        <li class="dropdown notification-list">
          <div class="dropdown notification-list nav-pro-img">
            <a
              v-if="$auth.loggedIn"
              class="dropdown-toggle nav-link text-dark font-weight-bold font-3 waves-effect nav-user"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              {{ $auth.user.name }}
            </a>
            <nuxt-link v-else class="dropdown-toggle nav-link text-dark font-weight-bold font-3 waves-effect nav-user" to="/admin/login">
              login
            </nuxt-link>
            <div v-if="$auth.loggedIn" class="dropdown-menu dropdown-menu-right profile-dropdown">
              <!-- item-->
              <nuxt-link exact class="dropdown-item" :to="`/admin/users/profile/${$auth.user._id}`">
                <i class="fas fa-user" /> Profile
              </nuxt-link>
              <div class="dropdown-divider" />
              <button type="button" class="dropdown-item text-danger" @click="logout">
                <i class="fas fa-power-off text-danger" /> Logout
              </button>
            </div>
          </div>
        </li>
      </ul>

      <ul class="list-inline menu-left mb-0">
        <li class="float-left">
          <button class="button-menu-mobile open-left waves-effect">
            <i class="fas fa-bars" />
          </button>
        </li>
        <li class="d-block">
          <div class="dropdown pt-3 d-inline-block">
            <a
              id="dropdownMenuLink"
              class="btn btn-light dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Languages</a>

            <div class="py-0 dropdown-menu" aria-labelledby="dropdownMenuLink">
              <nuxt-link exact :to="switchLocalePath('en')" class="dropdown-item">
                En-English
              </nuxt-link>
              <div class="my-0 dropdown-divider" />
              <nuxt-link exact :to="switchLocalePath('sv')" class="dropdown-item">
                Sv-Swedish
              </nuxt-link>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
  <!-- Top Bar End -->
</template>

<script>
export default {
  methods: {
    toggleClass () {
      document.body.classList.toggle('enlarged')
    },
    logout () {
      this.$auth.logout('local')
      this.$router.push('/admin/login')
    }
  }
}
</script>
