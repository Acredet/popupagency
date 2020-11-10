<template>
  <div class="content">
    <b-container>
      <h2 class="font-weight-bold">
        {{ $t('addUser.title') }}
      </h2>
      <b-form>
        <b-form-group id="name-group" :label="$t('addUser.inputs.name.label')" label-for="name">
          <b-form-input id="name" v-model="form.name" autocomplete="off" required :placeholder="$t('addUser.inputs.name.holder')" />
        </b-form-group>

        <b-form-group
          id="Email-group"
          :label="$t('addUser.inputs.email.label')"
          label-for="email"
          :description="$t('addUser.inputs.email.desc')"
        >
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            required
            :placeholder="$t('addUser.inputs.email.holder')"
          />
        </b-form-group>

        <b-form-group id="password-group" :label="$t('addUser.inputs.password.label')" label-for="password">
          <b-form-input
            id="password"
            v-model="form.password"
            type="password"
            :state="passwordValid"
            required
            :placeholder="$t('addUser.inputs.password.holder')"
          />

          <b-form-invalid-feedback :state="passwordValid">
            {{ $t('forms.atLeast8') }}
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="passwordValid">
            {{ $t('forms.valid') }}
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group id="confirm-password-group" :label="$t('addUser.inputs.confirmPass.label')" label-for="confirm-password">
          <b-form-input
            id="confirm-password"
            v-model="form.confirmPassword"
            :state="validation"
            type="password"
            required
            :placeholder="$t('addUser.inputs.confirmPass.holder')"
          />

          <b-form-invalid-feedback :state="validation">
            {{ $t('forms.notMatch') }}
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validation">
            {{ $t('forms.match') }}
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group id="confirm-password-group" :label="$t('addUser.inputs.confirmPass.label')" label-for="confirm-password">
          <b-form-select v-model="form.role" :options="options" class="mt-3" />

          <b-form-invalid-feedback :state="!!form.role">
            {{ $t('forms.required') }}
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="!!form.role">
            {{ $t('forms.valid') }}
          </b-form-valid-feedback>
        </b-form-group>
        <b-overlay
          :show="busy"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
          class="d-inline-block"
        >
          <b-btn
            ref="post-button"
            type="button"
            :disabled="busy || !validation"
            block
            style="display: inherit"
            variant="primary"
            @click="onSubmit"
            v-text="$t('actions.submit')"
          />
        </b-overlay>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'AddUser',
  layout: 'admin',
  data () {
    return {
      busy: false,
      options: [
        { value: 'admin', text: 'Admin' },
        { value: 'listingOwner', text: 'Listing Owner' },
        { value: 'spaceOwner', text: 'Space Owner' },
        { value: 'manager', text: 'Manager' },
        { value: 'searcher', text: 'Searcher' }
      ],
      form: {
        email: '',
        name: '',
        role: 'searcher',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    validation () {
      return !!(this.form.password && (this.form.password === this.form.confirmPassword) && this.form.password.length >= 8)
    },
    passwordValid () {
      return this.form.password.length >= 8
    }
  },
  methods: {
    onSubmit (evt) {
      this.busy = true
      const data = Object.assign({}, this.form)
      delete data.confirmPassword
      this.$axios.$post('/users', data)
        .then((res) => {
          this.$bvToast.toast(`${this.$t('addUser.toast.justAdded')} ${this.form.name}.`, {
            title: this.$t('addUser.toast.add'),
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'success'
          })
          this.busy = false
        })
        .catch((err) => {
          this.$bvToast.toast(err.response.data, {
            title: this.$t('category.toast.err'),
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'error'
          })
          this.busy = false
        })
    }
  }
}
</script>

<style scoped>
</style>
