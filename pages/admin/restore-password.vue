<template>
  <div class="wrapper-page">
    <b-alert v-model="alert" variant="danger" dismissible>
      {{ $t('resetPassword.thereIsNoUser') }}
    </b-alert>

    <b-modal id="email-sent" title="Check your inbox" @ok="weOk">
      <p class="my-4">
        {{ $t('resetPassword.weSentThePassword') }}
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
            {{ $t('resetPassword.resetPassword') }}
          </h4>
          <div class="alert alert-info" role="alert">
            {{ $t('resetPassword.enterEmail') }}
          </div>

          <b-form class="form-horizontal m-t-30" action="index.html">
            <div class="form-group">
              <p>{{ $t('resetPassword.enterOldEmail') }}</p>
              <label for="useremail">{{ $t('resetPassword.email.title') }}</label>
              <b-form-input v-model="userEmail" :placeholder="$t('resetPassword.email.placeHolder')" />
            </div>

            <div class="form-group row m-t-20">
              <div class="col-12 text-right">
                <b-btn class="btn btn-primary w-md waves-effect waves-light" @click="getuserEmail">
                  {{ $t('resetPassword.reset') }}
                </b-btn>
              </div>
            </div>
          </b-form>
        </div>
      </div>
    </div>

    <div class="m-t-40 text-center">
      <p>
        {{ $t('resetPassword.rememberIt') }} <nuxt-link to="/login" class="text-primary">
          {{ $t('signInHere') }}
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
