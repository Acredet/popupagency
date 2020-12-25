<template>
  <div>
    <main-sidebar @logout="logout" :is-admin="isAdmin" />
    <b-navbar
      toggleable="lg"
      fixed="top"
      style="transition: all 0.5s ease"
      :type="variant ? 'dark' : 'light'"
      :variant="variant ? 'transparent' : 'light'"
    >
      <div class="w-100 d-lg-none d-flex justify-content-between">
        <b-navbar-toggle target="sidebar-1">
          <!-- Start sidebar -->
          <BIconList
            :variant="variant ? 'light' : 'dark'"
            class="border-0"
            scale="0.8"
          />
          <!-- End sidebar -->
        </b-navbar-toggle>

        <b-navbar-brand :to="localePath('/')">
          <b-img
            :src="
              variant
                ? require('@/assets/img/logo-white.png')
                : require('@/assets/img/logo.png')
            "
            class="logo"
          />
        </b-navbar-brand>
        <div />
      </div>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav
          class="w-100 d-sm-flex justify-content-sm-between align-items-sm-center"
        >
          <b-nav-item v-if="!$auth.loggedIn" :to="localePath('/login')">
            login
          </b-nav-item>
          <!--          display only this navbar if the current user is the admin -->
          <b-nav-item v-if="isAdmin" :to="localePath('/admin')">
            Admin
          </b-nav-item>
          <b-nav-item :to="localePath('/contact-us')">
            {{ $t("mainNavbar.contactUs") }}
          </b-nav-item>
          <b-nav-item-dropdown
            toggle-class=" font-1"
            menu-class="animate__animated animate__fadeInUp animate__faster"
            :text="$t('mainNavbar.services')"
            left
          >
            <b-dropdown-item href="#">
              {{ $t("mainNavbar.allServices") }}
            </b-dropdown-item>

            <b-dd-divider />

            <b-dropdown-item href="#">
              {{ $t("mainNavbar.rentAPopupLocally") }}
            </b-dropdown-item>
            <b-dd-divider />
            <b-dropdown-item href="#">
              {{ $t("mainNavbar.rentOutYourPremises") }}
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown
            toggle-class=" font-1"
            menu-class="animate__animated animate__fadeInUp animate__faster"
            :text="$t('mainNavbar.aboutUs')"
            left
          >
            <b-dropdown-item href="#">
              {{ $t("mainNavbar.whoAreThePopupAgency") }}
            </b-dropdown-item>

            <b-dd-divider />

            <b-dropdown-item href="#">
              {{ $t("mainNavbar.whatIsAPopup") }}
            </b-dropdown-item>

            <b-dd-divider />

            <b-dropdown-item :to="localePath('/contact-us')">
              {{ $t("mainNavbar.contact") }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item>
            {{ $t("mainNavbar.blogAndPress") }}
          </b-nav-item>
          <b-nav-item :to="localePath('/')">
            <b-img
              :src="
                variant
                  ? require('@/assets/img/logo-white.png')
                  : require('@/assets/img/logo.png')
              "
              class="logo"
            />
          </b-nav-item>

          <b-nav-item-dropdown
            toggle-class=" font-1"
            menu-class="animate__animated animate__fadeInUp animate__faster"
            :text="$t('mainNavbar.freePopups')"
            left
          >
            <b-dropdown-item :to="localePath('/lediga-lokaler')">
              {{ $t("mainNavbar.freePopups") }}
            </b-dropdown-item>

            <b-dropdown-item :to="localePath('/interest-reporting')">
              {{ $t("mainNavbar.interestReporting") }}
            </b-dropdown-item>

            <b-dd-divider />

            <b-dropdown-item href="#">
              {{ $t("mainNavbar.seeAllCities") }}
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item>
            {{ $t("mainNavbar.howDoesPopupWork") }}
          </b-nav-item>

          <b-nav-item v-if="$i18n.locale == 'sv'" @click="changeLang('en')">
            English
          </b-nav-item>
          <b-nav-item v-else @click="changeLang('sv')"> Swedish </b-nav-item>
          <b-nav-item v-if="$auth.loggedIn" @click="logout()">
            {{ $t("adminHeader.logout") }}
          </b-nav-item>
          <b-nav-item v-if="$auth.loggedIn" :to="localePath('/bookmark')">
            <b-icon-heart-fill />
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {
  BIcon,
  BIconHeartFill,
  BIconList,
  BIconCaretDownFill,
} from "bootstrap-vue";
import MainSidebar from "@/components/appNav/MainSidebar";

export default {
  components: {
    MainSidebar,
    BIcon,
    BIconHeartFill,
    BIconList,
    BIconCaretDownFill,
  },
  data() {
    return {
      scrollY: 0,
    };
  },
  computed: {
    variant() {
      return ["/", "/en"].includes(this.$route.path) && this.scrollY === 0;
    },
    isAdmin() {
      return this.$auth.user && this.$auth.user.role === "admin";
    },
  },
  mounted() {
    window.onscroll = () => {
      this.scrollY = window.scrollY;
    };
  },
  methods: {
    changeLang(lang) {
      this.$i18n.setLocale(lang);
    },
    logout() {
      this.$auth.logout("local");
    },
  },
};
</script>

<style scoped>
.logo {
  max-height: 35px;
}

.navbar-toggler {
  border: 0;
  font-size: 20px;
}
header.b-sidebar-header {
  background: white !important;
}
.navbar-dark .navbar-nav .nav-link {
  color: white !important;
}

.animate__animated.animate__zoomIn {
  --animate-duration: 0.4s;
}
@media (max-width: 770px) {
  ul.navbar-nav li a:hover {
    padding-left: 0;
  }

  ul.dropdown-menu li[role="presentation"]:hover a {
    padding-left: 30px;
  }
}

.b-sidebar-body a {
  color: #000;
  text-decoration: none;
}

.b-sidebar-body a:hover {
  text-decoration: none;
}

.b-sidebar-body ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.b-sidebar-body ul li {
  padding: 15px;
  background: white;
  transition: all 0.4s ease-out;
}

.b-sidebar-body ul li svg {
  transition: all 0.4s ease-out;
  opacity: 0.6;
}
.b-sidebar-body ul li:hover {
  padding-left: 20px;
}
.b-sidebar-body ul li:hover svg {
  opacity: 1;
}

.b-sidebar-body .collapse ul {
  margin: 0;
  padding: 0;
  background: #eee !important;
}

.b-sidebar-body .collapse ul li {
  background: #eee !important;
  padding-left: 10px;
  transition: all 0.4s ease-out;
}

.b-sidebar-body .collapse ul li:hover {
  padding-left: 20px;
}
</style>
