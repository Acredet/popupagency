<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div v-if="$auth.user" :key="renderKey" class="left side-menu">
    <div id="remove-scroll" class="slimscroll-menu">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul id="side-menu" :key="renderKey - 50" class="metismenu">
          <li class="menu-title" v-text="$t('adminSidebar.main')" />

          <li v-for="list in realLinks" :key="list.text">
            <a href="javascript:void(0);" class="waves-effect">
              <i :class="list.icon" />
              <span>
                {{ list.text }}
                <span class="float-right menu-arrow"
                  ><i class="mdi mdi-chevron-right"
                /></span>
              </span>
            </a>
            <ul v-if="list.subMenu.length > 0" class="submenu">
              <li v-for="link in list.subMenu" :key="link.url">
                <nuxt-link exact :to="`${$t('link')}admin${link.url}`">
                  {{ link.text }}
                </nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- Sidebar -->
      <div class="clearfix" />
    </div>
    <!-- Sidebar -left -->
  </div>
  <!-- Left Sidebar End -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    realLinks() {
      return [
        {
          accessableFor: ["manager", "admin"],
          text: "Home Page",
          icon: "fas fa-home",
          subMenu: [{ url: "/", text: "Admin homepage" }],
        },
        {
          accessableFor: ["admin"],
          text: this.$t("adminSidebar.listing.text"),
          icon: "far fa-map",
          subMenu: [
            {
              url: "/listings",
              text: this.$t("adminSidebar.listing.allListings"),
            },
            {
              url: "/listings/add",
              text: this.$t("adminSidebar.listing.addNewListing"),
            },
            {
              url: "/listings/region",
              text: this.$t("adminSidebar.listing.region"),
            },
            {
              url: "/listings/tags",
              text: this.$t("adminSidebar.listing.tags"),
            },
            {
              url: "/listings/categories",
              text: this.$t("adminSidebar.listing.categories"),
            },
          ],
        },
        {
          accessableFor: ["manager", "admin"],
          text: "Centrums",
          icon: "fas fa-store-alt",
          subMenu: [
            { url: "/centrum", text: this.$t("adminSidebar.center.all") },
            { url: "/centrum/add", text: this.$t("adminSidebar.center.add") },
          ],
        },
        {
          accessableFor: ["admin"],
          text: this.$t("adminSidebar.users.text"),
          icon: "far fa-user",
          subMenu: [
            { url: "/users", text: this.$t("adminSidebar.users.allUsers") },
            { url: "/users/add", text: this.$t("adminSidebar.users.addUser") },
            {
              url: "/users?role=admin",
              text: this.$t("adminSidebar.users.role.admin"),
            },
            {
              url: "/users?role=manager",
              text: this.$t("adminSidebar.users.role.manager"),
            },
            {
              url: "/users?role=listingOwner",
              text: this.$t("adminSidebar.users.role.spaceOwner"),
            },
            {
              url: "/users?role=spaceOwner",
              text: this.$t("adminSidebar.users.role.spaceOwner"),
            },
            {
              url: "/users?role=searcher",
              text: this.$t("adminSidebar.users.role.searcher"),
            },
          ],
        },
        {
          accessableFor: ["admin"],
          text: this.$t("adminSidebar.siteSettings.text"),
          icon: "fas fa-cog",
          subMenu: [
            {
              url: "/settings",
              text: this.$t("adminSidebar.siteSettings.text"),
            },
          ],
        },
        {
          accessableFor: ["listingOwner", "spaceOwner", "manager", "admin"],
          text: "User Listings",
          icon: "far fa-map",
          subMenu: [
            {
              url: `/listings/user-listing/${
                this.$auth.loggedIn ? this.$auth.user._id : ""
              }`,
              text: this.$t("adminSidebar.siteSettings.myPlaces"),
            },
            {
              url: "/listings/add",
              text: this.$t("adminSidebar.listing.addNewListing"),
            },
            { url: "/listings/drafts", text: "drafts" },
          ],
        },
      ];
    },
    ...mapGetters({
      renderKey: "renderKey",
    }),
  },
  watch: {
    renderKey() {
      this.fixSideBar();
    },
  },
  methods: {
    fixSideBar() {
      if (document) {
        [...document.querySelectorAll("#sidebar-menu a")].forEach((el) => {
          const pageUrl = window.location.href.split(/[?#]/)[0];

          const parent = el.parentElement;
          const parent2 = el.parentElement.parentElement;
          const parent3 = el.parentElement.parentElement.previousElementSibling;
          const parent4 = el.parentElement.parentElement.parentElement;
          const parent5 =
            el.parentElement.parentElement.parentElement.parentElement;
          const parent6 =
            el.parentElement.parentElement.parentElement.parentElement
              .parentElement;

          let x = el.href;

          if (!x.endsWith("/")) {
            x = x + "/";
          }

          console.log(`${x} => ${pageUrl + "/"} => ${x === pageUrl + "/"}`);

          if (x === pageUrl + "/") {
            el.classList.add("active");
            // el.classList.add("active");
            if (parent) {
              parent.classList.add("active"); // add active to li of the current link
            }
            if (parent2) {
              parent2.classList.add("in");
            }
            if (parent3) {
              parent3.classList.add("active"); // add active class to an anchor
            }
            if (parent4) {
              parent4.classList.add("active");
            }
            if (parent5) {
              parent5.classList.add("in"); // add active to li of the current link
            }
            if (parent6) {
              parent6.classList.add("active");
            }
          }
        });
      }
    },
  },
  mounted() {
    setTimeout(this.fixSideBar(), 1500);
  },
};
</script>

<style scoped>
.submenu li.active > a:not(.nuxt-link-active) {
  color: #8699ad !important;
}

a.nuxt-link-active {
  color: white !important;
}
</style>
