<template>
	<b-sidebar id="sidebar-1" backdrop-variant="dark" backdrop shadow no-header>
		<div class="d-flex justify-content-end bg-white pt-2 px-2">
			<i
				v-b-toggle.sidebar-1
				class="ml-auto fas fa-times font-4 text-dark"
			/>
		</div>
		<div class="py-2 bg-white">
			<!-- Start login link -->
			<ul>
				<li class="font-3">
					<a exact :href="`${$t('link')}login`"> login </a>
				</li>
			</ul>
			<!-- End Login link -->
			<ul v-for="(link, index) in links" :key="String(index)">
				<li
					v-b-toggle="'accordion' + index"
					:class="{
						'd-flex justify-content-between align-items-center':
							link.subList,
					}"
					class="font-3"
				>
					<nuxt-link
						v-if="link.label.url"
						exact
						:to="`${$t('link')}${link.label.url}`"
					>
						{{ link.label.text }}
					</nuxt-link>
					<span v-else>{{ link.label.text }}</span>
					<BIconCaretDownFill v-if="link.subList" />
				</li>

				<b-collapse
					v-if="link.subList"
					:id="'accordion' + index"
					accordion="my-accordion"
					role="tabpanel"
				>
					<ul>
						<li
							v-for="(one, index1) in link.subList"
							:key="String(index1)"
							class="font-3"
						>
							<nuxt-link
								:to="`${$i18n.locale === 'en' ? 'en' : ''}${
									one.url
								}`"
							>
								{{ one.text }}
							</nuxt-link>
						</li>
					</ul>
				</b-collapse>
			</ul>
		</div>
	</b-sidebar>
</template>
<script>
import {
	BIcon,
	BIconCaretDownFill,
	BIconHeartFill,
	BIconList,
} from "bootstrap-vue";

export default {
	name: "main-sidebar",
	components: {
		BIcon,
		BIconHeartFill,
		BIconList,
		BIconCaretDownFill,
	},
	computed: {
		links() {
			return [
				{
					label: {
						text: this.$t("mainNavbar.contactUs"),
						url: "/contact-us",
					},
				},
				{
					label: {
						text: this.$t("mainNavbar.services"),
					},
					subList: [
						{
							text: this.$t("mainNavbar.allServices"),
							url: "",
						},
						{
							text: this.$t("mainNavbar.rentAPopupLocally"),
							url: "",
						},
						{
							text: this.$t("mainNavbar.rentOutYourPremises"),
							url: "",
						},
					],
				},
				{
					label: {
						text: this.$t("mainNavbar.aboutUs"),
					},
					subList: [
						{
							text: this.$t("mainNavbar.whoAreThePopupAgency"),
							url: "",
						},
						{
							text: this.$t("mainNavbar.whatIsAPopup"),
							url: "",
						},
						{
							text: this.$t("mainNavbar.contact"),
							url: "",
						},
					],
				},
				{
					label: {
						text: this.$t("mainNavbar.blogAndPress"),
						url: "",
					},
				},
				{
					label: {
						text: this.$t("mainNavbar.freePopups"),
					},
					subList: [
						{
							text: this.$t("mainNavbar.freePopups"),
							url: "/lediga-lokaler",
						},
						{
							text: this.$t("mainNavbar.seeAllCities"),
							url: "",
						},
					],
				},
				{
					label: {
						text: this.$t("mainNavbar.howDoesPopupWork"),
						url: "",
					},
				},
				{
					label: {
						text: "English",
						url: "",
					},
				},
			];
		},
	},
};
</script>
<style scoped>
@media (max-width: 770px) {
	ul.navbar-nav li a:hover {
		padding-left: 0;
	}

	ul.dropdown-menu li[role="presentation"]:hover a {
		padding-left: 30px;
	}
}

.b-sidebar-body a {
	color: #000;
	text-decoration: none;
}

.b-sidebar-body a:hover {
	text-decoration: none;
}

.b-sidebar-body ul {
	padding: 0;
	margin: 0;
	list-style: none;
}

.b-sidebar-body ul li {
	padding: 15px;
	background: white;
	transition: all 0.4s ease-out;
}

.b-sidebar-body ul li svg {
	transition: all 0.4s ease-out;
	opacity: 0.6;
}

.b-sidebar-body ul li:hover {
	padding-left: 20px;
}

.b-sidebar-body ul li:hover svg {
	opacity: 1;
}

.b-sidebar-body .collapse ul {
	margin: 0;
	padding: 0;
	background: #eee !important;
}

.b-sidebar-body .collapse ul li {
	background: #eee !important;
	padding-left: 10px;
	transition: all 0.4s ease-out;
}

.b-sidebar-body .collapse ul li:hover {
	padding-left: 20px;
}
</style>
