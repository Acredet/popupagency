<template>
  <div>
    <gmap-street-view-panorama
      class="pano"
      :position="pos"
      :pov="pov"
      :zoom="1"
      @pano_changed="updatePano"
      @pov_changed="updatePov"
    />
  </div>
</template>

<script>
export default {
  props: {
    pos: {
      type: Object,
      default: () => {
        return { lat: 52.201272, lng: 0.11872 };
      },
    },
  },
  data() {
    return {
      pov: null,
      pano: null,
    };
  },
  methods: {
    updatePov(pov) {
      this.pov = pov;
    },
    updatePano(pano) {
      this.pano = pano;
    },
  },
};
</script>

<style>
.pano {
  width: 100%;
  height: 300px;
}
</style>
