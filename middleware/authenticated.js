export default async function (context) {
  await setTimeout(function () {
    if (process.client) {
      const { from } = context;
    }
    if (!context.store.state.auth.loggedIn) {
      return context.redirect("/login");
    }
  }, 500);
}
