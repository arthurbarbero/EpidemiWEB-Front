<template>
  <div id="newIncidence-content">
        <b-card
            title="Cadastre uma nova incidência"
            style="max-width: 60rem; border-radius: 5px; box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2)"
            class="mb-2 newIncidence-card"
        >
            <b-card-text class="m-0">
                <div class="newIncidence-select">
                    <div class="newIncidence-input-item">
                        <label for="user_selected">Usuário:</label>
                        <b-input-group>
                            <b-form-select id="user_selected" class="newIncidence-select-tag" :options="userOptions" v-model="userSelected" />
                        </b-input-group>
                    </div>
                    <div class="newIncidence-input-item">
                        <label for="disease_selected">Doença:</label>
                        <b-input-group>
                            <b-form-select id="disease_selected" class="newIncidence-select-tag" :options="diseaseOptions" v-model="diseaseSelected" />
                        </b-input-group>
                    </div>
                    <div class="newIncidence-input-item">
                        <label for="incidence_date">Email:</label>
                        <b-input-group>
                            <b-form-datepicker 
                                size="sm" 
                                id="incidence_date" 
                                locale="pt-br" 
                                v-model="incidenceDate" 
                                placeholder="Data da Incidência"
                                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            />
                        </b-input-group>
                    </div>
                </div>
                <div id="btn-group" class="flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row">
                    <b-button class="incidence-create-btn" variant="primary" @click="cadastrar">Entrar</b-button>
                </div>
            </b-card-text>
            <b-table striped :items="incidenceItems"></b-table>
        </b-card>
  </div>
</template>

<script>
import { getAllIncidence, insertIncidence } from '../service/incidenceService.js'

export default {
    mounted() {
        this.fillIncidence()
    },
    data() {
        return {
            userSelected: null,
            userOptions: [
                { value: null, text: 'Selecione um Usuário', disabled:true},
            ],
            diseaseSelected: null,
            diseaseOptions: [
                { value: null, text: 'Selecione uma Doença', disabled:true},
            ],
            incidenceDate: '',
            incidenceItems: []
        }
    },
    methods: {
        cadastrar() {
            insertIncidence({
                disease: { id: this.diseaseSelected },
                user: { id: this.userSelected },
                incidenceDate: this.incidenceDate
            }).then(() => { 
                this.$swal.fire({
                    icon: 'success',
                    title: 'Incidência cadastrada!',
                    confirmButtonText: `Ok`,
                }).then(() => {
                    this.fillIncidence()
                })
             }).catch(() => {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Incidência não cadastrada!',
                    text: "A incidência não foi cadastrada, tente novamente.",
                    confirmButtonText: `Ok`,
                })
             })
        },
        fillIncidence() {
            getAllIncidence().then(res => {
                this.incidenceItems = res.data.map(item => { return {doença: item.disease.name, usuário: item.user.name, registro: this.$moment(item.incidenceDate, "YYYY-MM-DD").format("DD/MM/YYYY")} })
            }).catch(() => {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Não foi possível pegar todas as incidências, tente novamente.",
                    confirmButtonText: `Ok`,
                })
            })
        }
    }
}
</script>

<style>
#newIncidence-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
	width: 100%;
    height: 100%;
    padding: 10px;
}

.newIncidence-card {
    width: 40rem;
}

.newIncidence-select {
    padding: 5px;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.newIncidence-select-item {
    width: 100%;
    padding: 0 2px 0 2px;
}

.newIncidence-select-tag {
    width: 100%;
}

.newIncidence-input {
    padding: 5px;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.newIncidence-input-item {
    width: 100%;
    padding: 0 2px 0 2px;
}
	.newIncidence-input-item > label {
		margin-bottom: 5px;
	}

.btn-group {
    display: flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
}

.incidence-create-btn {
    margin: 10px;
}
</style>