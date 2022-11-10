<template>
  <div>
    <v-app-bar
        color="#27496D"
        dense
        dark
        fixed
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn color="#06080E" v-if="$store.state.token" @click="logOut">
        Logout
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name:'MyNavbar',
  data(){
    return {
    }
  },
  methods:{
    logOut(){
          localStorage.clear(),
          this.$router.push('/'),
          window.location.reload()
    }
  },
}
</script>