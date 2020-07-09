<template>
  <div id="wrapper">
    <admin-header />
    <admin-sidebar />

    <div class="my-3 content-page">
      <Nuxt />
    </div>
    <admin-footer />
  </div>
</template>

<script>
/* eslint-disable no-sequences */
import adminHeader from '@/components/admin/admin-Header'
import adminFooter from '@/components/admin/adminFooter'
import adminSidebar from '@/components/admin/admin-Sidebar.vue'

export default {
  components: {
    adminHeader,
    adminFooter,
    adminSidebar
  },
  mounted () {
    console.log('ds')
    this.$nextTick(() => {
      this.initApp()
    })
  },
  methods: {
    initApp () {
      // eslint-disable-next-line no-unused-expressions
      !(function ($) {
        'use strict'
        const MainApp = function () {}

        // eslint-disable-next-line no-unused-expressions
        MainApp.prototype.intSlimscrollmenu = function () {
          $('.slimscroll-menu').slimscroll({
            height: 'auto',
            position: 'right',
            size: '5px',
            color: '#9ea5ab',
            wheelStep: 5,
            touchScrollStep: 50
          })
        },
        MainApp.prototype.initSlimscroll = function () {
          $('.slimscroll').slimscroll({
            height: 'auto',
            position: 'right',
            size: '5px',
            color: '#9ea5ab',
            touchScrollStep: 50
          })
        },

        MainApp.prototype.initMetisMenu = function () {
          // metis menu
          $('#side-menu').metisMenu()
        },

        MainApp.prototype.initLeftMenuCollapse = function () {
          // Left menu collapse
          $('.button-menu-mobile').on('click', function (event) {
            event.preventDefault()
            $('body').toggleClass('enlarged')
            console.log('ds')
          })
        },

        MainApp.prototype.initEnlarge = function () {
          if ($(window).width() < 1025) {
            $('body').addClass('enlarged')
          } else {
            $('body').removeClass('enlarged')
          }
        },

        MainApp.prototype.initActiveMenu = function () {
          // === following js will activate the menu in left side bar based on url ====
          $('#sidebar-menu a').each(function () {
            const pageUrl = window.location.href.split(/[?#]/)[0]
            if (this.href === pageUrl) {
              $(this).addClass('active')
              $(this).parent().addClass('active') // add active to li of the current link
              $(this).parent().parent().addClass('in')
              $(this).parent().parent().prev().addClass('active') // add active class to an anchor
              $(this).parent().parent().parent().addClass('active')
              $(this).parent().parent().parent().parent().addClass('in') // add active to li of the current link
              $(this).parent().parent().parent().parent().parent().addClass('active')
            }
          })
        },

        MainApp.prototype.initComponents = function () {
          $('[data-toggle="tooltip"]').tooltip()
          $('[data-toggle="popover"]').popover()
        },

        MainApp.prototype.initHeaderCharts = function () {
          $('#header-chart-1').sparkline([8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12], {
            type: 'bar',
            height: '35',
            barWidth: '5',
            barSpacing: '3',
            barColor: '#7A6FBE'
          })
          $('#header-chart-2').sparkline([8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12], {
            type: 'bar',
            height: '35',
            barWidth: '5',
            barSpacing: '3',
            barColor: '#29bbe3'
          })
        },

        MainApp.prototype.init = function () {
          this.intSlimscrollmenu()
          this.initSlimscroll()
          this.initMetisMenu()
          this.initLeftMenuCollapse()
          this.initEnlarge()
          this.initActiveMenu()
          this.initComponents()
          this.initHeaderCharts()
          // eslint-disable-next-line no-undef
          Waves.init()
        },

        // init
        $.MainApp = new MainApp(), $.MainApp.Constructor = MainApp
      // eslint-disable-next-line no-sequences
      }(window.jQuery)),

      // initializing
      (function ($) {
        'use strict'
        $.MainApp.init()
      }(window.jQuery))
    }
  },
  head () {
    return {
      link: [
        { rel: 'shortcut icon', href: '/images/favicon.ico' },
        { rel: 'stylesheet', href: '/plugins/morris/morris.css' },
        { href: '/css/bootstrap.min.css', rel: 'stylesheet', type: 'text/css' },
        { href: '/css/metismenu.min.css', rel: 'stylesheet', type: 'text/css' },
        { href: '/css/icons.css', rel: 'stylesheet', type: 'text/css' },
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
