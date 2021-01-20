export default ({ app, $auth }) => {
  $auth.onRedirect((to, from) => {
    if (from.includes("/lokal/") || from.includes("lediga-lokaler")) {
      return app.localePath(from);
    }
    return app.localePath(to);
  });
};
