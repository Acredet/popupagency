<template>
  <div :key="`${sliderType}-${identifier}`">
    <client-only>
      <vue-slider v-model="value" :min="minAndMax.min" :max="minAndMax.max" @change="valueChanged" />
    </client-only>

    <small v-if="sliderType === 'yta'">{{ value[0] || 0 }} m<sup>3</sup>— {{ value[1] || 0 }} m<sup>3</sup></small>
    <small v-else>{{ value[0] || 0 }} Kr — {{ value[1] || 0 }} Kr</small>
  </div>
</template>

<script>
import 'vue-slider-component/theme/material.css'
let VueSlider
if (process.browser) {
  VueSlider = require('vue-slider-component')
}

export default {
  components: {
    VueSlider
  },
  props: {
    identifier: {
      type: Number,
      default: () => 0
    },
    sliderType: {
      type: String,
      default: () => 'price'
    },
    minAndMax: {
      type: Object,
      default: () => {
        return { min: 0, max: 100 }
      }
    }
  },
  data () {
    return {
      value: [0, 0],
      once: 0
    }
  },
  watch: {
    minAndMax: {
      immmediate: true,
      deep: true,
      handler (newValue) {
        console.log('LOOOOL: ', newValue)
        if (this.once === 0) {
          // console.log('LOOOOL', newValue.min, newValue.max)
          this.value = [newValue.min, newValue.max]
          this.once++
        }
      }
    }
  },
  methods: {
    valueChanged () {
      this.$emit('ytaChanged', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
