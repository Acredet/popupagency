<template>
  <div>
    <loading :state="loadingState" />
    <div v-if="place._id">
      <LoginModal :modalShow="modalShow" @close-modal="modalShow = false" />

      <listingCover
        :title="place.title"
        :cover="place.cover"
        :price-per-day="place.prisperdag"
        @bookmarkWithoutLogin="modalShow = true"
      />

      <main>
        <listing-feats :feats="feats" />

        <b-container>
          <b-row>
            <!-- Start Info col -->
            <b-col cols="12" md="8">
              <!-- Start Description -->
              <section>
                <h2 class="font-weight-bold">Description</h2>
                <div
                  v-html="
                    place.beskreving ? place.beskreving[$i18n.locale] : ''
                  "
                />
              </section>
              <!-- End Description -->

              <b-row>
                <b-col cols="12" md="6">
                  <home-details
                    :title="place.title"
                    :egenskaper="place.egenskaper"
                  />
                </b-col>

                <b-col cols="12" md="6">
                  <gmap-map
                    style="width: 100%; height: 300px"
                    :center="map.center"
                    :map-type-id="map.mapTypeId"
                    :zoom="15"
                  >
                    <gmap-cluster>
                      <gmap-marker
                        v-for="(mark, index) in map.markers"
                        :key="index"
                        :icon="require(`@/assets/img/marker.svg`)"
                        :position="mark"
                      />
                    </gmap-cluster>
                  </gmap-map>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12" md="6">
                  <pricesTable :place="place" />
                </b-col>
              </b-row>

              <centrum-details
                :centrumtextarea="place.centrumtextarea"
                :centurmTitle="place.centurmTitle"
                :hemsida="place.hemsida"
                :oppettider="place.oppettider"
              />

              <!-- Start Galleri -->
              <b-col class="my-3" cols="12">
                <Gallery :galleryName="'bildgalleri'" :images="images" />
              </b-col>
              <!-- End Galleri -->
            </b-col>
            <!-- End Info col -->

            <b-col
              style="
                position: sticky;
                top: 70px;
                width: 100px;
                height: 100%;
                justify-self: flex-start;
              "
              class="d-md-flex"
              md="4"
              cols="12"
            >
              <contactForm :sellerId="place.userId" />
            </b-col>
          </b-row>

          <!-- contact us -->
          <b-row style="min-height: 200px">
            <b-col
              cols="6"
              class="d-flex justify-content-center align-items-center"
            >
              <b-btn squared variant="primary" @click="goUp">
                {{ $t("contactUs") }}
              </b-btn>
            </b-col>
            <b-col cols="6" class="contact-us-img" />
          </b-row>
          <!-- contact us -->

          <similar-listings :similar="similar" />
        </b-container>
      </main>
    </div>

    <!-- Start Viewers -->
    <!-- <viewer
        v-for="(i, index) in [
            { images: planritningImages, ref: 'viewer', init: 'planritningImages' },
            { images: images, ref: 'viewer2', init: 'bildgalleri' },
            { images: centrumgalleri, ref: 'viewer3', init: 'centrumgalleri' },
        ]"
        :key="`${index}-viewer`"
        :ref="i.ref"
        :images="i.images"
        class="viewer"
        @inited="initedV(i.init, $event)"
    >
        <img
            v-for="src in i.images"
            :key="src + '- ' + i.init"
            :src="src"
            class="d-none"
        />
    </viewer> -->
    <!-- End Viewers -->
  </div>
</template>

<script>
import { BIcon, BIconImage } from "bootstrap-vue";
import LoginModal from "@/components/loginModal";
import Gallery from "@/components/singleListing/gallery";
import HomeDetails from "@/components/singleListing/HomeDetails";
import listingFeats from "@/components/singleListing/Feats";
import CentrumDetails from "~/components/singleListing/CentrumDetails.vue";
import SimilarListings from "~/components/singleListing/SimilarListings.vue";
import contactForm from "@/components/singleListing/contactFrom";
import listingCover from "@/components/singleListing/listingCover";
import pricesTable from "@/components/singleListing/prices";
// import localInfo from "@/components/singleListing/localInformation";

