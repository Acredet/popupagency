<template>
  <div>
    <div class="banner">
      <div class="banner-image" />
      <div class="banner-overlay" />
      <div class="banner-text">
        <h2 class=" font-xl-12 font-18">
          från idé
          <br>
          till popup
        </h2>
        <span class="divider" />
        <h4 class="text-center text-white">
          Vi har skapat framtidens retail sedan 2013
        </h4>
        <b-input-group>
          <b-input-group-prepend class="bg-white p-2 text-dark">
            <b-icon-search />
          </b-input-group-prepend>
          <b-form-input type="search" aria-label="Hitta din lokal här..." />
        </b-input-group>
      </div>
    </div>

    <div>
      <hooper :settings="hooperSettings">
        <slide v-for="n in carouselImages" :key="n">
          <img width="100px" :src="require(`@/assets/img/home/carousel/${n}.png`)" :alt="n">
        </slide>
      </hooper>
    </div>

    <b-container>
      <img width="100%" src="@/assets/img/signature.png" alt="signature">
    </b-container>
  </div>
</template>

<script>
import { BootstrapVue, BIcon, BIconSearch } from 'bootstrap-vue'
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    BIconSearch,
    Hooper,
    Slide
  },
  data () {
    return {
      carouselImages: [
        'Babas',
        'beyond',
        'Bunches',
        'Designgalleriet',
        'dirtylinen',
        'Funiturebox',
        'magnum',
        'nakd',
        'Netflix',
        'Stockholmsstadsmission',
        'stalhasten',
        'SouthsideBBQ',
        'Nelly'
      ],
      hooperSettings: {
        itemsToShow: 3,
        autoPlay: true,
        playSpeed: 2500,
        centerMode: true,
        infiniteScroll: true,
        breakpoints: {
          700: {
            itemsToShow: 5
          },
          1000: {
            itemsToShow: 10
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.banner {
  position: relative;
  height: 50vh;
  margin-top: -10vh;
}

@media (min-width: 768px) {
  .banner {
    margin-top: -10vh !important;
    height: 100vh !important;
  }
}

.banner-image {
  background-image: url('~assets/img/home.jpg');
  background-position: center center;
  background-size: cover;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
}

.banner-overlay {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 99;
  background-color: #12061A;
  opacity: 0.47;
  transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
}
.banner-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
}

.banner-text h2 {
  mix-blend-mode: overlay;
  text-align: center;
  color: #FFFFFF;
  font-family: "Poppins", Sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-style: normal;
  line-height: 1.5em;
}

.banner-text .divider {
  border: 2px 0px solid rgba(255,255,255,0.73);
  width: 100px;
  height: 21px;
}

.banner-desc {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  text-align: center;
}

.hooper {
  height: auto;
  padding: 10px 0
}

.hooper, .hooper *:focus {
  outline: none !important;
  border: 0px;
}
</style>
