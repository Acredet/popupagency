<template>
  <!-- Start Prices -->
  <div class="my-4">
    <b-table
      class="border-top"
      :fields="['period', 'price']"
      head-variant="light"
      :items="priceList"
    >
      <!-- A custom formatted data column cell -->
      <template #cell(price)="data">
        <span v-if="data.item !== 'prioteradpris' && place[data.item.val] !== 0"
          >{{ format(place[data.item.val]) }} Kr</span
        >
      </template>

      <template #cell(period)="data">
        {{ data.item.text }}
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
          prisperdag: 0,
          prisperhelg: 0,
          prisperlanghelg: 0,
          prispermanad: 0,
          prispervecka: 0,
        };
      },
    },
  },
  computed: {
    priceList() {
      const pricePer = this.$t("singleListing.info.pricePer");
      return [
        {
          text: `${pricePer} ${this.$t("singleListing.info.priceList.day")}`,
          val: "prisperdag",
        },
        {
          text: `${pricePer} ${this.$t(
            "singleListing.info.priceList.weekend"
          )}`,
          val: "prisperhelg",
        },
        {
          text: `${pricePer} ${this.$t("singleListing.info.priceList.month")}`,
          val: "prispermanad",
        },
        {
          text: `${pricePer} ${this.$t(
            "singleListing.info.priceList.longWeekend"
          )}`,
          val: "prisperlanghelg",
        },
        {
          text: `${pricePer} ${this.$t("singleListing.info.priceList.week")}`,
          val: "prispervecka",
        },
      ];
    },
  },
};
</script>

<style></style>
