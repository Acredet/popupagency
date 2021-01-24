<template>
  <div class="content">
    <b-container class="my-5">
      <b-alert v-model="alert" variant="danger" dismissible>
        {{ alertMessage }}
      </b-alert>
      <b-row>
        <b-col cols="12">
          <h2 class="d-inline-block">
            {{ $t("forgetPassword.title") }}
          </h2>
        </b-col>

        <b-col cols="12" sm="6">
          <b-card class="mx-auto py-4" tile outlined>
            <b-container>
              <b-form ref="form" v-model="valid">
                <div class="new-password">
                  <b-input-group class="mb-5">
                    <b-input-group-text>{{
                      $t("forgetPassword.newPassword.label")
                    }}</b-input-group-text>
                    <template v-slot:append>
                      <b-input-group-text
                        @click="showNewPassword = !showNewPassword"
                      >
                        <i v-if="showNewPassword" class="fas fa-eye" />
                        <i v-else class="fas fa-eye-slash" />
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      v-model="newPassword"
                      :state="newPasswordState"
                      :placeholder="
                        $t('forgetPassword.newPassword.placeholder')
                      "
                      :type="showNewPassword ? 'text' : 'password'"
                    />
                    <b-form-invalid-feedback tooltip :state="newPasswordState">
                      {{ $t("valdations.min8") }}
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback tooltip :state="newPasswordState">
                      {{ $t("valdations.good") }}
                    </b-form-valid-feedback>
                  </b-input-group>

                  <div
                    v-for="(shape, index) in 4"
                    :key="index"
                    class="lol"
                    :style="checkValid"
                  />
                </div>

                <b-input-group>
                  <b-input-group-text>{{
                    $t("forgetPassword.confirmPassword.label")
                  }}</b-input-group-text>

                  <template v-slot:append>
                    <b-input-group-text
                      @click="showConfirmPassword = !showConfirmPassword"
                    >
                      <i v-if="showConfirmPassword" class="fas fa-eye" />
                      <i v-else class="fas fa-eye-slash" />
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    v-model="confirmPassword"
                    :state="confirmPasswordState"
                    :placeholder="
                      $t('forgetPassword.confirmPassword.placeholder')
                    "
                    :type="showConfirmPassword ? 'text' : 'password'"
                  />
                  <b-form-invalid-feedback
                    tooltip
                    :state="confirmPasswordState"
                  >
                    {{ $t("valdations.shouldMatch") }}
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback tooltip :state="confirmPasswordState">
                    {{ $t("valdations.matched") }}
                  </b-form-valid-feedback>
                </b-input-group>

                <b-btn
                  variant="primary"
                  class="mt-5"
                  :disabled="!valid"
                  @click="changePassword"
                >
                  {{ $t("save") }}
                </b-btn>
              </b-form>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
  layout: "admin",
  data() {
    return {
      alert: false,
      alertMessage: "",

      color: "grey",

      newPassword: "",
      confirmPassword: "",

      showConfirmPassword: false,
      showNewPassword: false,
    };
  },
  computed: {
    valid() {
      return this.newPasswordState && this.confirmPasswordState;
    },
    newPasswordState() {
      return this.newPassword.length >= 8;
    },
    confirmPasswordState() {
      return (
        this.newPassword.length > 0 && this.confirmPassword === this.newPassword
      );
    },
    checkValid() {
      const length = this.newPassword.length;
      const unvalid = "#e63948";
      const valid = "#f7c223";
      const strong = "#28cdaa";

      if (length == 1 && length < 4) {
        return { backgroundColor: unvalid }; // unvalid
      } else if (length == 0) {
        return { display: "none" };
      } else if (length >= 4 && length < 8) {
        return { backgroundColor: valid }; // valid
      } else if (length >= 8 && length < 12) {
        return { backgroundColor: strong }; // strong
      } else if (length >= 12) {
        return { backgroundColor: strong }; // strong
      }
      return { backgroundColor: unvalid }; // unvalid
    },
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push(this.$t("link") + "invoices");
    }
  },
  methods: {
    async changePassword() {
      const data = { password: this.newPassword };
      await this.$axios
        .$patch(`/users/password/${this.$auth.user._id}`, data)
        .then(async () => await this.$auth.logout())
        .catch((err) => {
          this.alert = true;
          this.alertMessage = err;
        });
    },
  },
};
</script>

<style scoped>
.b-avatar.b-list-item__avatar.b-avatar--tile {
  margin: 0 !important;
  margin-right: 5px !important;
  border-radius: 10px;
}

.lol {
  display: inline-block;
  width: 22%;
  height: 10px;
  border-radius: 30px;
  margin-right: 2px;
}
</style>
