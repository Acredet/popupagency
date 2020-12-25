<template>
  <!-- Start Home Details -->
  <section>
    <h6 class="text-secondary">
      Home Details for
      {{ title ? title[$i18n.locale] : "" }}
    </h6>
    <ul class="list-inline">
      <li
        v-for="tag in egenskaper"
        :key="tag.name[$i18n.locale]"
        class="list-inline-item"
      >
        <img
          v-if="tag.avatar"
          :src="`https://popup.dk.se/_nuxt/img/${tag.avatar}`"
          width="30px"
          :alt="tag.name[$i18n.locale]"
        />
        <span
          v-else
          style="
            display: inline-block;
            height: 30px;
            vertical-align: middle;
            width: 30px;
          "
        />
        <p class="d-inline-block">{{ tag.name[$i18n.locale] }}.</p>
      </li>
    </ul>
  </section>
  <!-- End Home Details -->
</template>

<script>
export default {
  props: ["title", "egenskaper"],
};
</script>

<style></style>
