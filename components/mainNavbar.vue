<template>
  <div>
    <b-sidebar id="sidebar-1" backdrop-variant="dark" backdrop shadow no-header>
      <div class="d-flex justify-content-end bg-white pt-2 px-2">
        <i v-b-toggle.sidebar-1 class="ml-auto fas fa-times font-4 text-dark" />
      </div>
      <div class="py-2 bg-white ">
        <ul v-for="(link, index) in links" :key="String(index)">
          <li
            v-b-toggle="'accordion' + index"
            :class="{ 'd-flex justify-content-between align-items-center': link.subList }"
            class="font-3"
          >
            <nuxt-link v-if="link.label.url" exact :to="link.label.url">
              {{ link.label.text }}
            </nuxt-link>
            <span v-else>{{ link.label.text }}</span>
            <BIconCaretDownFill v-if="link.subList" />
          </li>

          <b-collapse
            v-if="link.subList"
            :id="'accordion'+ index"
            accordion="my-accordion"
            role="tabpanel"
          >
            <ul>
              <li v-for="(one, index1) in link.subList" :key="String(index1)" class="font-3">
                <nuxt-link exact :to="one.url">
                  {{ one.text }}
                </nuxt-link>
              </li>
            </ul>
          </b-collapse>
        </ul>
      </div>
    </b-sidebar>

    <b-navbar
      toggleable="lg"
      fixed="top"
      style="transition: all 0.5s ease"
      :type="variant ? 'light' : 'dark'"
      :variant="variant ? 'transparent' : 'dark'"
    >
      <b-row class="w-100 d-lg-none">
        <b-col cols="6" class="d-flex align-center">
          <b-navbar-toggle target="sidebar-1">
            <!-- Start sidebar -->
            <BIconList class="border-0 " />
            <!-- End sidebar -->
          </b-navbar-toggle>
        </b-col>
        <b-col cols="6">
          <b-navbar-brand to="/">
            <b-img :src="variant ? require('@/assets/img/logo.png') : require('@/assets/img/logo-white.png')" class="logo" />
          </b-navbar-brand>
        </b-col>
      </b-row>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="w-100 d-sm-flex justify-content-sm-between align-items-sm-center">
          <b-nav-item v-if="!$auth.loggedIn" to="/login">
            login
          </b-nav-item>
          <b-nav-item v-else @click="$auth.logout('local')">
            log out
          </b-nav-item>
          <b-nav-item>
            {{ $t('mainNavbar.contactUs') }}
          </b-nav-item>
          <b-nav-item-dropdown
            toggle-class=" font-3"
            menu-class="animate__animated animate__fadeInUp animate__faster"
            :text="$t('mainNavbar.services')"
            left
          >
            <b-dropdown-item href="#">
              {{ $t('mainNavbar.allServices') }}
            </b-dropdown-item>

            <b-dd-divider />

            <b-dropdown-item href="#">
              {{ $t('mainNavbar.rentAPopupLocally') }}
            </b-dropdown-item>
            <b-dd-divider />
            <b-dropdown-item href="#">
              {{ $t('mainNavbar.rentOutYourPremises') }}
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown
            toggle-class=" font-3"
            menu-class="animate__animated animate__fadeInUp animate__faster"
            :text="$t('mainNavbar.aboutUs')"
            left
          >
            <b-dropdown-item href="#">
              {{ $t('mainNavbar.whoAreThePopupAgency') }}
            </b-dropdown-item>

            <b-dd-divider />

            <b-dropdown-item href="#">
              {{ $t('mainNavbar.whatIsAPopup') }}
            </b-dropdown-item>

            <b-dd-divider />

            <b-dropdown-item href="#">
              {{ $t('mainNavbar.contact') }}
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item>
            <b-img :src="variant ? require('@/assets/img/logo.png') : require('@/assets/img/logo-white.png')" class="logo" />
          </b-nav-item>

          <b-nav-item-dropdown
            toggle-class=" font-3"
            menu-class="animate__animated animate__fadeInUp animate__faster"
            :text="$t('mainNavbar.blogAndPress')"
            left
          >
            <b-dropdown-item :to="`${$t('link')}lediga-lokaler`">
              {{ $t('mainNavbar.freePopups') }}
            </b-dropdown-item>

            <b-dropdown-item :to="`${$t('link')}interest-reporting`">
              Interest Reporting page
            </b-dropdown-item>

            <b-dd-divider />

            <b-dropdown-item href="#">
              {{ $t('mainNavbar.seeAllCities') }}
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item>
            {{ $t('mainNavbar.howDoesPopupWork') }}
          </b-nav-item>

          <b-nav-item v-if="$i18n.locale == 'sv'" @click="changeLang('en')">
            English
          </b-nav-item>
          <b-nav-item v-else @click="changeLang('sv')">
            Swedish
          </b-nav-item>

          <b-nav-item v-if="$auth.loggedIn" :to="`${$t('link')}bookmark`">
            <b-icon-heart-fill />
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {
  BootstrapVue,
  BIcon,
  BIconHeartFill,
  BIconList,
  BIconCaretDownFill
} from 'bootstrap-vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    BIconHeartFill,
    BIconList,
    BIconCaretDownFill
  },
  data () {
    return {
      scrollY: 0,
      links: [
        {
          label: {
            text: 'login',
            url: '/login'
          }
        },
        {
          label: {
            text: this.$t('mainNavbar.contactUs'),
            url: ''
          }
        },
        {
          label: {
            text: this.$t('mainNavbar.services')
          },
          subList: [
            {
              text: this.$t('mainNavbar.allServices'),
              url: ''
            },
            {
              text: this.$t('mainNavbar.rentAPopupLocally'),
              url: ''
            },
            {
              text: this.$t('mainNavbar.rentOutYourPremises'),
              url: ''
            }
          ]
        },
        {
          label: {
            text: this.$t('mainNavbar.aboutUs')
          },
          subList: [
            {
              text: this.$t('mainNavbar.whoAreThePopupAgency'),
              url: ''
            },
            {
              text: this.$t('mainNavbar.whatIsAPopup'),
              url: ''
            },
            {
              text: this.$t('mainNavbar.contact'),
              url: ''
            }
          ]
        },
        {
          label: {
            text: this.$t('mainNavbar.blogAndPress'),
            url: ''
          }
        },
        {
          label: {
            text: this.$t('mainNavbar.freePopups')
          },
          subList: [
            {
              text: this.$t('mainNavbar.freePopups'),
              url: ''
            },
            {
              text: this.$t('mainNavbar.seeAllCities'),
              url: ''
            }
          ]
        },
        {
          label: {
            text: this.$t('mainNavbar.howDoesPopupWork'),
            url: ''
          }
        },
        {
          label: {
            text: 'English',
            url: ''
          }
        }
      ]
    }
  },
  computed: {
    variant () {
      return ['/', '/en'].includes(this.$route.path) && this.scrollY === 0
    }
  },
  mounted () {
    window.onscroll = () => { this.scrollY = window.scrollY }
  },
  methods: {
    changeLang (lang) {
      this.$i18n.setLocale(lang)
      this.$store.commit('changeSidebarRenderKey')
    }
  }
}
</script>

<style scoped>
.logo {
  max-height: 50px;
}

.navbar-toggler {
  border: 0;
  font-size: 40px;
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
