<template>
  <div>
    <CentrumForm :centrum-edit="centrum" />
  </div>
</template>

<script>
import CentrumForm from "@/components/CentrumForm";
export default {
  name: "EdtiCentrum",
  layout: "admin",
  components: {
    CentrumForm,
  },
  data() {
    return {
      centrum: {},
    };
  },
  async created() {
    await this.$axios
      .get(`/centrum/${this.$route.params.id}`)
      .then((res) => {
        this.centrum = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>
