/* eslint-disable no-sequences */
exports.AdminPanelDependancies = {
	mounted() {
		this.loadScript("/js/adminfiles.js");
		this.$forceUpdate();
	},
	updated() {
		this.loadScript("/js/adminfiles.js");
		console.log("updated");
	},
	methods: {
		loadScript(src) {
			let script = document.createElement("script");
			script.src = src;
			script.async = false;
			document.body.insertBefore(script, document.body.firstChild);
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
