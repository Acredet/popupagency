<template>
  <div style="overflow-x: hidden" class="mt-3">
    <filter-sidebar />

    <b-row class="mt-2">
      <!-- Start filters Bar -->
      <b-col cols="12">
        <filter-bar
          @changeMapCenter="center = $event"
          @changeLayout="layout = $event"
        />
      </b-col>
      <!-- End filters Bar -->

      <!-- Start Listings -->
      <b-col
        cols="12"
        :md="layout === $t('ledigaLokaler.map') ? 6 : 12"
        class="wrapper"
      >
        <b-container class="h-100">
          <ListingsGrid :layout="layout" :cards="cards" />
        </b-container>
      </b-col>
      <!-- End Listings -->

      <!-- Start Map -->
      <b-col
        v-if="layout === $t('ledigaLokaler.map')"
        cols="12"
        md="6"
        class="map-wrapper d-md-flex"
      >
        <client-only>
          <GMap
            :key="renderKey"
            :all-places="cards"
            :center="center"
            @setCenter="layout = $t('ledigaLokaler.map')"
          />
        </client-only>
      </b-col>
      <!-- End Map -->
    </b-row>

    <!-- Strat Toggle Layout in small screens -->
    <div
      class="mobile-btns px-3 d-md-none position-fixed d-flex justify-content-between align-items-center"
    >
      <b-btn
        pill
        variant="dark"
        class="w-50 mr-2"
        @click="
          layout === $t('ledigaLokaler.map')
            ? (layout = $t('ledigaLokaler.list'))
            : (layout = $t('ledigaLokaler.map'));
          refreshMap;
        "
      >
        {{
          layout === $t("ledigaLokaler.map")
            ? $t("ledigaLokaler.list")
            : $t("ledigaLokaler.map")
        }}
        {{ $t("ledigaLokaler.view") }}
      </b-btn>

      <b-btn pill variant="dark" class="w-50" @click="saveFilters">
        Save search
      </b-btn>
    </div>
    <!-- End Toggle Layout in small screens -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GMap from "@/components/lediga/Map";
import filterSidebar from "@/components/lediga/fitlerSidebar";
import filterBar from "@/components/lediga/filterBar";
import toast from "@/mixins/utils/toast";
export default {
  name: "LedigaLokaler",
  components: {
    GMap,
    filterBar,
    filterSidebar,
  },
  mixins: [toast],
  data() {
    return {
      modalShow: false,
      center: { lat: 59.334591, lng: 18.06324 },
      layout: this.$t("ledigaLokaler.list"),
    };
  },
  computed: {
    ...mapGetters({
      filtersUsed: "filters/used",
      renderKey: "renderKey",
      cards: "cards",
    }),
  },
  mounted() {
    if (window.innerWidth >= "768") {
      this.layout = this.$t("ledigaLokaler.map");
    }
  },
  methods: {
    async saveFilters() {
      if (!this.$auth.loggedIn) {
        this.modalShow = true;
      } else {
        await this.$axios
          .$post("/users/filters/add", { filters: this.filtersUsed })
          .then(() =>
            this.makeToast(
              "Filters saved successfully:",
              "You successfully saved the used filters.",
              "success"
            )
          )
          .catch((err) => this.makeToast("Something wrong:", err, "danger"));
      }
    },
  },
};
</script>

<style scoped>
.mobile-btns {
  bottom: 5px;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
@media (max-width: 767.98px) {
  .map-wrapper {
    padding: 0 !important;
    margin: 0 !important;
    display: block !important;
    position: fixed;
    z-index: 25;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.dropdown-header {
  padding: 0 !important;
  padding-bottom: 10px !important;
}

.wrapper {
  max-height: 100vh;
  overflow-y: scroll;
}

.vue-map-container {
  height: 100vh;
  width: 100%;
}

.choices,
.choices * {
  height: auto !important;
}

span ~ button.list-group-item {
  background-color: #ddd !important;
}

.custom-tab,
.custom-tab div {
  height: 300px;
}
</style>
