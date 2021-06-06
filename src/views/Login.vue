<template>
  <div id="login-content">
		<b-card
			title="Login"
			style="max-width: 20rem; border-radius: 5px; box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2)"
			class="mb-2"
		>
		<b-card-text >
			<label class="" for="user_email">Email:</label>
			<b-input-group>
				<b-form-input v-model="data.email"></b-form-input>
			</b-input-group>
			<label for="user_password">Senha:</label>
			<b-input-group>
				<b-form-input v-model="data.password" type="password"></b-form-input>
			</b-input-group>
		</b-card-text>
    <b-button variant="primary" @click="login">Entrar</b-button>
  </b-card>
  </div>
</template>

<script>
import axios from "axios"
import { mapMutations } from "vuex"

	export default {
		data() {
			return {
				data: {
					email: "",
					password: ""
				}
			}
		},
		methods: {
			login() {
				axios.post("login/", this.data).then(res => {
					axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.tokenKey}`
					this.setToken(res.data.tokenKey)
					this.setGroups(res.data.groups)
					this.$router.push({name: 'Home'})
				}).catch(error => {
					this.$swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: error.message,
						confirmButtonText: `Ok`,
					})
				})
			},
			...mapMutations([
				"setToken",
				"setGroups"
			])
		}
	}
</script>

<style>
#login-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
}
</style>