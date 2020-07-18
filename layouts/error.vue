<template>
  <div class="wrapper-page">
    <div class="card">
      <div class="card-block">
        <div class="ex-page-content text-center">
          <h1 class="text-dark">
            404!
          </h1>
          <h4 class="">
            Sorry, page not found
          </h4><br>

          <nuxt-link class="btn btn-info mb-5 waves-effect waves-light" to="/">
            <i class="mdi mdi-home" /> Back to Home
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  head () {
    return {
      link: [
        { rel: 'shortcut icon', href: '/images/favicon.ico' },
        { rel: 'stylesheet', href: '/plugins/morris/morris.css' },
        { href: '/css/bootstrap.min.css', rel: 'stylesheet', type: 'text/css' },
        { href: '/css/metismenu.min.css', rel: 'stylesheet', type: 'text/css' },
        { href: '/css/icons.css', rel: 'stylesheet', type: 'text/css' },
        { href: '/css/style.css', rel: 'stylesheet', type: 'text/css' }
      ]
    }
  }
}
</script>

<style>

</style>
