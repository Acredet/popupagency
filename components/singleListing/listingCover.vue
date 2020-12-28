<template>
  <!-- Start cover -->
  <div class="position-relative cover">
    <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls>
      <b-carousel-slide v-for="img in cover" :key="img">
        <template #img>
          <img
            style="height: 60vh"
            class="d-block img-fluid w-100"
            :src="`https://popup.dk.se/_nuxt/img/${img}`"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>
      <!-- Slides with image only -->
      <!-- <b-carousel-slide  :img-src="``"></b-carousel-slide> -->
    </b-carousel>

    <section class="cover--details">
      <b-container class="h-100 position-relative">
        <div
          class="text-center h-100 d-flex flex-column justify-content-end align-items-start flex-lg-row align-items-lg-center justify-content-lg-between"
        >
          <div>
            <h1 class="text-left font-6 mb-2">
              {{ title ? title[$i18n.locale] : "" }}
              <b-btn
                v-if="
                  $auth.loggedIn &&
                  ['admin', 'manager'].includes($auth.user.role)
                "
                variant="icon"
                :to="`${$t('link')}admin/listings/edit/${title.sv
                  .split(' ')
                  .join('-')}`"
              >
                <b-icon icon="pencil-square" class="text-white" />
              </b-btn>
            </h1>

            <p class="text-left">
              <b-icon icon="geo-alt-fill" />
              {{ location }}
            </p>
          </div>
          <h2>{{ format(pricePerDay) }} Kr/dag</h2>
        </div>

        <div class="bookmark-wrapper position-absolute">
          <b-btn
            class="bookmark-btn"
            @click="
              (e) => {
                if (!this.$auth.loggedIn) {
                  this.$emit('bookmarkWithoutLogin');
                } else {
                  this.AddToFav(e, title.sv);
                }
              }
            "
            variant="icon"
          >
            <b-icon
              scale="1.5"
              :icon="
                $auth.loggedIn &&
                $auth.user.fav.findIndex((x) => x === title.sv) !== -1
                  ? 'heart-fill'
                  : 'heart'
              "
              style="color: red"
            />
          </b-btn>
        </div>
      </b-container>
    </section>
  </div>
  <!-- End cover -->
</template>

<script>
import {
  BIcon,
  BIconHeart,
  BIconHeartFill,
  BIconPencilSquare,
  BIconGeoAltFill,
} from "bootstrap-vue";
import { addToFav } from "@/mixins/utils/addToFav";
import { format } from "@/mixins/utils/formatNo";

export default {
  props: {
    location: {
      type: String,
      default: () => "",
    },
    title: {
      type: Object,
      default: () => {
        return { en: null, sv: null };
      },
    },
    cover: {
      type: Array,
      default: () => [],
    },
    pricePerDay: {
      type: Number,
      default: () => 0,
    },
  },
  components: {
    BIconPencilSquare,
    BIcon,
    BIconHeart,
    BIconHeartFill,
    BIconGeoAltFill,
  },
  data() {
    return {
      slide: 0,
    };
  },
  mixins: [addToFav, format],
  computed: {
    imgStyles() {
      return {
        "min-height": "60vh",
        "background-repeat": "no-repeat",
        "background-image": `url('https://popup.dk.se/_nuxt/img/${
          this.cover ? this.cover[0] : ""
        }')`,
        "background-position": "center center",
        "background-attachment": "fixed",
        "background-size": "cover",
      };
    },
  },
};
</script>

<style>
.cover .cover--details::before {
  z-index: -1;
  content: "";
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.710504270067402) 71%
  );
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

.cover .cover--details .bookmark-wrapper {
  bottom: -22%;
  right: 0;
}

.cover .cover--details .bookmark-btn,
.cover .cover--details .bookmark-btn:hover,
.cover .cover--details .bookmark-btn:focus {
  outline: none !important;
  box-shadow: 0 !important;
  background: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0px 0px 14px 0px rgba(50, 50, 50, 0.75);
}
</style>
