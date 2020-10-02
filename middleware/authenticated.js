export default async function (context) {
  await setTimeout(function () {
    console.log(context.from)
    if (process.client) {
      const { from } = context
      console.log(from)
    }
    if (!context.store.state.auth.loggedIn) {
      return context.redirect('/login')
    }
  }, 500)
}
