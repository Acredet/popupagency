<template>
	<!-- Start Form -->

	<b-form class="py-5">
		<h4 class="font-weight-bold" v-text="$t('singleListing.form.sendUs')" />
		<b-row>
			<!-- Start user name -->
			<b-col cols="12">
				<b-form-group
					class="my-2"
					:label="$t('forms.name.title')"
					label-class="font-weight-bold"
					label-for="username"
				>
					<b-form-input
						id="username"
						v-model="form.name"
						autocomplete="off"
						size="sm"
					/>
				</b-form-group>
			</b-col>
			<!-- End user name -->

			<!-- Start email -->
			<b-col cols="12" md="6">
				<b-form-group
					class="my-2"
					:label="$t('forms.email.title')"
					label-class="font-weight-bold"
					label-for="email"
				>
					<b-form-input
						id="email"
						v-model="form.email"
						type="email"
						autocomplete="off"
						size="sm"
					/>
				</b-form-group>
			</b-col>
			<!-- End email -->

			<!-- Start Phone -->
			<b-col cols="12" md="6">
				<b-form-group
					class="my-2"
					:label="$t('forms.phone.title')"
					label-class="font-weight-bold"
					label-for="Phone"
				>
					<b-form-input
						id="Phone"
						v-model="form.phone"
						autocomplete="off"
						size="sm"
					/>
				</b-form-group>
			</b-col>
			<!-- End Phone -->

			<!-- Start Business -->
			<b-col cols="12" md="6">
				<b-form-group
					class="my-2"
					:label="$t('forms.business.title')"
					label-class="font-weight-bold"
					label-for="Business"
				>
					<b-form-input
						id="Business"
						v-model="form.business"
						autocomplete="off"
						size="sm"
					/>
				</b-form-group>
			</b-col>
			<!-- End Business -->

			<!-- Start Website -->
			<b-col cols="12" md="6">
				<b-form-group
					class="my-2"
					:label="$t('singleListing.info.website') + ':'"
					label-class="font-weight-bold"
					label-for="Website"
				>
					<b-form-input
						id="Website"
						v-model="form.website"
						autocomplete="off"
						size="sm"
					/>
				</b-form-group>
			</b-col>
			<!-- End Website -->

			<!-- Start From -->
			<b-col cols="12" md="6">
				<b-form-group
					class="my-2"
					:label="$t('singleListing.form.from')"
					label-class="font-weight-bold"
					label-for="from"
				>
					<b-form-datepicker
						id="from"
						v-model="form.from"
						today-button
						reset-button
						close-button
						size="sm"
						class="mb-2"
					/>
				</b-form-group>
			</b-col>
			<!-- End From -->

			<!-- Start empty -->
			<b-col cols="12" md="6">
				<b-form-group
					class="my-2"
					:label="$t('singleListing.form.empty')"
					label-class="font-weight-bold"
					label-for="Empty"
				>
					<b-form-datepicker
						id="Empty"
						v-model="form.empty"
						today-button
						reset-button
						close-button
						size="sm"
						class="mb-2"
					/>
				</b-form-group>
			</b-col>
			<!-- End empty -->

			<!-- Start details -->
			<b-col cols="12">
				<b-form-group
					class="my-2"
					:label="$t('singleListing.form.details')"
					label-class="font-weight-bold"
					label-for="details"
				>
					<b-form-textarea id="details" size="sm" />
				</b-form-group>
			</b-col>
			<!-- End details -->
			<b-col cols="12">
				<b-form-checkbox
					id="GDPR"
					v-model="form.GDPR"
					name="GDPR"
					:value="true"
					:unchecked-value="false"
				>
					{{ $t("singleListing.form.GDPR") }}
				</b-form-checkbox>
			</b-col>

			<b-btn
				class="m-2"
				size="lg"
				type="button"
				variant="primary"
				@click="sendForm"
			>
				{{ $t("actions.submit") }}
			</b-btn>
		</b-row>
	</b-form>
	<!-- End Form -->
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: "",
				email: "",
				phone: "",
				business: "",
				website: "",
				empty: "",
				from: "",
				details: "",
				GDPR: false,
			},
		};
	},
	methods: {
		sendForm() {
			alert("Not working yet 😉");
		},
	},
};
</script>

<style></style>
