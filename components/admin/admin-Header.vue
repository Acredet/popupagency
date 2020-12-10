<template>
	<!-- Top Bar Start -->
	<div class="topbar">
		<!-- LOGO -->
		<div class="topbar-left">
			<nuxt-link :to="localePath('/lediga-lokaler')" class="logo">
				<span>
					<img src="/images/logo-white.svg" alt height="50" />
				</span>
				<i>
					<img src="/favo-light.png" alt height="30" />
				</i>
			</nuxt-link>
		</div>

		<nav class="navbar-custom">
			<ul class="navbar-right d-flex list-inline float-right mb-0">
				<li class="dropdown notification-list">
					<div class="dropdown notification-list nav-pro-img">
						<a
							v-if="$auth.loggedIn"
							class="dropdown-toggle nav-link arrow-none waves-effect nav-user"
							data-toggle="dropdown"
							href="#"
							role="button"
							aria-haspopup="false"
							aria-expanded="false"
						>
							{{ $auth.user.name }}
						</a>
						<nuxt-link
							v-else
							class="nav-link text-dark font-weight-bold font-3 waves-effect nav-user"
							:to="localePath(`/admin/login`)"
							v-text="$t('adminHeader.login')"
						/>
						<div
							v-if="$auth.loggedIn"
							class="dropdown-menu dropdown-menu-right profile-dropdown"
						>
							<!-- item-->
							<nuxt-link
								exact
								class="dropdown-item"
								:to="localePath(`/admin/users/profile/${$auth.user._id}`)"
							>
								<i class="fas fa-user" />
								{{ $t("adminHeader.profile") }}
							</nuxt-link>
							<div class="dropdown-divider" />
							<nuxt-link
								exact
								class="dropdown-item"
								:to="localePath(`/settings/change-password`)"
							>
								<i class="fas fa-user-cog" />
								{{ $t("adminHeader.changePassword") }}
							</nuxt-link>
							<div class="dropdown-divider" />
							<button
								type="button"
								class="dropdown-item text-danger"
								@click="logout"
							>
								<i class="fas fa-power-off text-danger" />
								{{ $t("adminHeader.logout") }}
							</button>
						</div>
					</div>
				</li>
			</ul>

			<ul class="list-inline menu-left mb-0">
				<li class="float-left">
					<button class="button-menu-mobile open-left waves-effect">
						<i class="fas fa-bars" />
					</button>
				</li>
				<li class="d-block">
					<div class="dropdown pt-3 d-inline-block">
						<a
							id="dropdownMenuLink"
							class="btn btn-light dropdown-toggle"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
							>{{ $t("adminHeader.languages") }}</a
						>

						<div class="py-0 dropdown-menu" aria-labelledby="dropdownMenuLink">
							<b-button class="dropdown-item" @click="changeLang('en')">
								En-English
							</b-button>
							<div class="my-0 dropdown-divider" />
							<b-button class="dropdown-item" @click="changeLang('sv')">
								Sv-Swedish
							</b-button>
						</div>
					</div>
				</li>
			</ul>
		</nav>
	</div>
	<!-- Top Bar End -->
</template>

<script>
export default {
	methods: {
		changeLang(lang) {
			this.$i18n.setLocale(lang);
			this.$emit("changeLang");
		},
		logout() {
			this.$auth.logout("local");
		},
	},
};
</script>
