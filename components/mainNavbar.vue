<template>
  <div>
    <b-sidebar id="sidebar-1" backdrop-variant="dark" backdrop shadow no-header-close>
      <div>
        <BIconList v-b-toggle.sidebar-1 class="border-0 font-6 text-dark" />
      </div>
      <div class="py-2">
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

    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-row class="w-100 d-md-none">
        <b-col cols="6" class="d-flex align-center">
          <b-navbar-toggle target="sidebar-1">
            <!-- Start sidebar -->
            <BIconList class="border-0 text-white" />
            <!-- End sidebar -->
          </b-navbar-toggle>
        </b-col>

        <b-col cols="6">
          <b-navbar-brand href="#">
            <b-img src="~/assets/img/logo-white.png" class="logo" />
          </b-navbar-brand>
        </b-col>
      </b-row>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="w-100 d-sm-flex justify-content-sm-between align-items-sm-center">
          <b-nav-item>Kontakta oss</b-nav-item>

          <b-nav-item-dropdown
            toggle-class="text-white font-3"
            menu-class="animate__animated animate__zoomIn"
            text="Tjänster"
            left
          >
            <b-dropdown-item href="#">
              Alla tjänster
            </b-dropdown-item>

            <b-dd-divider />

            <b-dropdown-item href="#">
              Hyr en popup lokal
            </b-dropdown-item>
            <b-dd-divider />
            <b-dropdown-item href="#">
              Hyr ut din lokal
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown
            toggle-class="text-white font-3"
            menu-class="animate__animated animate__zoomIn"
            text="Om oss"
            left
          >
            <b-dropdown-item href="#">
              Vilka är Popup Agency
            </b-dropdown-item>

            <b-dd-divider />

            <b-dropdown-item href="#">
              Vad är en popup?
            </b-dropdown-item>

            <b-dd-divider />

            <b-dropdown-item href="#">
              Kontakt
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item>
            <b-img src="~/assets/img/logo-white.png" class="logo" />
          </b-nav-item>

          <b-nav-item-dropdown
            toggle-class="text-white font-3"
            menu-class="animate__animated animate__zoomIn"
            text="Lediga popups"
            left
          >
            <b-dropdown-item href="#">
              Lediga popups
            </b-dropdown-item>

            <b-dd-divider />

            <b-dropdown-item href="#">
              Se alla städer
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item>Hur fungerar popup?</b-nav-item>

          <b-nav-item>English</b-nav-item>

          <b-nav-item>
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
      links: [
        {
          label: {
            text: 'Kontakta oss',
            url: '/'
          }
        },
        {
          label: {
            text: 'Tjänster'
          },
          subList: [
            {
              text: 'Alla tjänster',
              url: '/'
            },
            {
              text: 'Hyr en popup lokal',
              url: '/'
            },
            {
              text: 'Hyr ut din lokal',
              url: '/'
            }
          ]
        },
        {
          label: {
            text: 'Om oss'
          },
          subList: [
            {
              text: 'Vilka är Popup Agency',
              url: '/'
            },
            {
              text: 'Vad är en popup?',
              url: '/'
            },
            {
              text: 'Kontakt',
              url: '/'
            }
          ]
        },
        {
          label: {
            text: 'Blogg och press',
            url: '/'
          }
        },
        {
          label: {
            text: 'Lediga popups'
          },
          subList: [
            {
              text: 'Lediga popups',
              url: '/'
            },
            {
              text: 'Se alla städer',
              url: '/'
            }
          ]
        },
        {
          label: {
            text: 'Hur fungerar popup?',
            url: '/'
          }
        },
        {
          label: {
            text: 'English',
            url: '/'
          }
        }
      ]
    }
  }
}
</script>

<style lang="sass">
.logo
  max-height: 50px

.navbar-toggler
  border: 0
  font-size: 40px

.navbar-dark .navbar-nav .nav-link
  color: white !important

.animate__animated.animate__zoomIn
  --animate-duration: 0.4s

ul.dropdown-menu li[role=presentation] a
  transition: all 0.4s ease
  &:hover
    padding-left: 30px

.b-sidebar-body
  a
    color: #000
    text-decoration: none
    &:hover
      text-decoration: none

  ul
    padding: 0
    margin: 0
    list-style: none
    li
      padding: 15px
      background: white
      transition: all 0.4s ease-out
      svg
        transition: all 0.4s ease-out
        opacity: 0.6
      &:hover
        padding-left: 20px
        svg
          opacity: 1
  .collapse
    background: #ddd
    ul
      margin: 0
      padding: 0
      background: #ddd !important
      li
        background: #ddd !important
        padding-left: 10px
        transition: all 0.4s ease-out
        &:hover
          padding-left: 20px
</style>
