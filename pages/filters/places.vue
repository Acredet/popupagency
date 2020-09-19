<template>
  <div>
    <b-btn
      v-for="(country, key) in filters.plats.tabs"
      :key="key"
      variant="primary"
      class="mb-2 mr-2"
      @click="filters.plats.currentCountry = key"
    >
      {{ key }}
    </b-btn>
    <!-- Start Tabs -->
    <b-tabs
      v-model="filters.plats.currentCity"
      nav-wrapper-class="w-25 h-100 overflow-auto border"
      nav-class="d-block p-0 m-0"
      pills
      card
      content-class="overflow-auto"
      vertical
    >
      <!-- Start First tab -->
      <b-tab
        v-for="(tab, index) in filters.plats.tabs[filters.plats.currentCountry]"
        :key="tab.name"
        title-item-class="tabBtn"
        :title="tab.text"
      >
        <b-card-body class="mt-0 pt-0 px-1">
          <div class="choices">
            <b-form-group :key="renderKey">
              <template v-slot:label>
                <b-form-checkbox
                  v-model="tab.allSelected"
                  :indeterminate="tab.indeterminate"
                  :aria-describedby="tab.name"
                  :aria-controls="tab.name"
                  size="md"
                  @change="toggleAll(index)"
                >
                  <b class="font-2">Hela {{ tab.name }}</b>
                </b-form-checkbox>
              </template>
              <b-form-checkbox-group
                :id="tab.name"
                v-model="tab.selected"
                :options="tab.subcity"
                :name="tab.name"
                class="ml-4"
                aria-label="Individual flavours"
                stacked
                @change="placeChoose(index)"
              />
            </b-form-group>
          </div>
        </b-card-body>
      </b-tab>
      <!-- End tabs -->
    </b-tabs>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>
