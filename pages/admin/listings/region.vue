<template>
  <div class="content">
    <b-modal
      id="edit-modal"
      centered
      :title="$t('region.editModal.title')"
      @close="
        editForm = {
          name: { en: '', sv: '' },
          parent: null,
          description: { en: '', sv: '' },
        }
      "
    >
      <b-form>
        <b-form-group
          id="name-en-group"
          :label="`${$t('forms.name.title')} (English):`"
          label-for="name-en"
          :description="$t('forms.name.desc')"
        >
          <b-form-input
            id="name-en"
            v-model="editForm.name.en"
            :state="editNameValidEn"
            type="text"
            required
            autocomplete="off"
            :placeholder="$t('forms.name.holder')"
          />

          <b-form-invalid-feedback
            :state="editNameValidEn"
            v-text="$t('forms.required')"
          />

          <b-form-valid-feedback
            :state="editNameValidEn"
            v-text="$t('forms.valid')"
          />
        </b-form-group>

        <b-form-group
          id="name-sv-group"
          :label="`${$t('forms.name.title')} (Swedish):`"
          label-for="name-sv"
          :description="$t('forms.name.desc')"
        >
          <b-form-input
            id="name-sv"
            v-model="editForm.name.sv"
            :state="editNameValidSv"
            type="text"
            required
            autocomplete="off"
            :placeholder="$t('forms.name.holder')"
          />

          <b-form-invalid-feedback
            :state="editNameValidSv"
            v-text="$t('forms.required')"
          />

          <b-form-valid-feedback
            :state="editNameValidSv"
            v-text="$t('forms.valid')"
          />
        </b-form-group>

        <b-form-group
          id="select-group"
          :label="$t('forms.parent.title')"
          label-for="region"
          :description="$t('forms.parent.desc')"
        >
          <b-form-select
            id="region"
            v-model="editForm.parent"
            class="mb-2 mr-sm-2 mb-sm-0"
            :options="parentOpts"
          />
        </b-form-group>

        <b-form-group
          id="description-en-group"
          :label="`${$t('forms.decription.title')} (English):`"
          label-for="description-en"
          :description="$t('forms.decription.desc')"
        >
          <b-form-textarea
            id="description-en"
            v-model="editForm.description.en"
            :placeholder="$t('forms.decription.holder')"
            rows="3"
          />
        </b-form-group>

        <b-form-group
          id="description-sv-group"
          :label="`${$t('forms.decription.title')} (Swedish):`"
          label-for="description-sv"
          :description="$t('forms.decription.desc')"
        >
          <b-form-textarea
            id="description-sv"
            v-model="editForm.description.sv"
            :placeholder="$t('forms.decription.holder')"
            rows="3"
          />
        </b-form-group>
      </b-form>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-btn
          variant="primary"
          @click="
            editRigion();
            ok();
          "
        >
          {{ $t("actions.edit") }}
        </b-btn>
        <b-btn
          variant="danger"
          @click="
            cancel();
            editForm = {
              name: { en: '', sv: '' },
              parent: null,
              description: { en: '', sv: '' },
            };
          "
        >
          {{ $t("actions.cancle") }}
        </b-btn>
      </template>
    </b-modal>

    <b-modal id="delete-modal" centered :title="$t('region.deleteModal.title')">
      <p class="my-4">
        {{ $t("actions.deleteConfimrMessage") }}
        {{ editForm.name[$i18n.getLocaleCookie()] }}?
      </p>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-btn
          variant="danger"
          @click="
            deleteItem('region');
            ok();
          "
        >
          {{ $t("actions.delete") }}
        </b-btn>
        <b-btn
          variant="primary"
          @click="
            cancel();
            editForm = {
              name: { en: '', sv: '' },
              parent: null,
              description: { en: '', sv: '' },
            };
          "
        >
          {{ $t("actions.cancle") }}
        </b-btn>
      </template>
    </b-modal>

    <b-container>
      <h2>{{ $t("region.title") }}</h2>
      <b-row>
        <b-col cols="12" md="4">
          <b-form>
            <b-form-group
              id="name-en-group"
              :label="`${$t('forms.name.title')} (English):`"
              label-for="name-en"
              :description="$t('forms.name.desc')"
            >
              <b-form-input
                id="name-en"
                v-model="form.name.en"
                :state="nameValidEn"
                type="text"
                required
                autocomplete="off"
                :placeholder="$t('forms.name.holder')"
              />

              <b-form-invalid-feedback
                :state="nameValidEn"
                v-text="$t('forms.required')"
              />

              <b-form-valid-feedback
                :state="nameValidEn"
                v-text="$t('forms.valid')"
              />
            </b-form-group>

            <b-form-group
              id="name-sv-group"
              :label="`${$t('forms.name.title')} (Swedish):`"
              label-for="name-sv"
              :description="$t('forms.name.desc')"
            >
              <b-form-input
                id="name-sv"
                v-model="form.name.sv"
                :state="nameValidSv"
                type="text"
                required
                autocomplete="off"
                :placeholder="$t('forms.name.holder')"
              />

              <b-form-invalid-feedback
                :state="nameValidSv"
                v-text="$t('forms.required')"
              />

              <b-form-valid-feedback
                :state="nameValidSv"
                v-text="$t('forms.valid')"
              />
            </b-form-group>

            <b-form-group
              id="select-group"
              :label="$t('forms.parent.title')"
              label-for="region"
              :description="$t('forms.parent.desc')"
            >
              <b-form-select
                id="region"
                v-model="form.parent"
                class="mb-2 mr-sm-2 mb-sm-0"
                :options="parentOpts"
              />
            </b-form-group>

            <b-form-group
              id="description-en-group"
              :label="`${$t('forms.decription.title')} (English):`"
              label-for="description-en"
              :description="$t('forms.decription.desc')"
            >
              <b-form-textarea
                id="description-en"
                v-model="form.description.en"
                :placeholder="$t('forms.decription.holder')"
                rows="3"
              />
            </b-form-group>

            <b-form-group
              id="description-sv-group"
              :label="`${$t('forms.decription.title')} (Swedish):`"
              label-for="description-sv"
              :description="$t('forms.decription.desc')"
            >
              <b-form-textarea
                id="description-sv"
                v-model="form.description.sv"
                :placeholder="$t('forms.decription.holder')"
                rows="3"
              />
            </b-form-group>

            <b-btn
              variant="primary"
              :disabled="!form.name"
              @click="addRigion"
              v-text="$t('region.addBtn')"
            />
          </b-form>
        </b-col>

        <b-col cols="12" md="8">
          <b-row class="my-2">
            <b-col md="3" class="mb-1 mb-md-0">
              <b-btn
                block
                variant="primary"
                @click="
                  sortBy = '';
                  sortItems(items, true);
                "
              >
                Clear Sort
              </b-btn>
            </b-col>

            <b-col cols="12" md="9">
              <b-form-group label-for="filterInput">
                <b-input-group>
                  <b-form-input
                    id="filterInput"
                    v-model="filter"
                    type="search"
                    placeholder="Type to Search"
                  />
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">
                      Clear
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>

          <b-table
            id="all-listing"
            :items="items"
            :fields="fields"
            :filter="filter"
            :sort-by.sync="sortBy"
            :filter-included-fields="['name']"
            :sort-desc.sync="sortDesc"
            :current-page="currentPage"
            :per-page="perPage"
            responsive="sm"
            show-empty
          >
            <template v-slot:cell(name)="data">
              <p>
                {{ data.item.name[$i18n.locale] }}
              </p>
            </template>

            <template v-slot:cell(description)="data">
              <p v-if="data.item.description">
                {{ data.item.description[$i18n.locale] }}
              </p>
              <p v-else>-</p>
            </template>

            <template v-slot:cell(parent)="data">
              <p class="text-center font-wight-bold">
                {{
                  getParent(data.item.parent).length > 0
                    ? getParent(data.item.parent)[0].name[$i18n.locale]
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
                  v-b-modal.edit-modal
                  @click="editForm = data.item"
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

          <b-row class="justify-content-center align-items-center">
            <b-col
              cols="12"
              md="8"
              class="d-flex justify-content-center align-items-center"
            >
              <b-pagination
                v-model="currentPage"
                :total-rows="items.length"
                :per-page="perPage"
                aria-controls="all-listing"
              />
            </b-col>
            <b-col cols="12" md="4">
              <b-form-group
                id="per-page-group"
                :label="$t('tables.pagenation.perPage')"
                label-for="per-page"
              >
                <b-form-select
                  id="per-page"
                  v-model="perPage"
                  :options="perPageOpts"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <div>
            {{ $t("tables.sort.by") }} <b>{{ sortBy }}</b
            >, {{ $t("tables.sort.direction") }}
            <b>{{
              sortDesc
                ? $t("tables.sort.descending")
                : $t("tables.sort.ascending")
            }}</b>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <toast :toast="toast" />
  </div>
</template>

<script>
import { ListingDepedancies } from "@/mixins/ListingDepedancies";
import { sortItems } from "@/mixins/SortRegions";

export default {
  name: "ListingRegion",
  layout: "admin",
  mixins: [sortItems, ListingDepedancies],
  data() {
    return {
      filter: null,
      sortBy: null,
    };
  },
  beforeMount() {
    this.getRigions();
  },
  methods: {
    async getRigions() {
      const vm = this;
      await vm.$axios
        .$get("/region")
        .then((res) => {
          // vm.items = res.data
          vm.items = vm.sortItems(res.data, true);
          console.log(this.items);
          this.$forceUpdate();
        })
        .catch((err) => {
          this.toast = {
            title: "There is something wrong",
            variant: "danger",
            visible: true,
            text: err.message,
          };
        });
    },
    async addRigion() {
      await this.$axios
        .$post("/region", this.form)
        .then((res) => {
          this.getRigions();
          this.form = {
            name: {
              en: "",
              sv: "",
            },
            parent: null,
            description: {
              en: "",
              sv: "",
            },
          };
          this.toast = {
            title: this.$t("region.toast.add"),
            variant: "success",
            visible: true,
            text: `${this.$t("region.toast.justAdded")} ${
              this.form.name[this.$i18n.getLocaleCookie()]
            } Region.`,
          };
        })
        .catch((err) => {
          this.toast = {
            title: this.$t("region.toast.error"),
            variant: "danger",
            visible: true,
            text: err.message,
          };
        });
    },
    async editRigion() {
      await this.$axios
        .$patch(`/region/${this.editForm._id}`, this.editForm)
        .then((res) => {
          this.getRigions();
          this.toast = {
            title: this.$t("region.toast.edit"),
            variant: "success",
            visible: true,
            text: `${this.$t("region.toast.justEdited")} ${
              this.$i18n.getLocaleCookie() === "en"
                ? this.editForm.name.en
                : this.editForm.name.sv
            } Region.`,
          };
        })
        .catch((err) => {
          this.toast = {
            title: this.$t("region.toast.error"),
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
