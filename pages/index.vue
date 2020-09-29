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
          <b-input-group-prepend class="bg-white p-3 text-dark">
            <b-icon-search />
          </b-input-group-prepend>
          <b-form-input class="p-4" type="search" aria-label="Hitta din lokal här..." placeholder="Hitta din lokal här..." />
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

      <!-- Start Gried -->
      <b-row class="align-items-stretch">
        <!-- Strat right column -->
        <b-col v-for="(row, index) in gridRows" :key="`left-grid-${index}`" cols="12" md="6" :class="{ 'd-none d-md-block': index === 'left' }">
          <b-row class="grid align-items-stretch h-100">
            <b-col v-for="(column, i) in row" :key="`left-grid--col${i}`" :cols="column.size" class="my-2">
              <nuxt-link :style="{ backgroundImage: `url('${column.image}')` }" class="h-100 center-image grid-item" to="/">
                <div class="grid-overlay">
                  <h3 class="text-white">
                    Hey
                  </h3>
                </div>
              </nuxt-link>
            </b-col>
          </b-row>
        </b-col>
        <!-- End right column -->
      </b-row>
      <!-- Start Gried -->
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
      },
      gridRows: {
        right: [
          { size: 12, image: 'https://placeimg.com/640/480/nature' },
          { size: 6, image: 'https://placeimg.com/640/480/nature' },
          { size: 6, image: 'https://placeimg.com/640/480/nature' },
          { size: 12, image: 'https://placeimg.com/640/480/nature' }
        ],
        left: [
          { size: 6, image: 'https://placeimg.com/640/480/nature' },
          { size: 6, image: 'https://placeimg.com/640/480/nature' },
          { size: 4, image: 'https://placeimg.com/640/480/nature' },
          { size: 4, image: 'https://placeimg.com/640/480/nature' },
          { size: 4, image: 'https://placeimg.com/640/480/nature' },
          { size: 6, image: 'https://placeimg.com/640/480/nature' },
          { size: 6, image: 'https://placeimg.com/640/480/nature' },
          { size: 4, image: 'https://placeimg.com/640/480/nature' },
          { size: 4, image: 'https://placeimg.com/640/480/nature' },
          { size: 4, image: 'https://placeimg.com/640/480/nature' }
        ]
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

.grid .grid-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  height: 100%;
  background-color: rgba(2, 1, 1, 0.22);
  text-align: center;
}
.grid .grid-overlay h3 {
  height: auto;
  font-weight: bolder;
}

.grid-item {
  display: block;
}

.grid-item:hover {
  text-decoration: none;
}

.center-image {
  background-position: center center;
  background-size: cover;
}
</style>
