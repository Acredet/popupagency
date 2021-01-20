<template>
  <div>
    <!-- Login modal -->
    <b-modal
      @hidden="$emit('close-modal')"
      id="loginModal"
      class=""
      v-model="modalShow"
      hide-header
      hide-footer
      centered
    >
      <div class="d-flex justify-content-end align-items-center">
        <b-btn @click="$emit('close-modal')" class="custom-close-btn">
          x
        </b-btn>
      </div>

      <loginForm @userLoggedIn="$emit('close-modal')" />
    </b-modal>
    <!-- End modal -->
  </div>
</template>

<script>
import { BootstrapVue, BIcon, BIconXCircle } from "bootstrap-vue";
import loginForm from "@/components/loginForm";
export default {
  components: {
    loginForm,
    BIconXCircle,
  },
  props: {
    modalShow: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style>
.custom-close-btn {
  background: #eee;
  color: black;
  width: 30px;
  height: 30px;
  padding: 0;
  margin-bottom: 40px;
  border-radius: 50%;
  border: 0;
}
</style>
