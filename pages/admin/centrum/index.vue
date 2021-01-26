<template>
  <div>
    <!-- <loading :state="loading" /> -->

    <div class="content">
      <b-modal
        id="delete-modal"
        centered
        :title="$t('allListing.deleteModal.title')"
      >
        <p class="my-4">
          {{ $t("actions.deleteConfimrMessage") }}
          {{ editForm.title ? editForm.title[$i18n.locale] : "" }}?
        </p>

        <template v-slot:modal-footer="{ ok, cancel }">
          <b-btn
            variant="danger"
            @click="
              deleteListing();
              ok();
            "
          >
            {{ $t("actions.delete") }}
          </b-btn>
          <b-btn
            variant="primary"
            @click="
              cancel();
              editForm = {};
            "
          >
            {{ $t("actions.cancle") }}
          </b-btn>
        </template>
      </b-modal>

      <b-container>
        <div class="d-flex align-items-center justify-content-between">
          <h2>{{ $t("centrum.allCenterums") }}</h2>
          <b-btn
            variant="primary"
            :to="localePath('/admin/centrum/add')"
            v-text="$t('adminSidebar.center.add')"
          />
        </div>
        <b-skeleton-table
          v-if="galleries.length !== items.length"
          :rows="5"
          :columns="4"
          :table-props="{ bordered: true, striped: true }"
        />
        <b-table
          v-else
          :items="items"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          responsive="sm"
          show-empty
        >
          <template v-slot:cell(title)="data">
            <p>{{ data.item.title[$i18n.locale] }}</p>
          </template>
          <template v-slot:cell(hemsida)="data">
            <a :href="data.item.hemsida" target="_blank">
              {{ data.item.hemsida }}
            </a>
          </template>
          <template v-slot:cell(centrumgalleri)="data" class="text-center">
            <img
              :src="getGallery(data.item.centrumgalleri[0])"
              width="150px"
              :alt="data.item.title[$i18n.locale]"
            />
          </template>

          <template v-slot:cell(actions)="data">
            <b-dropdown variant="light">
              <template v-slot:button-content>
                <b>{{ $t("actions.actions") }}</b>
              </template>
              <b-dropdown-item
                :to="localePath(`/admin/centrum/edit/${data.item._id}`)"
              >
                {{ $t("actions.edit") }}
              </b-dropdown-item>
              <b-dropdown-item
                v-b-modal.delete-modal
                @click="editForm = data.item"
              >
                {{ $t("actions.delete") }}
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>

        <div>
          {{ $t("tables.sort.by") }} <b>{{ sortBy }}</b
          >, {{ $t("tables.sort.direction") }}
          <b>{{
            sortDesc
              ? $t("tables.sort.descending")
              : $t("tables.sort.ascending")
          }}</b>
        </div>
        <toast :toast="toast" />
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getImages } from "@/mixins/utils/getImage";
export default {
  name: "Listings",
  layout: "admin",
  mixins: [getImages],
  data() {
    return {
      loading: false,
      toast: {
        title: null,
        variant: null,
        visible: false,
        text: null,
      },
      sortBy: this.$t("allListing.table.header.title"),
      sortDesc: false,
      editForm: {},
      fields: [
        { key: "title", label: this.$t("centrum.title"), sortable: true },
        { key: "hemsida", label: this.$t("centrum.website"), sortable: true },
        {
          key: "centrumgalleri",
          label: this.$t("centrum.centerGallery"),
          sortable: true,
        },
        { key: "actions", label: this.$t("allListing.table.header.actions") },
      ],
      galleries: [],
    };
  },
  computed: {
    ...mapGetters({
      items: "centrums",
    }),
  },
  methods: {
    ...mapActions(["getCentrums"]),
    async deleteListing() {
      const regions = await this.$axios.get("/region");
      const centrumRegion = regions.data.data.filter(
        (x) => !!x.centrum && x.centrum === this.editForm._id
      )[0];
      await this.$axios
        .$delete(`/centrum/${this.editForm._id}`)
        .then(async (res) => {
          await this.$axios
            .patch(`/region/${centrumRegion._id}`, { centrum: null })
            .then(async (_) => {
              await this.getCentrums();
              this.toast = {
                title: this.$t("allListing.toast.delete"),
                variant: "success",
                visible: true,
                text: `${this.$t("allListing.toast.justDeleted")} ${
                  this.editForm.name
                } from Listings.`,
              };
              this.editForm = {};
            })
            .catch((err) => {
              this.toast = {
                title: this.$t("allListing.toast.error"),
                variant: "danger",
                visible: true,
                text: err.message,
              };
            });
        })
        .catch((err) => {
          this.toast = {
            title: this.$t("allListing.toast.error"),
            variant: "danger",
            visible: true,
            text: err.message,
          };
        });
    },
    getGallery(link) {
      const gallery = this.galleries.filter(
        (gallery) => gallery.link === link
      )[0];
      if (gallery) return gallery.img;
    },
    async createGallery(link) {
      const gallery = {
        link,
        img: await this.getImage(link),
      };
      this.galleries.push(gallery);
    },
  },
  mounted: async function () {
    this.items.forEach((item) => {
      this.createGallery(item.centrumgalleri[0]);
      console.log(item.centrumgalleri[0]);
    });
  },
};
</script>

<style scoped></style>
