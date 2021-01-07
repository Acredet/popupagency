<template>
  <div>
    <loading :state="loadingState" />
    <div v-if="place._id">
      <LoginModal :modalShow="modalShow" @close-modal="modalShow = false" />

      <listingCover
        :title="place.title"
        :cover="listingImages.cover"
        :price-per-day="place.prioteradpris.val"
        :period="place.prioteradpris.period"
        :location="place.routeGuidance.formattedAddress"
        @bookmarkWithoutLogin="modalShow = true"
      />

      <main>
        <section class="mx-md-5">
          <listing-feats :feats="feats" />
        </section>
        <hr />
        <b-container>
          <b-row>
            <!-- Start Info col -->
            <b-col cols="12" md="8">
              <!-- Start Description -->
              <section class="main-text-color-grey">
                <h6 class="text-secondary main-text-color-grey titles-font">
                  Description
                </h6>
                <div
                  class="main-text-color-grey"
                  v-if="!readMoreActivated"
                  v-html="
                    place.beskreving
                      ? place.beskreving[$i18n.locale].slice(0, 430)
                      : ''
                  "
                />
                <div
                  style="
                    display: block;
                    width: 100%;
                    height: 30px;
                    background-color: white;
                    position: relative;
                    top: -30px;
                    opacity: 0.6;
                  "
                  v-if="!readMoreActivated"
                ></div>
                <a
                  style="position: relative; top: -30px"
                  class=""
                  v-if="!readMoreActivated"
                  @click="activateReadMore"
                >
                  Read more...
                </a>
                <div
                  v-if="readMoreActivated"
                  v-html="
                    place.beskreving ? place.beskreving[$i18n.locale] : ''
                  "
                />
              </section>
              <hr />
              <details-table
                :place="{
                  yta: place.yta,
                  placering: place.placering,
                  minstahyresperiod: place.minstahyresperiod,
                  langstahyresperiod: place.langstahyresperiod,
                  fran: place.fran,
                  till: place.till,
                }"
              />
              <hr />

              <home-details
                :title="place.title"
                :egenskaper="place.egenskaper"
              />
              <!-- End Description -->
              <hr />
              <b-row>
                <b-col cols="12" md="6">
                  <pricesTable :place="place" />
                </b-col>

                <b-col cols="12" md="6">
                  <section>
                    <h4 class="main-text-color-grey titles-font">Plentring</h4>
                    <nuxt-link
                      v-for="(pdf, i) in place.planritning"
                      :key="i"
                      target="_blank"
                      class="d-block text-dark"
                      download
                      :to="localePath(`/pdf/${pdf}`)"
                    >
                      <b-icon-file-arrow-down />
                      {{ pdf.slice(pdf.indexOf("[]-") + 3) }}
                    </nuxt-link>
                  </section>
                </b-col>
              </b-row>
              <hr />

              <centrum-details
                :centrumtextarea="place.centrumtextarea"
                :centurmTitle="place.centurmTitle"
                :hemsida="place.hemsida"
                :oppettider="place.oppettider"
              />
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
              class="d-none d-md-flex"
              md="4"
              cols="12"
            >
              <contactForm :sellerId="place.kontaktperson" />
            </b-col>
          </b-row>

          <!-- Start Galleri -->
          <b-col class="my-3" cols="12">
            <Gallery
              :galleryName="'bildgalleri'"
              :images="listingImages.bildgalleri"
            />
          </b-col>
          <!-- End Galleri -->
          <hr />
          <b-col cols="12">
            <section>
              <h6 class="main-text-color-grey titles-font">
                {{ $t("singleListing.mapTitle") }}
              </h6>
              <gmap-map
                style="width: 100%; height: 500px"
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
            </section>
          </b-col>
          <hr />
          <!-- contact us -->
          <b-row style="min-height: 200px">
            <b-col
              cols="6"
              class="d-flex justify-content-center align-items-center"
            >
              <b-btn
                squared
                variant="primary"
                class="d-none d-md-block"
                @click="goUp"
              >
                {{ $t("contactUs") }}
              </b-btn>
              <b-btn
                squared
                variant="primary"
                class="d-block d-md-none"
                @click="modalShowForm = true"
              >
                {{ $t("contactUs") }}
              </b-btn>
            </b-col>
            <b-col cols="6" class="contact-us-img" />
          </b-row>
          <!-- contact us -->
          <hr />

          <similar-listings :similar="similar" />
        </b-container>
      </main>
    </div>

    <b-modal v-model="modalShowForm">
      <contactForm :sellerId="place.userId" />
    </b-modal>
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
import { BIcon, BIconImage, BIconFileArrowDown } from "bootstrap-vue";
import LoginModal from "@/components/loginModal";
import Gallery from "@/components/singleListing/gallery";
import HomeDetails from "@/components/singleListing/HomeDetails";
import listingFeats from "@/components/singleListing/Feats";
import CentrumDetails from "~/components/singleListing/CentrumDetails.vue";
import SimilarListings from "~/components/singleListing/SimilarListings.vue";
import contactForm from "@/components/singleListing/contactFrom";
import listingCover from "@/components/singleListing/listingCover";
import pricesTable from "@/components/singleListing/prices";
import DetailsTable from "@/components/singleListing/DetailsTable";
// import localInfo from "@/components/singleListing/localInformation";

import { mapGetters } from "vuex";
import ContactFrom from "~/components/singleListing/contactFrom.vue";

export default {
  components: {
    // Icons
    BIcon,
    BIconImage,
    BIconFileArrowDown,

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
    DetailsTable,
    ContactFrom,
  },
  data() {
    return {
      testImage: [],
      readMoreActivated: false,
      loadingState: true,
      modalShow: false,
      modalShowForm: false,
      thereIsCentrum: false,
      map: {
        center: { lat: 59.334591, lng: 18.06324 },
        mapTypeId: "roadmap",
        markers: [],
      },
      place: {},
      listingImages: {
        cover: [],
        centrumgalleri: [],
        bildgalleri: [],
        planritning: [],
      },
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
  },

  async created() {
    const placeFromStore = this.getOneListing(
      this.$route.params.title.replace(/[-]/g, " ")
    );
    if (placeFromStore.routeGuidance) {
      this.thereIsCentrum = true;
      this.listingImages.centrumgalleri = placeFromStore.centrumgalleri;
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
    this.place = placeFromStore;

    this.listingImages.cover = this.place.cover;
    this.listingImages.bildgalleri = this.place.bildgalleri;
    this.listingImages.planritning = this.place.planritning;
    this.getImages();
    // Increment views
    await this.$axios.patch(`/places/view/${placeFromStore._id}`);

    this.similar = this.listings
      .filter((place) => place.stad.sv === placeFromStore.stad.sv)
      .filter((place) => place._id !== placeFromStore._id);
    this.loadingState = false;
  },
  methods: {
    async getImages() {
      for (const key in this.listingImages) {
        if (Object.hasOwnProperty.call(this.listingImages, key)) {
          const element = this.listingImages[key];
          const alt = [];

          for (let i = 0; i < element.length; i++) {
            const imgName = element[i];
            await this.$axios
              .get(`/files/${imgName}`)
              .then((res) => {
                alt[i] = res.data;
              })
              .catch((err) => console.log(err));
          }
          this.listingImages[key] = alt;
        }
      }
    },
    activateReadMore() {
      this.readMoreActivated = true;
    },
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
  color: #4a4a4a !important ;
}
span {
  color: #4a4a4a !important ;
}

main .container section {
  padding: 10px 0;
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
