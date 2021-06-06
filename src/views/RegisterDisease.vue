<template>
    <div id="register-content">
		<b-card
			title="Cadastro de Doença"
			class="mb-2 container"
		>
            <b-card-text >
                <div class="input-container">
                    <label class="" for="">Nome:</label>
                    <b-input-group>
                        <b-form-input v-model="data.name"></b-form-input>
                    </b-input-group>
                </div>
            </b-card-text>
            <div id="btn-group" class="flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row">
                <b-button class="login-btn" variant="primary" @click="registerDisease">Cadastrar</b-button>
            </div>

            <div id="diease-table">
                <b-table striped :items="diseasesItems">
                    <template #cell(ações)="row">
                        <b-button size="sm" @click="excluirDiseases(row.item.id)" class="mr-1" variant="danger">
                            Excluir
                        </b-button>
                    </template>
                </b-table>
            </div>
        </b-card>
    </div>
</template>

<script>
import { insertDisease, getAllDisease, deleteDisease } from '@/service/diseaseService';

export default {
    data() {
        return {
            data: {
                name: null
            },
            diseasesItems: []
        }
    },
    methods: {
        excluirDiseases(id) {
            this.$swal.fire({
                icon: 'info',
                text: 'Deseja realmente excluir o registro?',
                showCancelButton: true,
                confirmButtonText: 'Sim',
            }).then(res => {
                if (res.isConfirmed) {
                    deleteDisease(id)
                    .then(() => {
                        this.fillDiseases();
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Doença excluida com sucesso !',
                            confirmButtonText: `Ok`,
                        })
                    })
                    .catch(() => {
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "Não foi possivel excluir este registro",
                            confirmButtonText: `Ok`,
                        })
                    })
                }
            })
        },
        fillDiseases() {
            getAllDisease().then((result) => {
                this.diseasesItems = [];
                result.data.forEach(element => {
                    this.diseasesItems.push({ "id": element.id , "nome": element.name, 'ações': null });
                });
            }).catch((err) => {
                console.log(err);
            });
        },
        
        registerDisease() {
            insertDisease(this.data)
            .then(() => {
                this.data.name = null;
                this.fillDiseases();
                this.$swal.fire({
                    icon: 'success',
                    title: 'Cadastrado !',
                    confirmButtonText: `Ok`,
                })
            })
            .catch(() => {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Não foi possivel realizar o cadastro",
                    confirmButtonText: `Ok`,
                })
            })
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

    #diease-table {
        height: 250px;
        overflow: auto;
    }
</style>