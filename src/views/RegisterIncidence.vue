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
                            <multiselect 
                                id="user_selected"
                                class="newIncidence-select-tag" 
                                :options="userOptions" 
                                label="name" 
                                placeholder="Selecione um Usuário" 
                                track-by="name"
                                :selectLabel="null"
                                :deselectLabel="null"
                                v-model="userSelected" />
                        </b-input-group>
                    </div>
                    <div class="newIncidence-input-item">
                        <label for="disease_selected">Doença:</label>
                        <b-input-group>
                            <multiselect 
                                id="disease_selected" 
                                class="newIncidence-select-tag" 
                                :options="diseaseOptions" 
                                label="name" 
                                placeholder="Selecione uma Doença" 
                                track-by="name"
                                :selectLabel="null"
                                :deselectLabel="null"
                                v-model="diseaseSelected" />
                        </b-input-group>
                    </div>
                    <div class="newIncidence-input-item">
                        <label for="incidence_date">Data da Incidencia:</label>
                        <b-input-group>
                            <b-form-datepicker 
                                id="incidence_date" 
                                locale="pt-br" 
                                v-model="incidenceDate" 
                                placeholder="Data da Incidência"
                                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            />
                        </b-input-group>
                    </div>
                </div>
            </b-card-text>
            <div id="btn-group" class="flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row">
                <b-button class="incidence-create-btn" variant="primary" @click="cadastrar">Cadastrar</b-button>
            </div>
            <div id="incidence_table">
                <b-table :busy="isBusy" :fields="incidenceFields" :items="incidenceItems">
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
import { deleteIncidence, getAllIncidence, insertIncidence } from '../service/incidenceService.js'
import { getAllDisease } from '../service/diseaseService.js'
import { getAllUsers } from '../service/accountService.js'

export default {
    mounted() {
        this.fillIncidence()
        this.fillDiseases()
        this.fillUser()
    },
    data() {
        return {
            userSelected: null,
            userOptions: [
            ],
            diseaseSelected: null,
            diseaseOptions: [
            ],
            incidenceDate: '',
            incidenceItems: [],
            isBusy: false,
            incidenceFields: [
                {key: 'id', label: 'ID'},
                {key: 'doença', label: 'Doença'},
                {key: 'usuário', label: 'Usuário'},
                {key: 'registro', label: 'Registro'},
                {key: 'ações', label: 'Ações'}
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
                    deleteIncidence(item).then(() => {
                        this.fillIncidence()
                    }).catch(() => {
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Incidência não foi excluida!',
                            text: "A incidência não foi excluida, tente novamente.",
                            confirmButtonText: `Ok`,
                        })
                    })
                }
            })
        },
        cadastrar() {
            insertIncidence({
                disease: { id: this.diseaseSelected.id },
                user: { id: this.userSelected.id },
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
            this.isBusy = true
            getAllIncidence().then(res => {
                this.incidenceItems = res.data.map(item => { return {
                    id: item.id,
                    doença: item.disease.name, 
                    usuário: item.user.name, 
                    registro: this.$moment(item.incidenceDate, "YYYY-MM-DD").format("DD/MM/YYYY"),
                    ações: null
                }})
                this.isBusy = false
            }).catch(() => {
                this.isBusy = false
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Não foi possível pegar todas as incidências, tente novamente.",
                    confirmButtonText: `Ok`,
                })
            })
        },
        fillDiseases() {
            getAllDisease().then(res => { 
                console.log(res)
                this.diseaseOptions = res.data.map(item => { return { id: item.id, name: item.name }})
            }).catch(()=> {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Não foi possível pegar todas as doenças, tente novamente.",
                    confirmButtonText: `Ok`,
                })
            })
        },
        fillUser() {
            getAllUsers().then(res => { 
                console.log(res)
                this.userOptions = res.data.map(item => { return { id: item.id, name: item.name }})
            }).catch(()=> {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Não foi possível pegar todas as doenças, tente novamente.",
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

#btn-group {
    display: flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
}

#incidence_table {
    margin-top: 20px;
    max-height: 250px;
    overflow: auto;
}

.incidence-create-btn {
    margin: 10px;
}
</style>