export default ({ app, $auth }) => {
	$auth.onRedirect((to, from) => {
		if (from.includes("/lokal/")) {
			return app.localePath(from);
		}
		return app.localePath(to);
	});
};
