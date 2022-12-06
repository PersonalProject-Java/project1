<template>
  <div>
    <v-app-bar
        color="#27496D"
        dense
        dark
        fixed

    >
      <h4>{{$store.state.fullname}}</h4>
      <v-spacer></v-spacer>

      <v-btn color="#FF0202" v-if="$store.state.token" @click="logOut">
         chiqish
      </v-btn>
      <v-btn color="#06080E" to="/register" class=" ml-5 black" v-if="$store.state.role === 'SUPERADMIN' || $store.state.role === 'ADMIN'">
         qo'shish
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
          sessionStorage.clear(),
          this.$router.push('/'),
          window.location.reload()
    }
  },
}
</script>