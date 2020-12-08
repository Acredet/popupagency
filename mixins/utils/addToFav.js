exports.addToFav = {
	methods: {
		async AddToFav(e, title) {
			this.loading = true;
			const like = e.target;
			if (!this.$auth.loggedIn) {
				this.$emit("notAuthBookmark");
			} else {
				const update = {};
				Object.assign(update, this.$auth.user);
				update.fav = [...this.$auth.user.fav];
				const index = update.fav.findIndex((x) => x === title);
				if (index === -1) {
					update.fav.push(title);
					like.classList.add("anim-like");
				} else {
					update.fav.splice(index, 1);
					like.classList.remove("anim-like");
				}
				await this.$axios
					.patch(`/users/${this.$auth.user._id}`, update)
					.then(async (res) => {
						await this.$auth.fetchUser();
					})
					.catch((err) => console.log(err));
			}
			this.loading = false;
		},
	},
};
