<template>
  <div class="wrapper-page">
    <b-alert v-model="alert" variant="danger" dismissible>
      This user does not exit!
    </b-alert>

    <b-modal id="email-sent" title="Check your inbox" @ok="weOk">
      <p class="my-4">
        We sent you a link to reset your paswword
      </p>
    </b-modal>

    <div class="card">
      <div class="card-body">
        <h3 class="text-center m-0">
          <nuxt-link to="/" class="logo logo-admin">
            <img src="/images/logo.png" height="30" alt="logo">
          </nuxt-link>
        </h3>

        <div class="p-3">
          <h4 class="text-muted font-18 mb-3 text-center">
            Reset Password
          </h4>
          <div class="alert alert-info" role="alert">
            Enter your Email and instructions will be sent to you!
          </div>

          <b-form class="form-horizontal m-t-30" action="index.html">
            <div class="form-group">
              <p>Enter your email address you entered when creating your account. Then, a loser deposit is sent to the specified e-mail address.</p>
              <label for="useremail">Email</label>
              <b-form-input v-model="userEmail" placeholder="Enter your Email" />
            </div>

            <div class="form-group row m-t-20">
              <div class="col-12 text-right">
                <b-btn class="btn btn-primary w-md waves-effect waves-light" @click="getuserEmail">
                  Reset
                </b-btn>
              </div>
            </div>
          </b-form>
        </div>
      </div>
    </div>

    <div class="m-t-40 text-center">
      <p>
        Remember It ? <nuxt-link to="/admin/login" class="text-primary">
          Sign In Here
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  name: 'RestorePassword',
  data () {
    return {
      userEmail: '',
      alert: false
    }
  },
  methods: {
    weOk () {
      this.$router.push(`${this.$t('link')}admin/login`)
    },
    async getuserEmail () {
      await this.$axios.post('/mail/', { email: this.userEmail })
        .then(() => this.$bvModal.show('email-sent'))
        .catch(() => { this.alert = true })
    }
  }
}
</script>

<style scoped>
.card {
  margin-top: 100px
}
</style>
