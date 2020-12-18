/* eslint-disable no-sequences */
exports.AdminPanelDependancies = {
	mounted() {
		this.loadScript("/js/adminfiles.js");
		this.$forceUpdate();
	},
	methods: {
		loadScript(src) {
			const filesInThere = document.querySelectorAll(
				'script[src="/js/adminfiles.js"]'
			);

			if (filesInThere.length !== 0) {
				filesInThere.forEach((file) => file.parentNode.removeChild(file));
			}

			try {
				let script = document.createElement("script");
				script.src = src;
				script.async = false;
				document.body.insertBefore(script, document.body.firstChild);
			} catch (e) {
				console.log(e);
			}
		},
	},
	head() {
		return {
			link: [
				{
					href: "/css/admin-styles.css",
					rel: "stylesheet",
					type: "text/css",
					body: true,
				},
			],
		};
	},
};
