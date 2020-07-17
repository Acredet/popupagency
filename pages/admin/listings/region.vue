<template>
  <div class="content">
    <h2>Add Region:</h2>
    <b-container>
      <b-row>
        <b-col cols="12" md="4">
          <b-form>
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
              label="Parent Region:"
              label-for="region"
              description="Assign a parent term to create a hierachy. The term Jazz, for example, would be the parent of Bebop and Big Band."
            >
              <b-form-select
                id="region"
                v-model="form.region"
                class="mb-2 mr-sm-2 mb-sm-0"
                :options="[{ text: 'Choose...', value: null }, 'One', 'Two', 'Three']"
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

            <b-btn variant="primary" :disabled="!form.name" @click="addRigion" v-text="'Add Rigion'" />
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
            <template v-slot:head(server)>
              <i class="fas fa-server" />
            </template>

            <template v-slot:head(feather)>
              <i class="fas fa-feather-alt" />
            </template>

            <template v-slot:cell(feather)="data">
              <b-badge v-if="data.item.feather" variant="primary">
                Yes
              </b-badge>

              <b-badge v-else variant="danger">
                No
              </b-badge>
            </template>

            <template v-slot:cell(server)="data">
              <b-badge v-if="data.item.server" variant="primary">
                Yes
              </b-badge>

              <b-badge v-else variant="danger">
                No
              </b-badge>
            </template>
          </b-table>

          <b-pagination
            v-model="currentPage"
            :total-rows="items.length"
            :per-page="perPage"
            aria-controls="all-listing"
          />

          <div>
            Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
            <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ListingRegion',
  layout: 'admin',
  data () {
    return {
      form: {
        name: '',
        region: null,
        description: ''
      },
      sortBy: 'name',
      sortDesc: false,
      currentPage: 1,
      perPage: 2,
      fields: [
        { key: 'name', sortable: true },
        { key: 'description', sortable: true },
        { key: 'slug', sortable: true },
        { key: 'server', sortable: true },
        { key: 'feather', sortable: true },
        { key: 'listing_type', sortable: true },
        { key: 'count', sortable: true }
      ],
      items: [
        {
          name: 'name',
          description: 'description',
          slug: 'slug',
          server: true,
          feather: false,
          listing_type: 'listing_type',
          count: 0
        },
        {
          name: 'name2',
          description: 'description2',
          slug: 'slug2',
          server: true,
          feather: true,
          listing_type: 'listing_type2',
          count: 1
        },
        {
          name: 'name3',
          description: 'description3',
          slug: 'slug3',
          server: false,
          feather: true,
          listing_type: 'listing_type3',
          count: 2
        },
        {
          name: 'name4',
          description: 'description4',
          slug: 'slug4',
          server: true,
          feather: false,
          listing_type: 'listing_type4',
          count: 4
        }
      ]
    }
  },
  computed: {
    nameValid () {
      return !!this.form.name
    }
  },
  methods: {
    async addRigion () {
      await this.$axios.$post('/region', this.form)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    async getRigions () {
      await this.$axios.$get('/region/all', this.form)
        .then((res) => {
          this.items = res
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>
