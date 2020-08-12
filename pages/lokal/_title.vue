<template>
  <div class="position-relative cover">
    <div class="position-relative cover--overlay" :style="imgStyles" />
    <section class="cover--details">
      <b-container class="h-100">
        <div class="text-center h-100 d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between">
          <h1 class="font-5">
            {{ place.title[$i18n.locale] }}
          </h1>
          <p class="h2 mb-2">
            <BIconHeart />
          </p>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import { BootstrapVue, BIcon, BIconHeart, BIconHeartFill } from 'bootstrap-vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    // eslint-disable-next-line vue/no-unused-components
    BIconHeart,
    // eslint-disable-next-line vue/no-unused-components
    BIconHeartFill
  },
  data () {
    return {
      place: {}
    }
  },
  computed: {
    imgStyles () {
      return {
        'min-height': '60vh',
        'background-repeat': 'no-repeat',
        'background-image': `url('https://popup.dk.se/_nuxt/img/${this.place.cover ? this.place.cover[0] : ''}')`,
        'background-position': 'center center',
        'background-attachment': 'fixed',
        'object-fit': 'fill'
      }
    }
  },
  async created () {
    await this.$axios.$get(`/places/${this.$route.params.title}`)
      .then((res) => {
        this.place = res.place
        console.log(res.place)
      })
      .catch(res => console.log(res))
  },
  methods: {

  }
}
</script>

<style scoped>

.cover .cover--details::before {
  z-index: -1;
  content: "";
  background-color: var(--dark);
  position: absolute;
  opacity: 0.5;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

.cover .cover--details {
  z-index: 4;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 30%;
  width: 100%;
  padding: 5px;
  color: white;
}
</style>
