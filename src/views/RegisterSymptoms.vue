<template>
    <div id="register-content">
		<b-card
			title="Cadastro de Sintoma"
			style="max-width: 20rem; border-radius: 5px; box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2)"
			class="mb-2"
		>
            <b-card-text >
                <label class="" for="">Nome:</label>
                <b-input-group>
                    <b-form-input v-model="data.name"></b-form-input>
                </b-input-group>
                <label for="">Descrição:</label>
                <b-input-group>
                    <b-form-input v-model="data.description" type="text"></b-form-input>
                </b-input-group>
                <label for="">Severidade:</label>
                <b-input-group>
                    <b-form-input v-model="data.severity" type="text"></b-form-input>
                </b-input-group>
                <div class="flex-column">
                    <label for="">Doenças:</label>
                    <b-form-select v-model="data.disease" :options="options" size="md" class="mt-3"></b-form-select>
                </div>

            </b-card-text>
            <b-button variant="primary" @click="registerDisease">Cadastrar</b-button>
        </b-card>
    </div>
</template>

<script>
import { diseaseService } from '@/service/diseaseService';

const serviceDisease = new diseaseService();

export default {
    data() {
        return {
            data: {
                name: null,
                description: null,
                severity: null,
                disease: null
            },
            options: [
                { value: null, text: 'Please select an option' }
            ]
        }
    },
    methods: {
        getDiseases() {
            serviceDisease.getAllDisease().then((result) => {
                
                result.data.forEach(element => {
                    this.options.push({ value: element.id, text: element.name });
                });
            }).catch((err) => {
                console.log(err);
            });
        },
        registerDisease() {

        }
    },
    mounted() {
        this.getDiseases();
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
</style>