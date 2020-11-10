export default function ({ app, redirect }) {
  const { $auth, localePath } = app
  // check if the user has logged in
  if (!($auth.user)) {
    // redirect to the home page
    redirect(localePath('/'))
  }
}
