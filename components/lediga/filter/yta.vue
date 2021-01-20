<template>
  <div
    :key="`${sliderType}-${identifier}`"
    class="d-flex flex-column justify-content-center align-items-center"
  >
    <p v-if="sliderType === 'yta'">
      <small
        >{{ value[0] || 0 }} m<sup>2</sup>— {{ value[1] || 0 }} m<sup
          >2</sup
        ></small
      >
    </p>
    <p v-else>
      <small>{{ value[0] || 0 }} Kr — {{ value[1] || 0 }} Kr</small>
    </p>
    <client-only>
      <vue-slider
        ref="slider"
        v-model="value"
        class="w-100"
        :min-range="1"
        :interval="step"
        :min="min"
        :max="max"
        @change="valueChanged"
      />
    </client-only>
  </div>
</template>

<script>
import "vue-slider-component/theme/material.css";
let VueSlider;
if (process.browser) {
  VueSlider = require("vue-slider-component");
}

export default {
  components: {
    VueSlider,
  },
  props: {
    step: {
      type: Number,
      default: () => 0,
    },
    identifier: {
      type: Number,
      default: () => 0,
    },
    sliderType: {
      type: String,
      default: () => "price",
    },
    minAndMax: {
      type: Object,
      default: () => {
        return { min: 0, max: 1 };
      },
    },
  },
  data() {
    return {
      value: [0, 0],
      once: 0,
      min: 0,
      max: 1,
    };
  },
  watch: {
    minAndMax: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (this.once === 0 && newValue.min !== newValue.max) {
          this.updateValue(newValue);
          this.once += 1;
        }
      },
    },
  },
  methods: {
    valueChanged() {
      this.$emit("ytaChanged", this.value);
    },
    updateValue(newValue) {
      this.$nextTick(() => {
        if (this.$refs && this.$refs.slider) {
          this.min = newValue.min;

          if (newValue.max % this.step != 0) {
            const makeValid =
              newValue.max + (this.step - (newValue.max % this.step));
            this.max = makeValid;

            this.$refs.slider.setValue([newValue.min, makeValid]);

            this.$emit("max-changed", makeValid);
          } else {
            this.max = newValue.max;
            this.$refs.slider.setValue([newValue.min, newValue.max]);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
