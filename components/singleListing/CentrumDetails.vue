<template>
  <section v-if="centurmTitle">
    <h1>{{ $t("singleListing.info.centrumInfo") }}:</h1>
    <b-row>
      <b-col cols="12" md="6">
        <div>
          <h4 class="d-inline-block">{{ $t("title") }}:</h4>
          <h5 class="d-inline-block">
            {{ centurmTitle[$i18n.locale] }}
          </h5>
        </div>

        <div>
          <h4 class="d-inline-block">
            {{ $t("singleListing.info.website") }}:
          </h4>
          <h5 class="d-inline-block">{{ hemsida }}</h5>
        </div>

        <section>
          <h4>{{ $t("singleListing.info.description") }}:</h4>
          <div v-html="centrumtextarea[$i18n.locale]" />
        </section>
      </b-col>

      <!-- Start oppettider -->
      <b-col cols="12" md="6">
        <h4>{{ $t("singleListing.info.openingHours") }}:</h4>
        <div v-for="day in oppettider" :key="day._id">
          <b-row>
            <b-col cols="6">
              <p class="m-0 p-0" v-text="day.day + ':'" />
            </b-col>
            <b-col cols="6">
              <p
                v-for="time in day.times"
                :key="time._id"
                class="m-0 p-0 text-right"
                v-text="
                  `${time.opening.substr(0, 5)} - ${time.closing.substr(0, 5)}`
                "
              />
            </b-col>
          </b-row>
          <hr />
        </div>
      </b-col>
      <!-- End oppettider -->
    </b-row>
  </section>
</template>

<script>
export default {
  props: ["centrumtextarea", "centurmTitle", "hemsida", "oppettider"],
};
</script>

<style></style>
