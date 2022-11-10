<template>
  <v-app>
    <SideBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import DataTable from "@/views/MyCity.vue";
import SideBar from "@/components/SideBar";
// import MyFooter from "@/components/MyFooter";
import axios from "axios";
export default {
  name: 'App',
  components: { SideBar },
  data: () => ({
    token: 'Bearer ' + localStorage.getItem('token'),
  }),
    mounted: function () {
    if (localStorage.getItem('token')) {
      axios.get('auth/userme', {headers: {'authorization': this.token}}).then(response => {
        localStorage.setItem('region', response.data.region.name)
        this.$store.commit('changeRole',response.data.role.name)
      });
    }
  }
};
</script>