import { mapGetters } from "vuex";

export default {
  components: {
    // Icons
    BIcon,
    BIconImage,

    // Page components
    LoginModal,
    contactForm,
    listingCover,
    pricesTable,
    // localInfo,
    Gallery,
    HomeDetails,
    listingFeats,
    CentrumDetails,
    SimilarListings,
  },
  data() {
    return {
      loadingState: true,
      modalShow: false,
      thereIsCentrum: false,
      map: {
        center: { lat: 59.334591, lng: 18.06324 },
        mapTypeId: "roadmap",
        markers: [],
      },
      place: {},
      similar: [],
      tabOpened: 0,
    };
  },
  computed: {
    ...mapGetters({
      getOneListing: "listing/getOneListings",
      listings: "listing/listings",
    }),
    feats() {
      return [
        { name: "yta-1", text: this.place.yta || "" },
        {
          name: this.place.fasta ? "fasta-oppettider-1" : "fasta-oppettider-2",
          text: this.$t("singleListing.feats.fasta"),
        },
        {
          name: this.place.butik ? "butik-1" : "butik-2",
          text: this.$t("singleListing.feats.butik"),
        },
        {
          name: this.place.mat ? "matodrick-1" : "matodrick-2",
          text: this.$t("singleListing.feats.mat"),
        },
        {
          name: this.place.event ? "event-1" : "event-2",
          text: this.$t("singleListing.feats.event"),
        },
        {
          name: this.place.sasongBoxen ? "sol" : "solstol",
          text: this.$t("singleListing.feats.sasong"),
        },
      ];
    },
    images() {
      return !this.place.bildgalleri
        ? []
        : this.place.bildgalleri.map(
            (x) => `https://popup.dk.se/_nuxt/img/${x}`
          );
    },
    centrumgalleri() {
      return !this.place.centrumgalleri
        ? []
        : this.place.centrumgalleri.map(
            (x) => `https://popup.dk.se/_nuxt/img/${x}`
          );
    },
    planritningImages() {
      return !this.place.planritning
        ? []
        : this.place.planritning.map(
            (x) => `https://popup.dk.se/_nuxt/img/${x}`
          );
    },
  },
  async created() {
    const placeFromStore = this.getOneListing(
      this.$route.params.title.replace(/[-]/g, " ")
    );
    console.log(placeFromStore);
    if (placeFromStore.routeGuidance) {
      this.thereIsCentrum = true;
      this.map = {
        center: {
          lng: placeFromStore.routeGuidance.coordinates[0],
          lat: placeFromStore.routeGuidance.coordinates[1],
        },
        mapTypeId: "roadmap",
        markers: [
          {
            lng: placeFromStore.routeGuidance.coordinates[0],
            lat: placeFromStore.routeGuidance.coordinates[1],
          },
        ],
      };
    }

    // Increment views
    await this.$axios.patch(`/places/view/${placeFromStore._id}`);
    this.place = placeFromStore;
    this.similar = this.listings
      .filter((place) => place.stad.sv === placeFromStore.stad.sv)
      .filter((place) => place._id !== placeFromStore._id);
    this.loadingState = false;
  },
  methods: {
    goUp() {
      const el = document.getElementById("contactForm");
      const rect = el.getBoundingClientRect();

      document.body.scrollTop = rect.top + window.scrollY - 15;
      document.documentElement.scrollTop = rect.top + window.scrollY - 15;
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 576px) {
  .row.tabs {
    overflow-x: scroll;
  }
}

p {
  padding: 0;
  margin: 0;
}

main .container section {
  padding: 30px 0;
}

.hooper {
  height: 250px;
}

.custom-card {
  cursor: pointer;
  padding: 15px;
}

.custom-card .custom-card--imgWrapper {
  border-radius: 10px;
  overflow: hidden;
}
.custom-card .custom-card--imgWrapper img {
  width: 100%;
  height: 130px;
}

.contact-us-img {
  min-height: 400px;
  background-image: url("~assets/img/contact-us-person.png");
  background-size: cover;
  background-position: center center;
}
</style>
