<template>
  <!-- Start Prices -->
  <div class="my-4">
    <b-table
      class="border-top normal"
      thead-class="d-none"
      :fields="['info', 'price']"
      :items="priceList"
    >
      <!-- A custom formatted data column cell -->
      <template #cell(price)="data">
        <span v-if="data.item.text === $t('addListing.inputs.yta.label')">
          {{ data.item.val }} m<sup>2</sup>
        </span>

        <span
          v-else-if="
            [
              $t('addListing.inputs.fran'),
              $t('addListing.inputs.till'),
            ].includes(data.item.text)
          "
        >
          {{ data.item.val.substr(0, 10) }}
        </span>

        <span v-else>
          {{ data.item.val }}
        </span>
      </template>

      <template #cell(info)="data">
        {{ data.item.text.replace(/:/g, "") }}
      </template>
    </b-table>
  </div>
  <!-- End Prices -->
</template>

<script>
import { format } from "@/mixins/utils/formatNo";
export default {
  mixins: [format],
  props: {
    place: {
      type: Object,
      default: () => {
        return {
          yta: 0,
          placering: 0,
          minstahyresperiod: 0,
          langstahyresperiod: 0,
          fran: 0,
          till: 0,
        };
      },
    },
  },
  computed: {
    priceList() {
      return [
        {
          text: this.$t("addListing.inputs.yta.label"),
          val: this.place.yta,
        },
        {
          text: this.$t("addListing.inputs.placering.label"),
          val: this.place.placering,
        },
        {
          text: this.$t("addListing.inputs.minsta.label"),
          val: this.place.minstahyresperiod,
        },
        {
          text: this.$t("addListing.inputs.langsta.label"),
          val: this.place.langstahyresperiod,
        },
        {
          text: this.$t("addListing.inputs.fran"),
          val: this.place.fran,
        },
        {
          text: this.$t("addListing.inputs.till"),
          val: this.place.till,
        },
      ];
    },
  },
};
</script>

<style></style>
