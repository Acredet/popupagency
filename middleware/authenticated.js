export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (process.client) {
    if (!store.state.auth.loggedIn) {
      return redirect('/admin/login')
    }
  }
}
