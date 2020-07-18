<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: '/plugins/morris/morris.css' },
        { href: '/css/bootstrap.min.css', rel: 'stylesheet', type: 'text/css' },
        { href: '/css/metismenu.min.css', rel: 'stylesheet', type: 'text/css' },
        { href: '/css/style.css', rel: 'stylesheet', type: 'text/css' }
      ],
      script: [
        { src: '/js/jquery.min.js' },
        { src: '/js/bootstrap.bundle.min.js' },
        { src: '/js/metisMenu.min.js' },
        { src: '/js/jquery.slimscroll.js' },
        { src: '/js/waves.min.js' },
        { src: '/plugins/jquery-sparkline/jquery.sparkline.min.js' }
      ]
    }
  }
}
</script>

<style>

</style>
