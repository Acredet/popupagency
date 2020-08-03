<template>
  <div class="content">
    <loading :state="loadingState" />

    <b-modal id="edit-modal" centered :title="$t('category.editModal.title')" @close="editForm = {}">
      <b-form id="edit-category" enctype="multipart/form-data">
        <b-form-group
          id="name-group"
          :label="$t('forms.name.title')"
          label-for="name"
          :description="$t('forms.name.desc')"
        >
          <b-form-input
            id="name"
            v-model="editForm.name"
            :state="editNameValid"
            type="text"
            required
            autocomplete="off"
            :placeholder="$t('forms.name.holder')"
          />

          <b-form-invalid-feedback :state="editNameValid" v-text="$t('forms.required')" />

          <b-form-valid-feedback :state="editNameValid" v-text="$t('forms.valid')" />
        </b-form-group>

        <b-form-group
          id="select-group"
          :label="$t('forms.parent.title')"
          label-for="category"
          :description="$t('forms.parent.desc')"
        >
          <b-form-select
            id="category"
            v-model="editForm.parent"
            class="mb-2 mr-sm-2 mb-sm-0"
            :options="parentOpts"
          />
        </b-form-group>

        <b-form-group
          id="description-group"
          :label="$t('forms.decription.title')"
          label-for="description"
          :description="$t('forms.decription.desc')"
        >
          <b-form-textarea
            id="description"
            v-model="editForm.description"
            :placeholder="$t('forms.decription.holder')"
            rows="3"
          />
        </b-form-group>

        <b-form-group
          id="avatar-edit-group"
          label="Avatar:"
          description="The description isn't prominent by default; howerver, some themes may show it."
        >
          <our-uploader
            :responsivness="{ cols: 12, sm: 12, md: 12, lg: 12 }"
            :name="'edit-avatar'"
            :old-images="[editForm.avatar]"
            :max-number-of-inputs="1"
            :max-file-size="64"
          >
            <template v-slot:old-Image>
              <div v-if="editForm && editForm.avatar" class="d-flex justify-content-center">
                <b-img style="height: 150px" :src="require(`@/server/images/${editForm.avatar}`)" />
              </div>
            </template>
          </our-uploader>
        </b-form-group>
      </b-form>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-btn variant="primary" @click="editItem('category'); ok()">
          Edit
        </b-btn>
        <b-btn
          variant="danger"
          @click="cancel(); editForm = { name: '', parent: null, description: null }"
        >
          Close
        </b-btn>
      </template>
    </b-modal>

    <b-modal id="delete-modal" centered :title="$t('category.deleteModal.title')">
      <p class="my-4">
        {{ $t('actions.deleteConfimrMessage') }} {{ editForm.name }}?
      </p>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-btn variant="danger" @click="deleteItem('category'); ok()">
          {{ $t('actions.delete') }}
        </b-btn>
        <b-btn variant="primary" @click="cancel(); editForm = {}">
          {{ $t('actions.cancle') }}
        </b-btn>
      </template>
    </b-modal>

    <b-container>
      <h2>{{ $t('category.title') }}</h2>
      <b-row>
        <b-col cols="12" md="4">
          <b-form id="add-category" enctype="multipart/form-data">
            <b-form-group
              id="name-group"
              :label="$t('forms.name.title')"
              label-for="name"
              :description="$t('forms.name.desc')"
            >
              <b-form-input
                id="name"
                v-model="form.name"
                :state="nameValid"
                type="text"
                required
                autocomplete="off"
                :placeholder="$t('forms.name.holder')"
              />

              <b-form-invalid-feedback :state="nameValid" v-text="$t('forms.required')" />

              <b-form-valid-feedback :state="nameValid" v-text="$t('forms.valid')" />
            </b-form-group>

            <b-form-group
              id="select-group"
              :label="$t('forms.parent.title')"
              label-for="category"
              :description="$t('forms.parent.desc')"
            >
              <b-form-select
                id="category"
                v-model="form.parent"
                class="mb-2 mr-sm-2 mb-sm-0"
                :options="parentOpts"
              />
            </b-form-group>

            <b-form-group
              id="description-group"
              :label="$t('forms.decription.title')"
              label-for="description"
              :description="$t('forms.decription.desc')"
            >
              <b-form-textarea
                id="description"
                v-model="form.description"
                :placeholder="$t('forms.decription.holder')"
                rows="3"
              />
            </b-form-group>

            <b-form-group
              id="avatar-group"
              label="Avatar:"
              description="The description isn't prominent by default; howerver, some themes may show it."
            >
              <our-uploader :responsivness="{ cols: 12, sm: 12, md: 12, lg: 12 }" :name="'avatar'" :max-number-of-inputs="1" :max-file-size="64" />
            </b-form-group>

            <b-btn variant="primary" :disabled="!form.name" @click="addItem('category')" v-text="$t('category.addBtn')" />
          </b-form>
        </b-col>

        <b-col class="mt-2 mt-md-0" cols="12" md="8">
          <b-table
            id="all-listing"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            responsive="sm"
            show-empty
          >
            <template v-slot:cell(parent)="data">
              <p class="text-center font-wight-bold">
                {{ (data.item.parent && data.item.parent !== 'null') ? data.item.parent : '-' }}
              </p>
            </template>
            <template v-slot:cell(actions)="data">
              <b-dropdown variant="light">
                <template v-slot:button-content>
                  <b>{{ $t('actions.actions') }}</b>
                </template>
                <b-dropdown-item v-b-modal.edit-modal @click="Object.assign(editForm, data.item)">
                  {{ $t('actions.edit') }}
                </b-dropdown-item>
                <b-dropdown-item v-b-modal.delete-modal @click="Object.assign(editForm, data.item)">
                  {{ $t('actions.delete') }}
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>

          <b-row class="justify-content-center align-items-center">
            <b-col cols="12" md="8" class="d-flex justify-content-center align-items-center">
              <b-pagination
                v-model="currentPage"
                :total-rows="items.length"
                :per-page="perPage"
                aria-controls="all-listing"
              />
            </b-col>
            <b-col cols="12" md="4">
              <b-form-group id="per-page-group" :label="$t('tables.pagenation.perPage')" label-for="per-page">
                <b-form-select
                  id="per-page"
                  v-model="perPage"
                  :options="perPageOpts"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <div>
        {{ $t('tables.sort.by') }} <b>{{ sortBy }}</b>, {{ $t('tables.sort.direction') }}
        <b>{{ sortDesc ? $t('tables.sort.descending') : $t('tables.sort.ascending') }}</b>
      </div>
    </b-container>

    <toast :toast="toast" />
  </div>
</template>

<script>
import ourUploader from '@/components/ourUploader'
import { ListingDepedancies } from '@/mixins/ListingDepedancies'

export default {
  name: 'ListingTags',
  components: {
    ourUploader
  },
  mixins: [ListingDepedancies],
  mounted () {
    this.getItems('category')
  }
}
</script>

<style scoped>

</style>
