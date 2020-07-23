<template>
  <div class="content">
    <b-modal id="edit-modal" centered title="Edit Categories" @close="editForm = {}">
      <b-form id="edit-category" enctype="multipart/form-data">
        <b-form-group
          id="name-group"
          label="Name:"
          label-for="name"
          description="The name is how it appears on your site."
        >
          <b-form-input
            id="name"
            v-model="editForm.name"
            :state="!!editForm.name"
            type="text"
            required
            autocomplete="off"
            placeholder="Enter Name"
          />

          <b-form-invalid-feedback :state="!!editForm.name">
            Required.
          </b-form-invalid-feedback>

          <b-form-valid-feedback :state="!!editForm.name">
            Good to go.
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          id="select-group"
          label="Parent Categories:"
          label-for="categorys"
          description="Assign a parent term to create a hierachy. The term Jazz, for example, would be the parent of Bebop and Big Band."
        >
          <b-form-select
            id="categorys"
            v-model="editForm.parent"
            class="mb-2 mr-sm-2 mb-sm-0"
            :options="parentOpts"
          />
        </b-form-group>

        <b-form-group
          id="description-group"
          label="Description:"
          label-for="description"
          description="The description isn't prominent by default; howerver, some themes may show it."
        >
          <b-form-textarea
            id="description"
            v-model="editForm.description"
            placeholder="Enter Your Description"
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
        <b-btn variant="primary" @click="editTag(); ok()">
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

    <b-modal id="delete-modal" centered title="Delete Categories">
      <p class="my-4">
        Are you sure you wanna delete {{ editForm.name }}?
      </p>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-btn variant="danger" @click="deleteTag(); ok()">
          Delete
        </b-btn>
        <b-btn variant="primary" @click="cancel(); Object.assign(editForm, {})">
          Close
        </b-btn>
      </template>
    </b-modal>

    <b-container>
      <h2>Add Categories:</h2>
      <b-row>
        <b-col cols="12" md="4">
          <b-form id="category-form" enctype="multipart/form-data">
            <b-form-group
              id="name-group"
              label="Name:"
              label-for="name"
              description="The name is how it appears on your site."
            >
              <b-form-input
                id="name"
                v-model="form.name"
                :state="nameValid"
                type="text"
                required
                autocomplete="off"
                placeholder="Enter Name"
              />

              <b-form-invalid-feedback :state="nameValid">
                Required.
              </b-form-invalid-feedback>

              <b-form-valid-feedback :state="nameValid">
                Good to go.
              </b-form-valid-feedback>
            </b-form-group>

            <b-form-group
              id="select-group"
              label="Parent Categories:"
              label-for="categorys"
              description="Assign a parent term to create a hierachy. The term Jazz, for example, would be the parent of Bebop and Big Band."
            >
              <b-form-select
                id="categorys"
                v-model="form.parent"
                class="mb-2 mr-sm-2 mb-sm-0"
                :options="parentOpts"
              />
            </b-form-group>

            <b-form-group
              id="description-group"
              label="Description:"
              label-for="description"
              description="The description isn't prominent by default; howerver, some themes may show it."
            >
              <b-form-textarea
                id="description"
                v-model="form.description"
                placeholder="Enter Your Description"
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

            <b-btn variant="primary" :disabled="!form.name" @click="addTag" v-text="'Add Categories'" />
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
            <template v-slot:cell(actions)="data">
              <b-dropdown variant="light">
                <template v-slot:button-content>
                  <b>Actions</b>
                </template>
                <b-dropdown-item v-b-modal.edit-modal @click="editForm = data.item">
                  Edit
                </b-dropdown-item>
                <b-dropdown-item v-b-modal.delete-modal @click="editForm = data.item">
                  Delete
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
              <b-form-group id="per-page-group" label="Per page:" label-for="per-page">
                <b-form-select
                  id="per-page"
                  v-model="perPage"
                  :options="perPageOpts"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <div>
            Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
            <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <toast :toast="toast" />
  </div>
</template>

<script>
import ourUploader from '@/components/ourUploader'

