<template>
  <div id="app">
    <div>
      <b-navbar id="nav" v-if="this.$store.state.isLogged">
        <div id="nav-brand">
          EpidemiWEB
        </div>
        <div id="nav-buttons">
          <b-button variant="outline-light" class="nav-item-btn my-2 my-sm-0">Dashboard</b-button>
          <b-button variant="outline-light" class="nav-item-btn my-2 my-sm-0" @click="logout">Logout</b-button>
        </div>
      </b-navbar>
    </div>
    <div id="body-app">
      <div id="body-content">
        <router-view />
      </div>
    </div>
    <div id="footer" v-if="this.$store.state.isLogged">
      Esse é o footer
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

  export default {
    methods: {
      logout() {
        this.setIsLogged(false)
        this.$router.push({ name: "Login" })
      },
      ...mapMutations([
        "setIsLogged"
      ])
    }
  }
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

#body-app {
  display: flex;
  justify-content: center;
  background: #dae2e7;
  height: 100%;
}

#body-content {
  background: #faf3f3;
  width: 75%;
}

#nav {
  display:flex;
  flex-direction: row;
  width: 100%;
  background: #405766;
  opacity: 0.4;
  height: 100%;
  padding: 10px;
}

#nav-brand {
  width: 75%;
  color: whitesmoke;
  font-weight: bold;
  font-size: 20px;
}

#nav-buttons{
  width: 25%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.nav-item-btn {
  margin: 2px;
}

#footer {
  background: #da7f8f;
  height: 10%;
}
</style>