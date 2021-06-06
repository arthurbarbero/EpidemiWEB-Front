<template>
  <div id="login-content">
		<b-card
			title="Login"
			style="max-width: 40rem; border-radius: 5px; box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2)"
			class="mb-2 login-card"
		>
		<b-card-text class="m-0">
			<div class="login-input">
				<label for="user_email">Email:</label>
				<b-input-group>
					<b-form-input v-model="email"></b-form-input>
				</b-input-group>
			</div>
			<div class="login-input">
				<label for="user_password">Senha:</label>
				<b-input-group>
					<b-form-input v-model="password" type="password"></b-form-input>
				</b-input-group>
			</div>
		</b-card-text>
		<div id="btn-group" class="flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row">
			<b-button class="login-btn" variant="primary" @click="login">Entrar</b-button>
			<b-button class="login-btn" variant="danger" @click="register">Registre-se</b-button>
		</div>
  </b-card>
  </div>
</template>

<script>
import axios from "axios"
import { mapMutations } from "vuex"

	export default {
		mounted() {
			this.registered()
		},
		data() {
			return {
				email: "",
				password: ""
			}
		},
		methods: {
			login() {
				axios.post("login/",
				{ 
					email: this.email,
					password: this.password
				},
				{ 
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(res => {
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
			register() {
				this.$router.push({ name:"Register" })
			},
			registered() {
				if (this.$route.params) {
					console.log(this.$route.params)
					this.email = this.$route.params.email
					this.password = this.$route.params.password
				}
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

.login-card {
	width: 25rem;
}

.login-input {
	padding: 10px;
}
	.login-input > label {
		margin-bottom: 5px;
	}


#btn-group {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
}

.login-btn {
	margin: 10px;
}
</style>