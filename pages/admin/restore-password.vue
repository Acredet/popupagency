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
          <h4 class="text-muted font-18 mb-3 text-center">
            Reset Password
          </h4>
          <div class="alert alert-info" role="alert">
            Enter your Email and instructions will be sent to you!
          </div>

          <form class="form-horizontal m-t-30" action="index.html">
            <div class="form-group">
              <label for="useremail">Email</label>
              <input id="useremail" type="email" class="form-control" placeholder="Enter email">
            </div>

            <div class="form-group row m-t-20">
              <div class="col-12 text-right">
                <button class="btn btn-primary w-md waves-effect waves-light" type="submit">
                  Reset
                </button>
              </div>
            </div>
          </form>
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
  name: 'RestorePassword'
}
</script>

<style scoped>
.card {
  margin-top: 100px
}
</style>
