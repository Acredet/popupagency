<template>
  <div>
    <!-- Start cover -->
    <div class="position-relative cover">
      <div class="position-relative cover--overlay" :style="imgStyles" />
      <section class="cover--details">
        <b-container class="h-100">
          <div class="text-center h-100 d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between">
            <h1 class="font-5">
              {{ place.title ? place.title[$i18n.locale] : '' }}
            </h1>
            <p class="h2 mb-2">
              <BIconHeart />
            </p>
          </div>
        </b-container>
      </section>
    </div>
    <!-- End cover -->
    <b-container fluid>
      <b-tabs no-nav-style :value="tabOpened" fill content-class="mt-3">
        <template v-slot:tabs-start>
          <b-row no-gutters class="d-flex flex-nowrap shadow jsutify-content-center w-100 tabs">
            <b-col v-for="(tab, index) in ['Information', 'Centruminfo', 'Pris', 'Bokningsförfrågan']" :key="tab" class="flex-grow-1" cols="auto">
              <b-btn
                squared
                block
                variant="light"
                class="anime-tab anime-tab-fromLeft border-0 bg-transparent"
                :class="{ 'active': (index === tabOpened) }"
                @click="tabOpened = index"
              >
                {{ tab }}
              </b-btn>
            </b-col>
          </b-row>
        </template>

        <b-tab title-item-class="d-none" active>
          <p>I'm the Information tab</p>
        </b-tab>
        <b-tab title-item-class="d-none">
          <p>I'm the Centruminfo tab</p>
        </b-tab>
        <b-tab title-item-class="d-none">
          <p>I'm the Pris tab</p>
        </b-tab>
      </b-tabs>
    </b-container>
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
      place: {},
      tabOpened: 1
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
  async beforeCreate () {
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
@media screen and (max-width: 576px) {
  .row.tabs {
    overflow-x: scroll;
  }
}
.anime-tab {
  margin:10px;
  padding:10px 10px;
  float:left;
  box-sizing:border-box;
  transition:0.4s all ease-in-out;
  position:relative;
  cursor:pointer;
}
.anime-tab:before {
  position:absolute;
  bottom:0;
  background: var(--indigo);
  height:2px;
  display:block;
  content:"";
  width:0;
  transition:0.4s all ease-in-out;
}
.anime-tab:hover:before ,.anime-tab.active:before {
  width:100%;
}
.anime-tab-fromLeft:before {
  bottom:0;
  left:0;
}

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
