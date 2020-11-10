<template>
  <div class="content">
    <loading :state="loadingState" />
    <b-modal id="edit-modal" centered :title="$t('tag.editModal.title')" @close="editForm = {name: {en: '',sv: ''},parent: null,description: {en: '',sv: ''}}">
      <b-form id="edit-tag" enctype="multipart/form-data">
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

          <b-form-invalid-feedback :state="editNameValidSv" v-text="$t('forms.required')" />

          <b-form-valid-feedback :state="editNameValidSv" v-text="$t('forms.valid')" />
        </b-form-group>

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

          <b-form-invalid-feedback :state="editNameValidEn" v-text="$t('forms.required')" />

          <b-form-valid-feedback :state="editNameValidEn" v-text="$t('forms.valid')" />
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
          :label="$t('forms.decription.title')"
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
          :label="$t('forms.decription.title')"
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

        <b-form-group
          id="avatar-edit-group"
          label="Avatar:"
          description="The description isn't prominent by default; howerver, some themes may show it."
        >
          <our-uploader
            :responsivness="{ cols: 12, sm: 12, md: 12, lg: 12 }"
            :name="'edit-avatar'"
            :old-images="(editForm.avatar && editForm.avatar.length > 0) ? [editForm.avatar] : []"
            :max-number-of-inputs="1"
            :max-file-size="64"
          >
            <template v-slot:old-Image>
              <div v-if="editForm && editForm.avatar && editForm.avatar.length > 0" class="d-flex justify-content-center">
                <b-img style="height: 150px" :src="`https://popup.dk.se/_nuxt/img/${editForm.avatar}`" />
              </div>
            </template>
          </our-uploader>
        </b-form-group>
      </b-form>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-btn variant="primary" :disabled="!editForm.name.en || !editForm.name.sv" @click="editItem('tag'); ok()">
          Edit
        </b-btn>
        <b-btn
          variant="danger"
          @click="cancel(); editForm = { name: {en: '',sv: ''}, parent: null, description: {en: '',sv: ''} }"
        >
          Close
        </b-btn>
      </template>
    </b-modal>

    <b-modal id="delete-modal" centered :title="$t('tag.deleteModal.title')">
      <p class="my-4">
        {{ $t('actions.deleteConfimrMessage') }} {{ editForm.name[$i18n.locale] }}?
      </p>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-btn variant="danger" @click="deleteItem('tag'); ok()">
          {{ $t('actions.delete') }}
        </b-btn>
        <b-btn variant="primary" @click="cancel(); editForm = {name: {en: '',sv: ''},parent: null,description: {en: '',sv: ''}}">
          {{ $t('actions.cancle') }}
        </b-btn>
      </template>
    </b-modal>

    <b-container>
      <h2>{{ $t('tag.title') }}</h2>
      <b-row>
        <b-col cols="12" md="4">
          <b-form id="add-tag">
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

              <b-form-invalid-feedback :state="nameValidSv" v-text="$t('forms.required')" />

              <b-form-valid-feedback :state="nameValidSv" v-text="$t('forms.valid')" />
            </b-form-group>

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

              <b-form-invalid-feedback :state="nameValidEn" v-text="$t('forms.required')" />

              <b-form-valid-feedback :state="nameValidEn" v-text="$t('forms.valid')" />
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

            <b-form-group
              id="avatar-group"
              label="Avatar:"
            >
              <our-uploader :responsivness="{ cols: 12, sm: 12, md: 12, lg: 12 }" :name="'avatar'" :max-number-of-inputs="1" :max-file-size="64" />
            </b-form-group>

            <b-btn variant="primary" :disabled="!form.name.en || !form.name.sv" @click="addItem('tag')" v-text="$t('tag.addBtn')" />
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
            <template v-slot:cell(name)="data">
              <p>
                {{ data.item.name[$i18n.locale] }}
              </p>
            </template>

            <template v-slot:cell(description)="data">
              <p v-if="data.item.description">
                {{ data.item.description[$i18n.locale] }}
              </p>
            </template>

            <template v-slot:cell(parent)="data">
              <p class="text-center font-wight-bold">
                {{ getParent(data.item.parent).length > 0 ? getParent(data.item.parent)[0].name[$i18n.locale] : '-' }}
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
          <div>
            {{ $t('tables.sort.by') }} <b>{{ sortBy }}</b>, {{ $t('tables.sort.direction') }}
            <b>{{ sortDesc ? $t('tables.sort.descending') : $t('tables.sort.ascending') }}</b>
          </div>
        </b-col>
      </b-row>
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
    this.getItems('tag')
  },
}
</script>

<style scoped>
</style>
