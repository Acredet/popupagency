<template>
  <div class="wrapper-page">
    <div class="card">
      <div class="card-body">
        <h3 class="text-center m-0">
          <nuxt-link :to="`${$t('link')}lediga-lokaler`" class="logo logo-admin">
            <img src="/images/logo.png" height="30" alt="logo">
          </nuxt-link>
        </h3>

        <div class="p-3">
          <h4 class="text-muted font-18 m-b-5 text-center" v-text="$t('login.welcome')" />
          <p class="text-muted text-center" v-text="$t('login.signIn')" />
          <b-form class="form-horizontal m-t-30">
            <b-form-group
              id="email-group"
              :label="$t('forms.email.title')"
              label-for="email"
            >
              <b-form-input
                id="email"
                v-model="user.email"
                type="email"
                required
                :placeholder="$t('forms.email.holder')"
              />
            </b-form-group>

            <b-form-group
              id="password-group"
              :label="$t('forms.password.title')"
              label-for="password"
            >
              <b-form-input
                id="password"
                v-model="user.password"
                type="password"
                required
                :placeholder="$t('forms.password.holder')"
                @keyup.enter="login"
              />
            </b-form-group>

            <b-overlay
              :show="busy"
              rounded
              opacity="0.6"
              spinner-small
              spinner-variant="primary"
              class="d-inline-block"
            >
              <b-button
                ref="button"
                type="button"
                :disabled="busy"
                style="display: inherit"
                class="mx-auto w-md waves-effect waves-light"
                variant="primary"
                @click="login"
                v-text="$t('actions.submit')"
              />
            </b-overlay>

            <div class="form-group m-t-10 mb-0 row">
              <div class="col-12 m-t-20">
                <nuxt-link to="/admin/restore-password" class="text-muted">
                  <i class="mdi mdi-lock" /> {{ $t('forms.forgotPassword') }}
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
import { AdminPanelDependancies } from '@/mixins/AdminPanelDependancies'
export default {
  name: 'Login',
  mixins: [AdminPanelDependancies],
  data () {
    return {
      busy: false,
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
  created () {
    if (this.$auth.loggedIn) {
      this.$router.push(`${this.$t('link')}admin`)
    }
  },
  methods: {
    async login () {
      this.busy = true

      await this.$auth.loginWith('local', { data: this.user })
        .catch((err) => {
          this.$bvToast.toast(err.response.data.msg, {
            title: this.$t('forms.somethingWrong'),
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'danger'
          })
          this.busy = false
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
