export default {
  methods: {
    makeToast(title, msg, variant) {
      this.$bvToast.toast(msg, {
        title,
        variant,
        autoHideDelay: 5000,
        appendToast: true,
      });
    },
  },
};
