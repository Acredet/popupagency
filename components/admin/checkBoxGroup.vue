<template>
  <div>
    <b-form-group v-if="items.length > 0">
      <template #label>
        <b-form-checkbox
          v-model="allSelected"
          :indeterminate="indeterminate"
          :state="(typeof state === 'boolean') ? state : null"
          @change="toggleAll"
        >
          {{ allSelected ? 'Un-select All' : 'Select All' }}
        </b-form-checkbox>
      </template>

      <b-form-checkbox-group
        v-model="selected"
        :options="allItems"
        :state="(typeof state === 'boolean') ? state : null"
        :checked="selected"
        value-field="value"
        :aria-label="`Individual ${name}`"
      />
    </b-form-group>
    <p v-else class="text-secondary">
      There is options to choose from you can add more in
      <nuxt-link :to="link" v-text="'Tags'" />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    edit: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: () => ''
    },
    state: {
      type: Boolean,
      default: () => null
    },
    link: {
      type: String,
      default: () => ''
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      once: true,
      allItems: [],
      selected: [],
      selectedObj: [],
      allSelected: false,
      indeterminate: false
    }
  },
  watch: {
    edit: {
      deep: true,
      handler (newValue) {
        if (this.once && newValue && newValue.length > 0) {
          if (typeof newValue[0] === 'string') {
            this.selected = newValue.map(x => JSON.parse(x).name[this.$i18n.locale])
          } else { this.selected = newValue.map(x => x.name[this.$i18n.locale]) }
          this.once = false
        }
      }
    },
    items: {
      immediate: true,
      deep: true,
      handler (newValue) {
        this.allItems = newValue.map(x => x.text)
      }
    },
    selected (newVal, oldVal) {
      // Handle changes in individual flavour checkboxes
      if (newVal.length === 0) { // unselect
        this.selectedObj = []
        this.indeterminate = false
        this.allSelected = false
      } else if (newVal.length === this.items.length) { // select All
        this.indeterminate = false
        this.allSelected = true
        this.selectedObj = this.items.map(item => item.value)
      } else {
        const objItems = []
        for (let i = 0; i < this.items.length; i++) {
          const element = this.items[i]
          if (newVal.includes(element.value.name[this.$i18n.locale])) {
            objItems.push(element.value)
          }
        }
        // newVal.forEach((element) => { // select Some
        //   const item = this.items.filter((x, i) => x.value.name[this.$i18n.locale] === element)
        //   if (item[0] && item[0].value) { objItems.push(item[0].value) }
        // })
        this.selectedObj = objItems
        this.indeterminate = true
        this.allSelected = false
      }
    },
    selectedObj (newVal, oldVal) {
      this.$emit('valueChanged', newVal)
    }
  },
  methods: {
    toggleAll (checked) {
      this.selected = checked ? this.allItems.slice() : []
      this.selectedObj = checked ? this.items.slice() : []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
