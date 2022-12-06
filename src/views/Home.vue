<template>
  <v-app>
    <MyLogin v-if="!$store.state.token"/>
  </v-app>
</template>
<script>
import MyLogin from "@/views/MyLogin";

export default {
  components: {MyLogin},
  data: () => ({
    token: 'Bearer ' + sessionStorage.getItem('token'),
        }),

};
</script>

