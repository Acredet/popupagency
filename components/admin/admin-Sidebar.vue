<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="left side-menu">
    <div id="remove-scroll" class="slimscroll-menu">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul id="side-menu" class="metismenu">
          <li class="menu-title">
            Main
          </li>

          <li>
            <a href="javascript:void(0);" class="waves-effect"><i class="mdi mdi-email-outline" />
              <span> Listing <span class="float-right menu-arrow"><i class="mdi mdi-chevron-right" /></span> </span>
            </a>
            <ul class="submenu">
              <li>
                <nuxt-link exact to="/admin/listings/add">
                  Add new listing
                </nuxt-link>
              </li>
              <li>
                <nuxt-link exact to="/admin/listings/">
                  All listings
                </nuxt-link>
              </li>
              <li>
                <nuxt-link exact to="/admin/listings/region">
                  Region
                </nuxt-link>
              </li>
            </ul>
          </li>

          <li>
            <a href="javascript:void(0);" class="waves-effect"><i class="mdi mdi-email-outline" />
              <span> User <span class="float-right menu-arrow"><i class="mdi mdi-chevron-right" /></span> </span>
            </a>
            <ul class="submenu">
              <li>
                <nuxt-link active-class="active" to="email-inbox">
                  Inbox
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="email-read">
                  Email Read
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="email-compose">
                  Email Compose
                </nuxt-link>
              </li>
            </ul>
          </li>

          <li class="menu-title">
            <nuxt-link class="waves-effect" to="/settings">
              site settings <span class="float-right menu-arrow" />
            </nuxt-link>
          </li>
        </ul>
      </div>
      <!-- Sidebar -->
      <div class="clearfix" />
    </div>
    <!-- Sidebar -left -->
  </div>
  <!-- Left Sidebar End -->
</template>

<script>
export default {

}
</script>

<style>
.submenu li.active > a:not(.nuxt-link-active) {
  color: #8699ad !important;
}

a.nuxt-link-active {
  color: white !important
}
</style>
