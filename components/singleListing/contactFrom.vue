<template>
  <!-- Start Form -->
  <aside class="form py-3 px-3">
    <header class="my-3">
      <b-row v-if="user._id" class="my-3">
        <b-col cols="4">
          <img
            v-if="user.avatar"
            width="100"
            style="border-radius: 20px"
            :src="avatarimage"
            alt="avatar"
          />

          <img
            v-else
            width="100"
            style="border-radius: 20px"
            src="@/assets/img/user-placeholder.jpeg"
            alt="avatar"
          />
        </b-col>
        <b-col cols="8">
          <p class="font-weight-bold">{{ user.name }}</p>
          <h6 class="text-secondary" v-text="$t('singleListing.form.sendUs')" />
        </b-col>
      </b-row>
    </header>

    <b-form id="contactForm" enctype="multipart/form-data">
      <b-row>
        <!-- Start user name -->
        <b-col cols="12">
          <b-form-group class="my-2">
            <b-input-group size="sm">
              <template #prepend>
                <b-input-group-text>
                  <b-icon-person-fill></b-icon-person-fill>
                </b-input-group-text>
              </template>

              <b-form-input
                id="username"
                :placeholder="$t('forms.name.title') + '*'"
                v-model="form.name"
                required
                autocomplete="off"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <!-- End user name -->

        <!-- Start email -->
        <b-col cols="12">
          <b-form-group class="my-2">
            <b-input-group size="sm">
              <template #prepend>
                <b-input-group-text>@</b-input-group-text>
              </template>

              <b-form-input
                id="email"
                :placeholder="$t('forms.email.holder') + '*'"
                v-model="form.email"
                required
                type="email"
                autocomplete="off"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <!-- End email -->

        <!-- Start Phone -->
        <b-col cols="12">
          <b-form-group class="my-2">
            <b-input-group size="sm">
              <template #prepend>
                <b-input-group-text>
                  <b-icon-telephone-fill></b-icon-telephone-fill>
                </b-input-group-text>
              </template>

              <b-form-input
                id="Phone"
                :placeholder="$t('forms.phone.holder') + '*'"
                v-model="form.phone"
                required
                autocomplete="off"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <!-- End Phone -->

        <!-- Start From -->
        <b-col cols="12" md="6">
          <b-form-group class="my-2">
            <b-form-datepicker
              id="from"
              :placeholder="$t('singleListing.form.from')"
              v-model="form.from"
              today-button
              reset-button
              close-button
              size="sm"
              class="mb-2"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
            />
          </b-form-group>
        </b-col>
        <!-- End From -->

        <!-- Start empty -->
        <b-col cols="12" md="6">
          <b-form-group class="my-2">
            <b-form-datepicker
              id="to"
              v-model="form.to"
              today-button
              :placeholder="$t('singleListing.form.to')"
              reset-button
              close-button
              size="sm"
              class="mb-2"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
            />
          </b-form-group>
        </b-col>
        <!-- End empty -->
        <!-- Start messsage -->
        <b-col cols="12">
          <b-form-group class="my-2">
            <b-form-textarea
              :placeholder="$t('singleListing.form.message') + '*'"
              v-model="form.message"
              required
              id="messsage"
              rows="8"
              size="sm"
            />
          </b-form-group>
        </b-col>
        <!-- End messsage -->

        <b-btn
          class="m-2"
          block
          type="button"
          pill
          style="background: #495057"
          :disabled="!valid"
          @click="sendForm"
        >
          {{ $t("actions.submit") }}
        </b-btn>
      </b-row>
    </b-form>
  </aside>

  <!-- End Form -->
</template>

<script>
import { BIconPersonFill, BIconTelephoneFill } from "bootstrap-vue";
import { getImages } from "@/mixins/utils/getImage";
export default {
  props: {
    sellerId: {
      type: String,
      default: () => "",
    },
  },
  components: {
    BIconPersonFill,
    BIconTelephoneFill,
  },

  data() {
    return {
      user: {},
      avatarimage: [],
      options: [
        { text: "First radio", value: "first" },
        { text: "Second radio", value: "second" },
        { text: "Third radio", value: "third" },
      ],
      form: {
        name: "",
        email: "",
        phone: "",
        from: null,
        to: null,

        subject: "",
        message: "",
        options: "first",
      },
    };
  },
  mixins: [getImages],
  computed: {
    async perseonimage() {
      await this.getImage(this.user.avatar)
        .then((res) => {
          this.avatarimage.push(res);
        })
        .catch((err) =>
          this.$bvToast.toast(err, {
            title: "Something is wrong",
            autoHideDelay: 5000,
          })
        );
    },
    valid() {
      return (
        !!this.form.name &&
        !!this.form.email &&
        !!this.form.phone &&
        !!this.form.message
      );
    },
  },
  watch: {
    sellerId: {
      immediate: true,
      handler: function (val) {
        this.getUser();
      },
    },
  },
  methods: {
    async sendForm() {
      const form = new FormData(document.getElementById("contactForm"));

      form.append("sellerId", this.sellerId);
      form.append("link", this.$route.path);

      form.append("name", this.form.name);
      form.append("email", this.form.email);
      form.append("phone", this.form.phone);
      form.append("from", this.form.from);
      form.append("to", this.form.to);
      form.append("subject", this.form.subject);
      form.append("message", this.form.message);
      form.append("options", this.form.options);

      // Todo
      await this.$axios
        .$post("/mail/bookingRequest", form)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    async getUser() {
      this.$axios
        .$get(`/users/one/${this.sellerId}`)
        .then((res) => {
          this.user = res.data;
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.form {
  box-shadow: 0 4px 22px 0 rgba(28, 51, 59, 0.15);
  border-radius: 5px;
}

.styled {
  border-radius: 40px !important;
  background: #eee;
}

textarea.styled {
  border-radius: 10px !important;
  background: #eee;
}
</style>
