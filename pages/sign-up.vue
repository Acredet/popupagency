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
          <h4 class="text-muted font-18 m-b-5 text-center">
            {{ $t('signUp.freeRegister') }}
          </h4>
          <p class="text-muted text-center">
            {{ $t('signUp.getFreeAcc') }}
          </p>

          <b-form class="form-horizontal m-t-30">
            <b-form-group id="email-group" :label="$t('forms.email.title')" label-for="email">
              <b-form-input
                id="email"
                v-model="user.email"
                type="email"
                required
                :placeholder="$t('forms.email.holder')"
              />
            </b-form-group>

            <b-form-group id="name-group" label="Username" label-for="name">
              <b-form-input id="name" v-model="user.name" required :placeholder="$t('forms.email.holder')" />
            </b-form-group>

            <b-form-group id="password-group" :label="$t('forms.password.title')" label-for="password">
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
                @click="signUp"
                v-text="$t('actions.submit')"
              />
            </b-overlay>

            <!-- <div class="form-group m-t-10 mb-0 row">
              <div class="col-12 m-t-20">
                <p class=" text-muted mb-0">
                  By registering you agree to the popI <a href="#" class="text-primary">Terms of Use</a>
                </p>
              </div>
            </div> -->
          </b-form>
        </div>
      </div>
    </div>

    <div class="m-t-40 text-center">
      <p>
        {{ $t('signUp.haveAcc') }} <nuxt-link :to="`${$t('link')}login`" class=" text-primary">
          {{ $t('signUp.login') }}
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { AdminPanelDependancies } from '@/mixins/AdminPanelDependancies'

export default {
  name: 'SignUp',
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
        name: '',
        role: 'searcher',
        password: ''
      }
    }
  },
  methods: {
    async signUp () {
      this.busy = true
      await this.$axios.post('/users', this.user)
        .then(async (res) => {
          await this.$auth.loginWith('local', { data: { email: this.user.email, password: this.user.password } })
            .catch((err) => {
              this.$bvToast.toast(err.response.data.msg, {
                title: this.$t('forms.somethingWrong'),
                autoHideDelay: 5000,
                appendToast: true,
                variant: 'danger'
              })
            })
        })
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

<style lang="scss" scoped>

</style>
