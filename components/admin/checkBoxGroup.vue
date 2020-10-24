<template>
  <div>
    <b-form-group v-if="items.length > 0">
      <template #label>
        <b-form-checkbox
          v-model="allSelected"
          :indeterminate="indeterminate"
          :state="(typeof state === 'boolean') ? state : null"
          @input="toggleAll"
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
      immediate: true,
      deep: true,
      handler (newValue) {
        if (this.once && newValue && newValue.length > 0) {
          console.log('newValue: ', newValue, this.once && newValue && newValue.length > 0)
          this.selected = newValue.map(x => x.text)
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
      const objItems = []
      newVal.forEach((element) => {
        const item = this.items.filter((x, i) => x.text === element)
        if (item[0]) {
          objItems.push(item[0])
        }
      })
      this.selectedObj = objItems
      // Handle changes in individual flavour checkboxes
      if (newVal.length === 0) {
        this.indeterminate = false
        this.allSelected = false
      } else if (newVal.length === this.items.length) {
        this.indeterminate = false
        this.allSelected = true
      } else {
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
