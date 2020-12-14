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
			<b-col cols="12">
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
			<b-col cols="12">
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

			<!-- Start messsage -->
			<b-col cols="12">
				<b-form-group
					class="my-2"
					:label="$t('forms.subject.title')"
					label-class="font-weight-bold"
					label-for="subject"
				>
					<b-form-select
						v-model="form.subject"
						:options="options"
						size="sm"
						id="subject"
					></b-form-select>
				</b-form-group>
			</b-col>
			<!-- End messsage -->

			<!-- Start messsage -->
			<b-col cols="12">
				<b-form-group
					class="my-2"
					:label="$t('forms.message.title')"
					label-class="font-weight-bold"
					label-for="messsage"
				>
					<b-form-textarea v-model="form.message" id="messsage" size="sm" />
				</b-form-group>
			</b-col>
			<!-- End messsage -->

			<b-col cols="12">
				<b-form-group
					class="my-2"
					:label="$t('forms.message.title')"
					label-class="font-weight-bold"
					label-for="messsage"
				>
					<!-- :state="Boolean(form.file)" -->
					<b-form-file
						v-model="form.file"
						placeholder="Choose a file or drop it here..."
						drop-placeholder="Drop file here..."
					/>
				</b-form-group>
			</b-col>

			<b-col cols="12">
				<!-- End messsage -->
				<b-form-group
					label="Inline radios (default)"
					v-slot="{ ariaDescribedby }"
				>
					<b-form-radio-group
						v-model="form.options"
						:options="options"
						:aria-describedby="ariaDescribedby"
						name="radio-inline"
					></b-form-radio-group>
				</b-form-group>
			</b-col>

			<b-btn class="m-2" type="button" variant="primary" @click="sendForm">
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
			options: [
				{ text: "First radio", value: "first" },
				{ text: "Second radio", value: "second" },
				{ text: "Third radio", value: "third" },
			],
			form: {
				name: "",
				email: "",
				phone: "",

				subject: "",
				message: "",
				file: null,
				options: "first",
			},
		};
	},
	methods: {
		async sendForm() {
			// Todo
			await this.$axios
				.$post("/mail/bookingRequest", this.form)
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		},
	},
};
</script>

<style></style>
