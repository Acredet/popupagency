export default function ({ app, redirect }) {
  const { $auth, localePath } = app
  // check if the current user is the admin
  if (!($auth.user && $auth.user.role === 'admin')) {
    // redirect to the home page
    redirect(localePath('/'))
  }
}