export default {
  name: 'ListingTags',
  layout: 'admin',
  components: {
    ourUploader
  },
  data () {
    return {
      toast: {
        title: null,
        variant: null,
        visible: false,
        text: null
      },
      form: {
        name: '',
        parent: null,
        description: null
      },
      editForm: {
        name: '',
        parent: null,
        description: null
      },
      sortBy: 'name',
      sortDesc: false,
      currentPage: 1,
      parentOpts: [],
      perPage: 5,
      perPageOpts: [
        { value: 1, text: '1' },
        { value: 5, text: '5' },
        { value: 10, text: '10' },
        { value: 25, text: '25' },
        { value: 50, text: '50' },
        { value: 100, text: '100' }
      ],
      fields: [
        { key: 'name', sortable: true },
        { key: 'description', sortable: true },
        { key: 'parent', sortable: true },
        { key: 'actions', sortable: false }
      ],
      items: []
    }
  },
  computed: {
    nameValid () {
      return !!this.form.name
    }
  },
  mounted () {
    this.getTags()
  },
  methods: {
    async addTag () {
      const category = new FormData(document.getElementById('category-form'))

      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          const element = this.form[key]
          category.append(key, element)
        }
      }

      for (const pair of category.entries()) { // Show data in console.
        console.log(pair[0] + ', ' + pair[1])
      }

      await this.$axios.$post('/category', category)
        .then((res) => {
          this.getTags()
          const inputs = [...document.querySelectorAll('.input-group--wrapper input')]
          const images = [...document.querySelectorAll('.input-group--wrapper img')]

          inputs.forEach((e) => {
            e.value = ''
            const img = images.find((x) => {
              console.log(x)
              return x.getAttribute('data-id') === e.getAttribute('data-id')
            })
            img.style.display = 'none'

            this.form = {
              name: '',
              parent: null,
              description: null
            }
          })
          this.toast = {
            title: 'Categories added successfully',
            variant: 'success',
            visible: true,
            text: `You just added ${this.form.name} Categories.`
          }
        })
        .catch((err) => {
          this.toast = {
            title: 'There is something wrong',
            variant: 'danger',
            visible: true,
            text: err.message
          }
        })
    },
    async getTags () {
      await this.$axios.$get('/category')
        .then((res) => {
          this.items = res.data
          this.parentOpts = this.items.map(function (x) {
            return {
              text: x.name,
              value: x.name
            }
          })
          this.parentOpts.unshift({ text: 'Choose parent..', value: null })
        })
        .catch((err) => {
          this.toast = {
            title: 'There is something wrong',
            variant: 'danger',
            visible: true,
            text: err.message
          }
        })
    },
    async editTag () {
      const category = new FormData(document.getElementById('edit-category'))
      if (this.editForm.avatar) { delete this.editForm.avatar }

      for (const key in this.editForm) {
        if (this.editForm.hasOwnProperty(key)) {
          const element = this.editForm[key]
          category.append(key, element)
        }
      }

      for (const pair of category.entries()) { // Show data in console.
        console.log(pair[0] + ', ' + pair[1])
      }

      await this.$axios.$patch(`/category/${this.editForm._id}`, category)
        .then((res) => {
          this.getTags()
          this.toast = {
            title: 'Category Edited successfully',
            variant: 'success',
            visible: true,
            text: `You just Edited ${this.editForm.name} Categories.`
          }
          this.editForm = {
            name: '',
            parent: null,
            description: null
          }
        })
        .catch((err) => {
          this.toast = {
            title: 'There is something wrong',
            variant: 'danger',
            visible: true,
            text: err.message
          }
        })
    },
    async deleteTag () {
      await this.$axios.$delete(`/category/${this.editForm._id}`)
        .then((res) => {
          this.getTags()
          this.toast = {
            title: 'Category deleted successfully',
            variant: 'success',
            visible: true,
            text: `You just deleted ${this.editForm.name} Categories.`
          }
        })
        .catch((err) => {
          this.toast = {
            title: 'There is something wrong',
            variant: 'danger',
            visible: true,
            text: err.message
          }
        })
    }
  }
}
</script>

<style>

</style>
