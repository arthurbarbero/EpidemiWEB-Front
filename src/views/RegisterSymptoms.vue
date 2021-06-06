<template>
    <div id="register-content">
		<b-card
			title="Cadastro de Sintoma"
			class="mb-2 container"
		>
            <b-card-text >
                <div class="input-container">
                    <label class="" for="">Nome:</label>
                    <b-input-group>
                        <b-form-input v-model="data.name"></b-form-input>
                    </b-input-group>
                </div>

                <div class="input-container">
                    <label for="">Descrição:</label>
                    <b-input-group>
                        <b-form-input v-model="data.description" type="text"></b-form-input>
                    </b-input-group>
                </div>

                <div class="flex row p-2">
                    <div class="col-md-8">
                        <label for="">Doenças:</label>
                        <div>
                            <multiselect 
                                track-by="name" 
                                :close-on-select="false" 
                                label="name" 
                                :searchable="true" 
                                :multiple="true" 
                                v-model="dataDisease" 
                                :options="options"
                            ></multiselect>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <label for="">Severidade:</label>
                        <b-input-group>
                            <b-form-input v-model="data.severity" number type="number"></b-form-input>
                        </b-input-group>
                    </div>
                </div>

            </b-card-text>
            <div id="btn-group" class="flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row">
                <b-button class="login-btn" variant="danger" @click="back">Voltar</b-button>
                <b-button class="login-btn" variant="primary" @click="registerDisease">Cadastrar</b-button>
            </div>
        </b-card>
    </div>
</template>

<script>
import { getAllDisease, insertDisease } from '@/service/diseaseService';

export default {
    data() {
        return {
            data: {
                name: null,
                description: null,
                severity: null,
                diseases: []
            },
            dataDisease: [],
            options: []
        }
    },
    methods: {
        fillDiseases() {
            getAllDisease().then((result) => {
                
                result.data.forEach(element => {
                    this.options.push({ "name": element.name, "value": element.id });
                });
            }).catch((err) => {
                console.log(err);
            });
        },
        registerDisease() {
            this.data.disease = this.dataDisease.map(result => result.value);

            insertDisease(this.data)
            .then(() => {
                this.$router.push({ name: 'Home' })
            })
            .catch(error => {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                    confirmButtonText: `Ok`,
                })
            })
        },
        back() {
            this.$router.push({ name: 'Home' });
        }
    },
    mounted() {
        this.fillDiseases();
    }
}
</script>

<style>
    #register-content {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .container {
        max-width: 50rem; 
        width: 35rem;
        border-radius: 5px; 
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    }
    .input-container {
        padding: 10px;
    }
	.input-container > label {
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