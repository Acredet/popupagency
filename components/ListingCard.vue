<template>
  <div>
    <!-- <b-btn :disabled="loading" class="heartIcon h4 mb-2" @click="AddToFav"> -->
    <section class="like" :class="{ 'anim-like': $auth.loggedIn && ($auth.user.fav.findIndex(x => x === card.title.sv) !== -1) }" @click="AddToFav" />
    <!-- </b-btn> -->

    <nuxt-link :to="`${$t('link')}lokal/${card.title.sv}`" class="listing-card">
      <!-- Start header -->
      <div class="listing-card--header">
        <b-carousel :id="`${card.title[$i18n.locale]}-cover`" :interval="3500">
          <b-carousel-slide v-for="(img, index) in card.cover" :key="String(index)" :img-src="`https://popup.dk.se/_nuxt/img/${img}`">
            <template v-slot:img>
              <img
                :src="`https://popup.dk.se/_nuxt/img/${img}`"
                width="100%"
                class="img-fluid"
                style="height:200px"
                :alt="card.title[$i18n.locale]"
              >
            </template>
          </b-carousel-slide>
        </b-carousel>

        <div class="listing-card--header---overlay px-3">
          <p class="p-0 m-0 text-white" v-text="card.title[$i18n.locale]" />
        </div>
      </div>
      <!-- End header -->

      <!-- Start card Info -->
      <div class="listing-card--content pt-1">
        <b-row no-gutters>
          <b-col class="border-bottom px-1" cols="5">
            <!-- Add this to focus on the place on map: @click="showPlace(card.location.coordinates)" -->
            <small class="text-muted" style="cursor: pointer">
              <!-- <BIconGeoAlt class="text-dark mr-1" />{{ card.location.formattedAddress }} -->
              <BIconGeoAlt class="text-dark mr-1" />{{ card.stad[$i18n.locale] }}
            </small>
          </b-col>

          <b-col cols="7" class="border-left border-bottom pl-1 pr-3">
            <small class="text-muted">
              <BIconWallet class="text-dark mr-1" />{{ `fr ${card.prioteradpris} kr / månad` }}
            </small>
          </b-col>
        </b-row>
      </div>
    <!-- End card Info -->
    </nuxt-link>
  </div>
</template>

<script>
import { BootstrapVue, BIcon, BIconGeoAlt, BIconWallet } from 'bootstrap-vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    // eslint-disable-next-line vue/no-unused-components
    BIconWallet,
    // eslint-disable-next-line vue/no-unused-components
    BIconGeoAlt
  },
  props: {
    card: {
      type: Object,
      default: () => {}
    },
    layout: {
      type: String,
      default: () => 'list'
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    showPlace (loc) {
      this.$emit('showPlace', loc)
    },
    async AddToFav (e) {
      this.loading = true
      const like = e.target
      if (!this.$auth.loggedIn) {
        this.$store.dispatch('redirectLink', this.$route.path)
        this.$router.push('login')
      } else {
        const update = {}
        Object.assign(update, this.$auth.user)
        update.fav = [...this.$auth.user.fav]
        const index = update.fav.findIndex(x => x === this.card.title.sv)
        if (index === -1) {
          update.fav.push(this.card.title.sv)
          like.classList.add('anim-like')
        } else {
          update.fav.splice(index, 1)
          like.classList.remove('anim-like')
        }
        await this.$axios.patch(`/users/${this.$auth.user._id}`, update)
          .then(async (res) => {
            console.log(res)
            await this.$auth.fetchUser()
          })
          .catch(err => console.log(err))
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
.like{
  position: absolute;
  z-index: 3;
  top: -10px;
  right: 0;

  width: 70px;
  height: 70px;
  background: url("https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png") no-repeat;
  background-position: -20px;
  cursor: pointer;
}
.anim-like{
  background-position: -2820px -14px;
  transition: background 1s steps(28);
}
.anim{
  background-position: -3529px 0;
  transition: background 1s steps(55);
}

.listing-card {
  display: block;
  text-decoration: none;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
}

.listing-card:hover {
  text-decoration: none;
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
}

.listing-card--header {
  position: relative;
}

.listing-card--header .listing-card--header---overlay {
  /* center the title */
  display: flex;
  align-items: center;
  /* Make the div overlay the carousel */
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: rgba(0,0,0, 0.5);
}

.listing-card--content {
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
