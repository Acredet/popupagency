<template>
  <div class="wrapper-page">
    <div class="card">
      <div class="card-body">
        <h3 class="text-center m-0">
          <nuxt-link to="/" class="logo logo-admin">
            <img src="/images/logo.png" height="30" alt="logo">
          </nuxt-link>
        </h3>

        <div class="p-3">
          <h4 class="text-muted font-18 m-b-5 text-center">
            Welcome Back !
          </h4>
          <p class="text-muted text-center">
            Sign in to continue to Admin panel.
          </p>
          <b-form class="form-horizontal m-t-30">
            <b-form-group
              id="email-group"
              label="Email:"
              label-for="email"
            >
              <b-form-input
                id="email"
                v-model="user.email"
                type="email"
                required
                placeholder="Enter email"
              />
            </b-form-group>

            <b-form-group
              id="password-group"
              label="Passwrod:"
              label-for="password"
            >
              <b-form-input
                id="password"
                v-model="user.password"
                type="password"
                required
                placeholder="Enter password"
              />
            </b-form-group>

            <b-button type="button" style="display: inherit" class="mx-auto w-md waves-effect waves-light" variant="primary" @click="login">
              Submit
            </b-button>

            <div class="form-group m-t-10 mb-0 row">
              <div class="col-12 m-t-20">
                <nuxt-link to="/admin/restore-password" class="text-muted">
                  <i class="mdi mdi-lock" /> Forgot your password?
                </nuxt-link>
              </div>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  name: 'Login',
  data () {
    return {
      toast: {
        title: null,
        variant: null,
        visible: false,
        text: null
      },
      user: {
        email: '',
        password: ''
      }
    }
  },
  mounted () {
    if (this.$auth.loggedIn) {
      this.$router.push('/admin')
    }
  },
  methods: {
    async login () {
      await this.$auth.loginWith('local', { data: this.user })
        .catch((err) => {
          this.$bvToast.toast(err.response.data.msg, {
            title: 'There is something wrong',
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'danger'
          })
        })
      this.$store.commit('changeSidebarRenderKey')
    }
  }
}
</script>

<style scoped>
.card {
  margin-top: 100px
}
</style>
