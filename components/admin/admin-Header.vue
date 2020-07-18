<template>
  <!-- Top Bar Start -->
  <div class="topbar">
    <!-- LOGO -->
    <div class="topbar-left">
      <a href="index.html" class="logo">
        <span>
          <img src="/favo.png" alt height="60">
        </span>
        <i>
          <img src="/favo.png" alt height="30">
        </i>
      </a>
    </div>

    <nav class="navbar-custom">
      <ul class="navbar-right d-flex list-inline float-right mb-0">
        <li class="dropdown notification-list">
          <a
            class="nav-link dropdown-toggle arrow-none waves-effect text-dark"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="false"
            aria-expanded="false"
          >
            <i class="far fa-bell" style="font-size: 23px" />
            <span class="badge badge-pill badge-danger noti-icon-badge">3</span>
          </a>
          <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg">
            <!-- item-->
            <h6 class="dropdown-item-text">
              Notifications (258)
            </h6>
            <div class="slimscroll notification-item-list">
              <!-- item-->
              <a href="javascript:void(0);" class="dropdown-item notify-item active">
                <div class="notify-icon bg-success">
                  <i class="mdi mdi-cart-outline" />
                </div>
                <p class="notify-details">
                  Your order is placed
                  <span class="text-muted">Dummy text of the printing and typesetting industry.</span>
                </p>
              </a>
              <!-- item-->
              <a href="javascript:void(0);" class="dropdown-item notify-item">
                <div class="notify-icon bg-warning">
                  <i class="mdi mdi-message" />
                </div>
                <p class="notify-details">
                  New Message received
                  <span class="text-muted">You have 87 unread messages</span>
                </p>
              </a>
              <!-- item-->
              <a href="javascript:void(0);" class="dropdown-item notify-item">
                <div class="notify-icon bg-info">
                  <i class="mdi mdi-martini" />
                </div>
                <p class="notify-details">
                  Your item is shipped
                  <span class="text-muted">It is a long established fact that a reader will</span>
                </p>
              </a>
              <!-- item-->
              <a href="javascript:void(0);" class="dropdown-item notify-item">
                <div class="notify-icon bg-primary">
                  <i class="mdi mdi-cart-outline" />
                </div>
                <p class="notify-details">
                  Your order is placed
                  <span class="text-muted">Dummy text of the printing and typesetting industry.</span>
                </p>
              </a>
              <!-- item-->
              <a href="javascript:void(0);" class="dropdown-item notify-item">
                <div class="notify-icon bg-danger">
                  <i class="mdi mdi-message" />
                </div>
                <p class="notify-details">
                  New Message received
                  <span class="text-muted">You have 87 unread messages</span>
                </p>
              </a>
            </div>
            <!-- All-->
            <a href="javascript:void(0);" class="dropdown-item text-center text-primary">
              View all
              <i class="fi-arrow-right" />
            </a>
          </div>
        </li>
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
              <button type="button" class="dropdown-item text-danger" @click="$auth.logout()">
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
        <li class="d-none d-sm-block">
          <div class="dropdown pt-3 d-inline-block">
            <a
              id="dropdownMenuLink"
              class="btn btn-light dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Create</a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
              <div class="dropdown-divider" />
              <a class="dropdown-item" href="#">Separated link</a>
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
    }
  }
}
</script>

<style lang="sass">
</style>
