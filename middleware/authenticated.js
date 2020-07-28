export default function (context) {
  // If the user is not authenticated
  console.log(context.$auth.$state.loggedIn)
  if (!context.$auth.$state.loggedIn) {
    return context.redirect('/admin/login')
  }
}
