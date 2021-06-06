<template>
  <div id="home-content">
    <div id="content">
      <h2>DashBoard</h2>
      <div class="create-btn flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row" v-if="this.$store.state.groups.includes('ROLE_HEALTH_AGENT')">
        <b-button size="lg" class="btns" @click="routerPush('RegisterDisease')"> Cadastre uma nova doença</b-button>
        <b-button size="lg" class="btns" @click="routerPush('RegisterSymptom')"> Cadastre um novo sintoma</b-button>
      </div>
      <div class="create-btn flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row" v-if="this.$store.state.groups.includes('ROLE_HEALTH_AGENT')">
        <b-button size="lg" class="btns" @click="routerPush('RegisterIncidence')"> Cadastre uma nova incidencia</b-button>
        <b-button size="lg" class="btns" @click="routerPush('RegisterAgent')"> Cadastre um novo agente</b-button>
      </div>
      <div id="incidences-view" class="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
        <b-table :fields="fields" striped :items="items"></b-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllDisease } from '../service/diseaseService'

export default {
  mounted() {
    this.fillContentTable()
  },
  data() {
    return {
      items: [],
      fields: [
        {key: 'doença', label: 'Doenças'},
        {key: 'ocorrências', label: 'Ocorrências'},
        {key: 'último_registro', label: 'Último Registro'}
      ]
    }
  },
  methods: {
    routerPush(name) {
      this.$router.push({ name: name });
    },
    fillContentTable() {
      getAllDisease().then(res => {
        this.items = res.data.map(disease => { 
          return {
            doença: disease.name,
            ocorrências: disease.incidences.length,
            último_registro: this.$moment(disease.incidences.sort((a, b) => this.$moment(a.incidenceDate, "YYYY-MM-DD") < this.$moment(b.incidenceDate, "YYYY-MM-DD") ? 1 : -1)[0].incidenceDate, "YYYY-MM-DD").format("DD/MM/YYYY")
          }
        })
      }).catch(() => {
        this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Não foi possível pegar todas as ocorrencias, tente novamente.",
            confirmButtonText: `Ok`,
        })
      })
    }
  }
}
</script>

<style>
#home-content {
  display: flex;
  flex-direction: column;;
  width: 100%;
}

#content {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  margin: 10px;
}

.create-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}

.btns {
  margin: 10px;
  width: 300px;
}

#incidences-view {
  margin-top: 20px;
  max-height: 250px;
  overflow: auto;
}
</style>