export default function ({ store, redirect }) {
  if (process.client && !store.state.auth.loggedIn) {
    redirect('/admin/login')
  }
}
