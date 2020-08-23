<template>
  <footer class="bg-black py-5">
    <b-container>
      <b-row>
        <!-- Start Om oss col -->
        <b-col cols="12" md="6" xl="3" class="mb-4 animate__animated animate__slideInLeft animate__delay-1s">
          <h5 class="text-white mb-4 font-weight-bold" v-text="$t('mainFooter.aboutUS.label')" />
          <p class="text-light m-0 p-0" v-text="$t('mainFooter.aboutUS.text')" />
          <b class="text-white my-2 d-block" v-text="$t('mainFooter.aboutUS.boldText')" />
        </b-col>
        <!-- End Om oss col -->

        <!-- start Om oss col -->
        <b-col cols="12" md="6" xl="3" class="mb-4 animate__animated animate__slideInUp animate__delay-1s">
          <h5 class="text-white mb-4 font-weight-bold" v-text="$t('mainFooter.links.text')" />
          <b-row>
            <b-col v-for="link in links" :key="link.text" cols="12" md="6">
              <nuxt-link class="footer-link" :to="`${$t('link')}${link.url}`">
                <i v-if="link.check" class="fas fa-check text-info mr-1" />
                {{ link.text }}
              </nuxt-link>
            </b-col>
          </b-row>
        </b-col>
        <!-- End Om oss col -->

        <!-- start Om oss col -->
        <b-col cols="12" md="6" xl="3" class="mb-4 animate__animated animate__slideInUp animate__delay-1s">
          <h5 class="text-white mb-4 font-weight-bold" v-text="$t('mainFooter.contactInfo')" />

          <a href="mailto:hej@popupagency.se" class="d-block mb-1 text-white">
            <i class="far fa-envelope mr-2" />
            <span>hej@popupagency.se</span>
          </a>

          <a href="https://www.google.se/maps/place/Medborgarplatsen+3,+118+26+Stockholm/@59.3147417,18.0687856,17z/data=!3m1!4b1!4m5!3m4!1s0x465f77faa2818e1f:0xec79034d61d17fed!8m2!3d59.3147417!4d18.0709743?hl=sv" target="_blank" class="d-block mb-1 text-white">
            <i class="fas fa-location-arrow mr-2" />
            <span>Medborgarplatsen 3, 118 72 Stockholm</span>
          </a>
        </b-col>
        <!-- End Om oss col -->

        <!-- start Om oss col -->
        <b-col cols="12" md="6" xl="3" class="mb-4 animate__animated animate__slideInRight animate__delay-1s">
          <a
            v-for="link in socialLinks"
            :key="link.icon"
            class="p-3 d-inline-flex justify-content-center align-items-center rounded text-white mr-2 "
            :style="`background-color: ${link.color}`"
            :href="link.href"
            target="_blank"
          >
            <i :class="link.icon" class="font-4" />
          </a>
        </b-col>
        <!-- End Om oss col -->
      </b-row>
    </b-container>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      links: [
        { text: this.$t('mainFooter.links.home'), url: 'lediga-lokaler' },
        { text: this.$t('mainFooter.links.coworker'), url: 'lediga-lokaler' },
        { text: this.$t('mainFooter.links.aboutUs'), url: 'lediga-lokaler' },
        { text: this.$t('mainFooter.links.freeJobs'), url: 'lediga-lokaler' },
        { text: this.$t('mainFooter.links.rentAPopup'), url: 'lediga-lokaler' },
        { text: this.$t('mainFooter.links.popupNews'), url: 'lediga-lokaler' },
        { text: this.$t('mainFooter.links.rentOutYourPremises'), url: 'lediga-lokaler' },
        { text: this.$t('mainFooter.links.handlingOfPersonalData'), check: true, url: 'lediga-lokaler' },
        { text: this.$t('mainFooter.links.availableFacilities'), check: true, url: 'lediga-lokaler' }
      ],
      socialLinks: [
        { icon: 'fab fa-facebook-f', href: 'https://sv-se.facebook.com/popupagency', color: '#3b5998' },
        { icon: 'fab fa-instagram', href: 'https://www.instagram.com/popupagency/?hl=sv', color: '#262626' },
        { icon: 'fab fa-linkedin-in', href: 'https://se.linkedin.com/company/pop-up-agency', color: '#0077b5' }
      ]
    }
  }
}
</script>

<style scoped>
footer, footer div.col {
  overflow: hidden;
}

.footer-link {
  color: #ddd
}

a:hover {
  text-decoration: none !important;
}

.footer-link:hover {
  color: white !important;
}
</style>
