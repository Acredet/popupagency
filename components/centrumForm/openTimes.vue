<template>
  <div>
    <!-- oppettider -->
    <b-card class="my-5" :title="$t('addListing.inputs.optidder')">
      <b-tabs content-class="mt-3" fill>
        <b-tab
          v-for="tab in times"
          :key="tab.name"
          :title="tab.name"
          :active="tab.active"
        >
          <b-form-group>
            <b-form-radio-group
              id="optidder"
              v-model="days[tab.name].openTimes"
              :name="tab.name"
            >
              <b-form-radio value="hours">
                {{ $t("addListing.inputs.optidderOpts.hours") }}
              </b-form-radio>
              <b-form-radio value="openAllDay">
                {{ $t("addListing.inputs.optidderOpts.allDayOpen") }}
              </b-form-radio>
              <b-form-radio value="closeAllDay">
                {{ $t("addListing.inputs.optidderOpts.allDayClose") }}
              </b-form-radio>
              <b-form-radio value="appointment">
                {{ $t("addListing.inputs.optidderOpts.appointment") }}
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <div v-if="days[tab.name].openTimes == 'hours'">
            <b-row
              v-for="(hours, index) in days[tab.name].hours"
              :key="'m' + index"
              class="my-3"
            >
              <b-col cols="12" md="5" class="mb-2 mb-md-0">
                <b-form-timepicker
                  v-model="days[tab.name].hours[index].opening"
                  locale="en"
                />
              </b-col>
              <b-col cols="12" md="5" class="mb-2 mb-md-0">
                <b-form-timepicker
                  v-model="days[tab.name].hours[index].closing"
                  locale="en"
                />
              </b-col>
              <b-col cols="12" md="2">
                <b-button
                  variant="outline-light"
                  block
                  @click="delteTimeRow(tab.name, index)"
                >
                  <b-icon-trash variant="dark" class="rounded-circle" />
                </b-button>
              </b-col>
            </b-row>

            <b-col cols="12">
              <b-button block variant="primary" @click="addTimeRow(tab.name)">
                Add Time
              </b-button>
            </b-col>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
    <!-- oppettider -->
  </div>
</template>

<script>
import { BootstrapVue, BIcon, BIconTrash, BIconTrashFill } from "bootstrap-vue";

export default {
  components: {
    BootstrapVue,
    BIcon,
    BIconTrash,
    BIconTrashFill,
  },
  props: {
    oppettider: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      once: 0,
      times: [
        {
          name: "Mon",
          active: true,
        },
        {
          name: "Tue",
          active: false,
        },
        {
          name: "Wed",
          active: false,
        },
        {
          name: "Thu",
          active: false,
        },
        {
          name: "Fri",
          active: false,
        },
        {
          name: "Sat",
          active: false,
        },
        {
          name: "Sun",
          active: false,
        },
      ],
      days: {
        Mon: {
          openTimes: "hours",
          hours: [{ opening: "00:00:00", closing: "00:00:00" }],
        },
        Tue: {
          openTimes: "hours",
          hours: [{ opening: "00:00:00", closing: "00:00:00" }],
        },
        Wed: {
          openTimes: "hours",
          hours: [{ opening: "00:00:00", closing: "00:00:00" }],
        },
        Thu: {
          openTimes: "hours",
          hours: [{ opening: "00:00:00", closing: "00:00:00" }],
        },
        Fri: {
          openTimes: "hours",
          hours: [{ opening: "00:00:00", closing: "00:00:00" }],
        },
        Sat: {
          openTimes: "hours",
          hours: [{ opening: "00:00:00", closing: "00:00:00" }],
        },
        Sun: {
          openTimes: "hours",
          hours: [{ opening: "00:00:00", closing: "00:00:00" }],
        },
      },
    };
  },
  watch: {
    oppettider: {
      immediate: true,
      deep: true,
      handler(newValue) {
        for (const key in this.oppettider) {
          if (this.oppettider.hasOwnProperty(key)) {
            const element = this.oppettider[key];
            const day = this.days[element.day];
            day.hours = element.times;
            day.openTimes = element.oppettider;
          }
        }
      },
    },
    days: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.$emit("daysChanged", newValue);
      },
    },
  },
  methods: {
    delteTimeRow(name, index) {
      this.days[name].hours.splice(index, 1);
    },
    addTimeRow(name) {
      this.days[name].hours.push({
        opening: "00:00:00",
        closing: "00:00:00",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
