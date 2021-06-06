<template>
    <div id="register-content">
		<b-card
			title="Cadastro de Sintoma"
			class="mb-2 container flex-row"
		>
            <b-card-text >
                <div class="input-container flex row px-1">
                    <div class="col-md-6 px-1">
                        <label class="" for="">Nome:</label>
                        <b-input-group>
                            <b-form-input v-model="data.name"></b-form-input>
                        </b-input-group>
                    </div>
                    <div class="col-md-6 px-1">
                        <label for="">Descrição:</label>
                        <b-input-group>
                            <b-form-input v-model="data.description" type="text"></b-form-input>
                        </b-input-group>
                    </div>
                </div>
                <div class="flex row px-1">
                    <div class="col-md-8 px-1">
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
                    <div class="col-md-2 px-1">
                        <label for="">Severidade:</label>
                        <b-input-group>
                            <b-form-input v-model="data.severity" number type="number"></b-form-input>
                        </b-input-group>
                    </div>
                    <div id="btn-group" class="flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row col-md-2 px-1 align-items-end">
                        <b-button class="login-btn" variant="primary" @click="registerSymptom">Cadastrar</b-button>
                    </div>
                </div>
            </b-card-text>
            <div id="symptom_table">
            <b-table :fields="symptomFields" :items="symptomItems">
                <template #cell(ações)="row">
                    <b-button size="sm" @click="excluir(row.item.id)" class="mr-1" variant="danger">
                        Excluir
                    </b-button>
                </template>
            </b-table>
        </div>
        </b-card>
    </div>
</template>

<script>
import { getAllDisease } from '@/service/diseaseService';
import { insertSympton, getAllSymptoms, deleteSymptom } from '@/service/symptonService';

export default {
    mounted() {
        this.fillDiseases()
        this.fillSymptomTable()
    },
    data() {
        return {
            data: {
                name: null,
                description: null,
                severity: null,
                diseases: []
            },
            dataDisease: [],
            options: [],
            symptomItems:[],
            symptomFields:[
                {key: "id", label: "ID"},
                {key: "name", label: "Sintoma"},
                {key: "description", label: "Descrição"},
                {key: "severity", label: "Severidade"},
                {key: "ações", label: "Ações"},
            ]
        }
    },
    methods: {
        excluir(item) {
            this.$swal.fire({
                icon: 'info',
                text: 'Deseja realmente excluir o registro?',
                showCancelButton: true,
                confirmButtonText: `Sim`,
            }).then(res => {
                if (res.isConfirmed) {
                    deleteSymptom(item).then(() => {
                        this.fillSymptomTable()
                    }).catch(() => {
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Sintoma não excluido!',
                            text: "O Sintoma não foi excluido, tente novamente.",
                            confirmButtonText: `Ok`,
                        })
                    })
                }
            })
        },
        fillSymptomTable(){
            getAllSymptoms().then(res => {
                this.symptomItems = res.data.map(symptom => {
                    return { 
                        id: symptom.id,
                        name: symptom.name,
                        description: symptom.description,
                        severity: symptom.severity
                    }
                })
            }).catch(() => {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Não foi possível pegar todas os sintomas, tente novamente.",
                    confirmButtonText: `Ok`,
                })
            })
        },
        fillDiseases() {
            getAllDisease().then((result) => {
                
                result.data.forEach(element => {
                    this.options.push({ "name": element.name, "value": element.id })
                });
            }).catch(() => {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Não foi possível pegar todas as doenças, tente novamente.",
                    confirmButtonText: `Ok`,
                })
            });
        },
        resetInputData() {
            this.data.name = null
            this.data.description = null
            this.data.severity = null
            this.data.diseases = []
            this.dataDisease = []
        },
        registerSymptom() {
            this.data.diseases = this.dataDisease.map(result => result.value)

            insertSympton(this.data)
            .then(() => {
                this.$swal.fire({
                    icon: 'success',
                    title: 'Sintoma cadastrado!',
                    confirmButtonText: `Ok`,
                }).then(() => {
                    this.resetInputData()
                this.fillSymptomTable()
                })
            })
            .catch(() => {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Não foi possível cadastrar o sintoma, tente novamente.",
                    confirmButtonText: `Ok`,
                })
            })
        },
        back() {
            this.$router.push({ name: 'Home' });
        }
    }
}
</script>

<style>
    #register-content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .container {
        display: flex;
        flex-direction: row;
        max-width: 60rem; 
        width: 40rem;
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
        margin: 3px;
    }

    #symptom_table {
        margin-top: 20px;
        height: 250px;
        overflow: auto;
    }
</style>