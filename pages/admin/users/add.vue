<template>
  <div class="content">
    <b-container>
      <h2 class="font-weight-bold">
        Add user:
      </h2>
      <b-form>
        <b-form-group id="name-group" label="Name:" label-for="name">
          <b-form-input id="name" v-model="form.name" autocomplete="off" required placeholder="Enter name" />
        </b-form-group>

        <b-form-group
          id="Email-group"
          label="Email:"
          label-for="email"
          description="We'll respect your inbox."
        >
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          />
        </b-form-group>

        <b-form-group id="password-group" label="Password:" label-for="password">
          <b-form-input
            id="password"
            v-model="form.password"
            type="password"
            :state="passwordValid"
            required
            placeholder="Enter password"
          />

          <b-form-invalid-feedback :state="passwordValid">
            At Least 8 charchters.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="passwordValid">
            Nice.
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group id="confirm-password-group" label="Confirm password:" label-for="confirm-password">
          <b-form-input
            id="confirm-password"
            v-model="form.confirmPassword"
            :state="validation"
            type="password"
            required
            placeholder="Enter password again"
          />

          <b-form-invalid-feedback :state="validation">
            Not matched.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validation">
            Ok.
          </b-form-valid-feedback>
        </b-form-group>

        <b-button :disabled="!validation" variant="primary" @click="onSubmit">
          Submit
        </b-button>
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
      form: {
        email: '',
        name: '',
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
      const data = Object.assign({}, this.form)
      delete data.confirmPassword
      this.$axios.$post('/users', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
</style>
