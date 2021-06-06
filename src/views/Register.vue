<template>
  <div id="register-content">
    <b-card
        title="Registre-se"
        style="max-width: 60rem; border-radius: 5px; box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2)"
        class="mb-2 register-card"
    >
        <b-card-text class="m-0">
            <div class="register-input">
                <div class="register-input-item">
                    <label for="user_name">Nome Completo:</label>
                    <b-input-group>
                        <b-form-input size="sm" id="user_name" v-model="user.name"></b-form-input>
                    </b-input-group>
                </div>
            </div>
            <div class="register-input">
                <div class="register-input-item">
                    <label for="user_email">Email:</label>
                    <b-input-group>
                        <b-form-input type="email" size="sm" id="user_email" v-model="user.email"></b-form-input>
                    </b-input-group>
                </div>
                <div class="register-input-item">
                    <label for="user_senha">Senha:</label>
                    <b-input-group>
                        <b-form-input type="password" size="sm" id="user_senha" v-model="user.password"></b-form-input>
                    </b-input-group>
                </div>
            </div>
            <div class="register-input">
                <div class="register-input-item">
                    <label for="address_address">Endereço:</label>
                    <b-input-group>
                        <b-form-input size="sm" id="address_address" v-model="address.address"></b-form-input>
                    </b-input-group>
                </div>
                <div class="register-input-item w-25">
                    <label for="address_number">Número:</label>
                    <b-input-group>
                        <b-form-input size="sm" id="address_number" v-model="address.number" type="number" no-wheel number></b-form-input>
                    </b-input-group>
                </div>
            </div>
            <div class="register-input">
                <div class="register-input-item">
                    <label for="address_district">Bairro:</label>
                    <b-input-group>
                        <b-form-input size="sm" id="address_district" v-model="address.district"></b-form-input>
                    </b-input-group>
                </div>
                <div class="register-input-item">
                    <label for="address_number">Complemento:</label>
                    <b-input-group>
                        <b-form-input size="sm" id="address_number" v-model="address.complement"></b-form-input>
                    </b-input-group>
                </div>
            </div>
            <div class="register-input">
                <div class="register-input-item">
                    <label for="address_city">Cidade:</label>
                    <b-input-group>
                        <b-form-input size="sm" id="address_city" v-model="address.city"></b-form-input>
                    </b-input-group>
                </div>
                <div class="register-input-item">
                    <label for="address_state">Estado:</label>
                    <b-input-group>
                        <b-form-input size="sm" id="address_state" v-model="address.state"></b-form-input>
                    </b-input-group>
                </div>
                <div class="register-input-item">
                    <label for="address_country">País:</label>
                    <b-input-group>
                        <b-form-input size="sm" id="address_country" v-model="address.country"></b-form-input>
                    </b-input-group>
                </div>
            </div>
        </b-card-text>
        <div id="btn-group" class="flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row">
            <b-button class="login-btn" variant="primary" @click="register">Cadastrar</b-button>
        </div>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: ""
            },
            address: {
                address: "",
                number: "",
                complement: "",
                district: "",
                city: "",
                state: "",
                country: ""
            },
            role: "ROLE_PATIENT"
        }
    },
    methods: {
        register() {
            axios.post("user/registerUser", { 
                user: this.user, address: this.address, role: this.$store.state.groups.includes("ROLE_HEALTH_AGENT") ? "ROLE_HEALTH_AGENT" : this.role  
                }
            ).then(() => {
                this.$swal.fire({
                    icon: 'success',
                    title: 'Cadastrado',
                    text: "Redirecionando para o Login",
                    confirmButtonText: `Ok`,
                }).then(() => {
                    this.$router.push({ name: "Login", params: { 
                            email: this.user.email,
                            password: this.user.password
                        }
                    })
                })
            }).catch(() => {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Ocorreu um erro ao se registrar, tente novamente",
                    confirmButtonText: `Ok`,
                })
            })
        }
    }
}
</script>

<style>
#register-content {
    display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
}

.register-card {
    width: 40rem;
}

.register-input {
    padding: 5px;
    width: 100%;
    display: flex;
    flex-direction: row;
}
.register-input-item {
    width: 100%;
    padding: 0 2px 0 2px;
}
	.register-input-item > label {
		margin-bottom: 5px;
	}

#btn-group {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
    margin-top: 10px;
}


input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

</style>