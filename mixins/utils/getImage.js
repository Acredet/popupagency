exports.getImages = {
  methods: {
    async getImage(imgName) {
      return await new Promise((resolve, reject) => {
        this.$axios
          .get(`/files/${imgName}`)
          .then((res) => resolve(res.data))
          .catch((err) => reject(err));
      });
    },
  },
};
