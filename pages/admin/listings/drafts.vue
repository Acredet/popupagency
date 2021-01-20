<template>
  <div>
    <loading :state="loading" />

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
          <h2>{{ $t("adminSidebar.listing.allListings") }}:</h2>
          <b-btn
            variant="primary"
            :to="`${$t('link')}admin/listings/add`"
            v-text="$t('adminSidebar.listing.addNewListing')"
          />
        </div>
        <b-table
          :items="items"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          responsive="sm"
          show-empty
        >
          <template v-slot:cell(title)="data">
            <p class="text-center">
              {{
                data.item.title[$i18n.locale]
                  ? data.item.title[$i18n.locale]
                  : "-"
              }}
            </p>
          </template>

          <template v-slot:cell(expiry)="data">
            <p v-if="data.item.expiry" class="text-center">
              {{ data.item.expiry.substring(0, 10) }}
            </p>
            <p v-else class="text-center">-</p>
          </template>

          <template v-slot:cell(cover)="data">
            <b-img
              v-if="data.item.cover && data.item.cover[0]"
              width="100"
              :src="`https://popup.dk.se/_nuxt/img/${data.item.cover[0]}`"
            />
            <p v-else class="text-center">-</p>
          </template>

          <template v-slot:cell(stad)="data">
            <p class="text-center">
              {{
                data.item.stad[$i18n.locale]
                  ? data.item.stad[$i18n.locale]
                  : "-"
              }}
            </p>
          </template>

          <template v-slot:cell(actions)="data">
            <b-dropdown variant="light">
              <template v-slot:button-content>
                <b>{{ $t("actions.actions") }}</b>
              </template>
              <b-dropdown-item
                :to="`/admin/listings/edit/${data.item.title.sv
                  .split(' ')
                  .join('-')}`"
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
export default {
  name: "Listings",
  layout: "admin",
  data() {
    return {
      loading: true,
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
        {
          key: "title",
          label: this.$t("allListing.table.header.title"),
          sortable: true,
        },
        {
          key: "expiry",
          label: this.$t("allListing.table.header.expiry"),
          sortable: true,
        },
        {
          key: "cover",
          label: this.$t("allListing.table.header.cover"),
          sortable: false,
        },
        {
          key: "stad",
          label: this.$t("allListing.table.header.stad"),
          sortable: true,
        },
        { key: "actions", label: this.$t("allListing.table.header.actions") },
      ],
      items: null,
    };
  },
  mounted() {
    this.getListings();
  },
  methods: {
    async getListings() {
      await this.$axios
        .$get("/places/listings/drafts")
        .then((res) => {
          this.items = res.data;
          this.loading = false;
        })
        .catch((err) => console.log(err));
    },
    async deleteListing() {
      await this.$axios
        .$delete(`/places/${this.editForm._id}`)
        .then((res) => {
          this.getListings();
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
    },
  },
};
</script>

<style scoped></style>
