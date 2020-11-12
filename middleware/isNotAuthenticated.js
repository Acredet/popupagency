/*
 * this middleware will be used
 * fot the user when he is trying to access log in page
 * we need to prevent him from entering this page
 *  */
export default function ({ app, redirect }) {
	const { $auth, localePath } = app;
	// if the user is loggedIn don't go to the loggin page
	if ($auth.loggedIn) {
		// redirect to the home page
		redirect(localePath("/"));
	}
}
