<template>
  <div id="home-content">
    <div id="content">
      <h2>DashBoard</h2>
      <div class="create-btn flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row" v-if="this.$store.state.groups.includes('ROLE_HEALTH_AGENT')">
        <b-button size="lg" class="btns"> Cadastre uma nova doença</b-button>
        <b-button size="lg" class="btns"> Cadastre um novo sintoma</b-button>
      </div>
      <div class="create-btn flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row" v-if="this.$store.state.groups.includes('ROLE_HEALTH_AGENT')">
        <b-button size="lg" class="btns"> Cadastre uma nova incidencia</b-button>
      </div>
      <div id="incidences-view" class="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
        <b-table striped :items="items"></b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { doença: "teste", ocorrências: 0, ultimo_registro: "00/00/00"},
        { doença: "teste", ocorrências: 0, ultimo_registro: "00/00/00"},
        { doença: "teste", ocorrências: 0, ultimo_registro: "00/00/00"},
        { doença: "teste", ocorrências: 0, ultimo_registro: "00/00/00"},
        { doença: "teste", ocorrências: 0, ultimo_registro: "00/00/00"},
        { doença: "teste", ocorrências: 0, ultimo_registro: "00/00/00"}
        ]
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
}

#incidences-view {
  margin-top: 20px;
  max-height: 300px;
}
</style>