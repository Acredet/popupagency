<template>
	<div>
		<div class="p-3">
			<div class="text-center mb-3">
				<b-img
					src="@/assets/img/logo.png"
					class="img-fluid"
					width="100%"
					alt="popup"
				/>
			</div>

			<h4
				class="text-muted font-18 m-b-5 text-center"
				v-text="$t('login.welcome')"
			/>
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
					class="block"
				>
					<b-button
						:disabled="busy"
						class="mx-auto waves-effect waves-light mb-2"
						variant="primary"
						@click="login"
						block
						v-text="$t('actions.submit')"
					/>
				</b-overlay>

				<div class="form-group m-t-10 mb-0 row">
					<!-- Start sign up -->
					<div class="col-12 m-t-20">
						<nuxt-link
							:to="`${$t('link')}admin/restore-password`"
							class="text-muted"
						>
							<i class="mdi mdi-lock" />
							{{ $t("forms.forgotPassword") }}
						</nuxt-link>
					</div>
					<!-- End resotre password -->
				</div>
			</b-form>
		</div>
		<!-- start sign up -->
		<div class="m-t-40 text-center">
			<p>
				{{ $t("signUp.getFreeAcc") }}
				<nuxt-link :to="`${$t('link')}sign-up`" class="text-muted">
					<i class="mdi mdi-lock" /> {{ $t("signUp.signUp") }}
				</nuxt-link>
			</p>
		</div>
		<!-- End sign up -->
	</div>
</template>

<script>
export default {
	data() {
		return {
			busy: false,
			toast: {
				title: null,
				variant: null,
				visible: false,
				text: null,
			},
			user: {
				email: "",
				password: "",
			},
		};
	},
	methods: {
		async login() {
			this.busy = true;

			await this.$auth.loginWith("local", { data: this.user }).catch((err) => {
				this.$bvToast.toast(err.response.data.msg, {
					title: this.$t("forms.somethingWrong"),
					autoHideDelay: 5000,
					appendToast: true,
					variant: "danger",
				});
				this.busy = false;
			});

			this.$emit("userLoggedIn"); // This emits userLoggedIn to the loginModal to close the modal
		},
	},
};
</script>

<style></style>
