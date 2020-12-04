<template>
	<div class="wrapper-page">
		<div class="card">
			<div class="card-body">
				<loginForm />
			</div>
		</div>
	</div>
</template>

<script>
import { AdminPanelDependancies } from "@/mixins/AdminPanelDependancies";
import loginForm from "@/components/loginForm";
export default {
	name: "Login",
	middleware: ["isNotAuthenticated"],
	mixins: [AdminPanelDependancies],
	components: {
		loginForm,
	},
};
</script>

<style scoped>
.card {
	margin-top: 100px;
}
</style>
