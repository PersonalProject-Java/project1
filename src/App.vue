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
    token: 'Bearer ' + sessionStorage.getItem('token'),
  }),
    mounted: function () {
    if (sessionStorage.getItem('token')) {
      axios.get('auth/userme', {headers: {'authorization': this.token}}).then(response => {
        this.$store.commit('setFullName',response.data.fullName)
        sessionStorage.setItem("role",response.data.role.name)
        this.$store.commit('changeRole',response.data.role.name)
        sessionStorage.setItem("region", response.data.region.name)
        this.$store.commit('setregionid',response.data.region.id)
        this.$store.commit('setcityid',response.data.city.id)
        this.$store.commit('setdistrictid',response.data.district.id)

      });
    }
  }
};
</script>
