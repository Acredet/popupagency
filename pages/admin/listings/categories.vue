<template>
  <div class="content">
    <b-modal id="edit-modal" centered title="Edit Category" @close="Object.assign(editForm, {})">
      <b-form>
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
          label="Parent Category:"
          label-for="category"
          description="Assign a parent term to create a hierachy. The term Jazz, for example, would be the parent of Bebop and Big Band."
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
      </b-form>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-btn variant="danger" @click="editRigion(); ok()">
          Edit
        </b-btn>
        <b-btn variant="primary" @click="cancel(); Object.assign(editForm, {})">
          Close
        </b-btn>
      </template>
    </b-modal>

    <b-modal id="delete-modal" centered title="Delete Category">
      <p class="my-4">
        Are you sure you wanna delete {{ editForm.name }}?
      </p>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-btn variant="primary" @click="deleteCategory(); ok()">
          Delete
        </b-btn>
        <b-btn variant="danger" @click="cancel(); Object.assign(editForm, {})">
          Close
        </b-btn>
      </template>
    </b-modal>

    <h2>Add Category:</h2>
    <b-container>
      <b-row>
        <b-col cols="12" md="4">
          <b-form id="catygory-form" enctype="multipart/form-data">
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
              label="Parent Category:"
              label-for="category"
              description="Assign a parent term to create a hierachy. The term Jazz, for example, would be the parent of Bebop and Big Band."
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
              <our-uploader :responsivness="{ cols: 12, sm: 12, md: 12, lg: 12 }" :name="'tagImage[]'" :max-file-size="64" />
            </b-form-group>

            <b-btn variant="primary" :disabled="!form.name" @click="addCategory" v-text="'Add Category'" />
          </b-form>
        </b-col>

        <b-col cols="12" md="8">
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
                <b-dropdown-item v-b-modal.edit-modal @click="Object.assign(editForm, data.item)">
                  Edit
                </b-dropdown-item>
                <b-dropdown-item v-b-modal.delete-modal @click="Object.assign(editForm, data.item)">
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
export default {
  name: 'ListingCategory',
  layout: 'admin',
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
    this.getCategories()
  },
  methods: {
    async addCategory () {
      const category = new FormData(document.getElementById('tag-form'))

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
          this.getCategories()
          this.toast = {
            title: 'Category added successfully',
            variant: 'success',
            visible: true,
            text: `You just added ${this.form.name} Category.`
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
    async getCategories () {
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
    async editRigion () {
      await this.$axios.$patch(`/category/${this.editForm._id}`, this.editForm)
        .then((res) => {
          this.getCategories()
          this.toast = {
            title: 'Category Edited successfully',
            variant: 'success',
            visible: true,
            text: `You just Edited ${this.editForm.name} Category.`
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
    async deleteCategory () {
      await this.$axios.$delete(`/category/${this.editForm._id}`)
        .then((res) => {
          this.getCategories()
          this.toast = {
            title: 'Category deleted successfully',
            variant: 'success',
            visible: true,
            text: `You just deleted ${this.editForm.name} Category.`
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
