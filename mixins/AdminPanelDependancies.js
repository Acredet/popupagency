/* eslint-disable no-sequences */
exports.AdminPanelDependancies = {
	mounted() {
		this.loadScript("/js/adminfiles.js");
		this.$forceUpdate();
	},
	updated() {
		const filesInThere = document.querySelectorAll(
			'script[src="/js/adminfiles.js"]'
		);
		if (filesInThere.length === 0) {
			this.loadScript("/js/adminfiles.js");
		} else {
			filesInThere.forEach((file) => file.parentNode.removeChild(file));
			this.loadScript("/js/adminfiles.js");
		}
		console.log("updated");
	},
	methods: {
		loadScript(src) {
			try {
				let script = document.createElement("script");
				script.src = src;
				script.async = false;
				document.body.insertBefore(script, document.body.firstChild);
			} catch (e) {
				loadScripts(src);
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
