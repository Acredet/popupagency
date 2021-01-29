<template>
  <div>
    <!-- Login modal -->
    <LoginModal :modalShow="modalShow" @close-modal="modalShow = false" />
    <!-- End modal -->

    <!-- Start if empty -->
    <b-row
      v-if="cards.length === 0"
      align-h="center"
      align-content="center"
      class="h-100"
    >
      <p class="text-center text-secondary">There are no listings.</p>
    </b-row>
    <!-- End if empty -->

    <!-- start if Listing -->
    <b-row v-else>
      <!-- Start Listing header -->
      <b-col
        cols="12"
        class="d-flex sticky justify-content-between align-items-center"
      >
        <b-dropdown id="sorting" :text="sortedBy" class="m-md-2">
          <b-dropdown-item
            @click="sortCards($t('ledigaLokaler.sorting.latest'))"
          >
            {{ $t("ledigaLokaler.sorting.latest") }}
          </b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item
            @click="sortCards($t('ledigaLokaler.sorting.oldest'))"
          >
            {{ $t("ledigaLokaler.sorting.oldest") }}
          </b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item
            @click="sortCards($t('ledigaLokaler.sorting.priceLowToHigh'))"
          >
            {{ $t("ledigaLokaler.sorting.priceLowToHigh") }}
          </b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item
            @click="sortCards($t('ledigaLokaler.sorting.priceHighToLow'))"
          >
            {{ $t("ledigaLokaler.sorting.priceHighToLow") }}
          </b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item
            @click="sortCards($t('ledigaLokaler.sorting.sizeLowToHigh'))"
          >
            {{ $t("ledigaLokaler.sorting.sizeLowToHigh") }}
          </b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item
            @click="sortCards($t('ledigaLokaler.sorting.sizeHighToLow'))"
          >
            {{ $t("ledigaLokaler.sorting.sizeHighToLow") }}
          </b-dropdown-item>
        </b-dropdown>

        <p class="p-0 m-0">
          {{ cards.length }}
          {{
            cards.length > 2
              ? $t(`ledigaLokaler.sorting.countList.2`)
              : $t(`ledigaLokaler.sorting.countList.${cards.length}`)
          }}
        </p>
      </b-col>
      <!-- End Listing header -->

      <!-- Start Listing -->
      <b-col
        v-for="(card, index) in cards"
        :key="String(index)"
        class="my-2"
        cols="12"
        :md="6"
        :lg="layout === $t('ledigaLokaler.map') ? 6 : 4"
        :xl="layout === $t('ledigaLokaler.map') ? 6 : 4"
      >
        <listing-card
          :place="card"
          :layout="layout"
          @notAuthBookmark="modalShow = true"
          @showPlace="setCenter($event)"
        />
      </b-col>
      <!-- End Listing -->
    </b-row>
    <!-- End if Listing -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import listingCard from "@/components/ListingCard";
import LoginModal from "@/components/loginModal";
export default {
  data() {
    return {
      modalShow: false,
    };
  },
  components: {
    listingCard,
    LoginModal,
  },
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
    layout: {
      type: String,
      default: () => this.$t("ledigaLokaler.list"),
    },
    loadingCards: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      sortedBy: this.$t("ledigaLokaler.sorting.latest"),
      modalShow: false,
    };
  },
  methods: {
    ...mapActions({
      getListings: "getListings",
      sortCards: "sortCards",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
