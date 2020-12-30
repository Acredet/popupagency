<template>
  <div v-if="place && place._id" :key="`place-card-${place._id}`">
    <section
      class="like"
      :class="{
        'anim-like':
          $auth.loggedIn &&
          $auth.user.fav.findIndex((x) => x === place.title.sv) !== -1,
      }"
      @click="
        (e) => {
          AddToFav(e, place.title.sv);
        }
      "
    />
    <!-- </b-btn> -->

    <nuxt-link
      :to="`${$t('link')}lokal/${place.title.sv.split(' ').join('-')}`"
      class="listing-card"
    >
      <!-- Start header -->
      <div class="listing-card--header">
        <b-carousel :id="`${place.title[$i18n.locale]}-cover`" :interval="3500">
          <b-carousel-slide
            v-for="(img, index) in images"
            :key="String(index)"
            :img-src="img"
          >
            <template v-slot:img>
              <img
                :src="img"
                width="100%"
                class="img-fluid"
                style="height: 200px"
                :alt="place.title[$i18n.locale]"
              />
            </template>
          </b-carousel-slide>
        </b-carousel>

        <div class="listing-card--header---overlay px-3">
          <p class="p-0 m-0 text-white" v-text="place.title[$i18n.locale]" />
        </div>
      </div>
      <!-- End header -->

      <!-- Start card Info -->
      <div class="listing-card--content pt-1">
        <b-row no-gutters>
          <b-col class="border-bottom px-1" cols="5">
            <!-- Add this to focus on the place on map: @click="showPlace(place.location.coordinates)" -->
            <small class="text-muted" style="cursor: pointer">
              <!-- <BIconGeoAlt class="text-dark mr-1" />{{ place.location.formattedAddress }} -->
              <BIconGeoAlt class="text-dark mr-1" />{{
                place.stad[$i18n.locale]
              }}
            </small>
          </b-col>

          <b-col cols="7" class="border-left border-bottom pl-1 pr-3">
            <small v-if="place && place.prioteradpris" class="text-muted">
              <BIconWallet class="text-dark mr-1" />{{
                `fr ${format(place.prioteradpris.val)} kr / ${$t(
                  place.prioteradpris.period
                )}`
              }}
            </small>
          </b-col>
        </b-row>
      </div>
      <!-- End card Info -->
    </nuxt-link>
  </div>
</template>

<script>
import { BootstrapVue, BIcon, BIconGeoAlt, BIconWallet } from "bootstrap-vue";
import { addToFav } from "@/mixins/utils/addToFav";
import { format } from "@/mixins/utils/formatNo";
import { getImages } from "@/mixins/utils/getImage";

export default {
  name: "ListingCard",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BootstrapVue,
    // eslint-disable-next-line vue/no-unused-components
    BIcon,
    // eslint-disable-next-line vue/no-unused-components
    BIconWallet,
    // eslint-disable-next-line vue/no-unused-components
    BIconGeoAlt,
  },
  mixins: [addToFav, format, getImages],
  props: {
    place: {
      type: Object,
      default: () => {
        return { cover: [] };
      },
    },
    layout: {
      type: String,
      default: () => "list",
    },
  },
  data() {
    return {
      loading: false,
      images: [],
    };
  },
  watch: {
    place: {
      deep: true,
      immediate: true,
      handler: async function (val) {
        if (val && val.cover.length > 0) {
          for (let i = 0; i < val.cover.length; i++) {
            await this.getImage(val.cover[i])
              .then((res) => this.images.push(res))
              .catch((err) =>
                this.$bvToast.toast(err, {
                  title: "Something is wrong",
                  autoHideDelay: 5000,
                })
              );
          }
        }
      },
    },
  },
  // methods: {
  // showPlace(loc) {
  // 	this.$emit("showPlace", loc);
  // },
  // },
};
</script>

<style scoped>
.listing-card {
  display: block;
  text-decoration: none;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.listing-card:hover {
  text-decoration: none;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.listing-card--header {
  position: relative;
}

.listing-card--header .listing-card--header---formatoverlay {
  /* center the title */
  display: flex;
  align-items: center;
  /* Make the div overlay the carousel */
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.710504270067402) 71%
  );
}

.listing-card--content {
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
