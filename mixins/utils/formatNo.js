exports.format = {
  methods: {
    format(num) {
      const arr = String(num).split("").reverse();
      const copy = [...arr];
      const indexes = [];

      for (let i = 1; i <= arr.length; i++) {
        if (i % 3 === 0) {
          indexes.push(i);
        }
      }

      if (copy.length > 3) {
        indexes.forEach((n, i) => copy.splice(n + i, 0, " "));
      }

      copy.reverse();
      if (copy[0] === ",") {
        copy.shift();
      }
      copy.join("");
      return copy.join("");
    },
  },
};
