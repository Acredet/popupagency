<template>
  <b-button-group
    v-if="icons.length > 0"
    vertical
    class="d-flex flex-wrap align-items-center justify-content-between flex-row w-100"
  >
    <b-button
      v-for="icon in icons"
      :key="icon.text"
      :pressed="icon.state"
      variant="outline-primary"
      squared
      :style="{ width: sideBar ? '100%' : '45%' }"
      class="text-left m-1"
      @click="clicked(icon)"
    >
      <b-img
        v-if="icon.avatar"
        width="30"
        :src="`https://popup.dk.se/_nuxt/img/${icon.avatar}`"
      />
      {{ icon.text }}
    </b-button>
  </b-button-group>
</template>

<script>
export default {
  props: {
    sideBar: {
      type: Boolean,
      default: () => false,
    },
    icons: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    clicked(icon) {
      this.$emit("iconChoosed", icon);
    },
  },
};
</script>
