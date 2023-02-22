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

      <a id="lanuz" class=" ml-3" v-bind:class="{stateLang:stateLanUz}" @click="test('uz')">uz</a>
      <a id="lanuz2" class=" ml-3" v-bind:class="{stateLang:stateLanЎз}" @click="test('ўз')">ўз</a>
      <a id="lanuz3" class=" ml-3" v-bind:class="{stateLang:stateLanRU}" @click="test('ru')">ru</a>

      <v-divider
          class="mx-4"
          inset
          vertical
      ></v-divider>

      <v-btn id="logout" v-if="$store.state.token" @click="logOut">{{ $t('login') }}</v-btn>
      <v-btn id="register" to="/register" v-if="$store.state.role === 'SUPERADMIN' || $store.state.role === 'ADMIN'">{{ $t('add') }}</v-btn>

    </v-app-bar>
  </div>
</template>

<script>
export default {
  name:'MyNavbar',
  data(){
    return {
      stateLanUz:true,
      stateLanRU:false,
      stateLanЎз:false,
           }
        },

//6191
  methods:{
    logOut(){
          sessionStorage.clear(),
          this.$router.push('/'),
          window.location.reload()
    },
    test(type){
      if (type==='uz'){
        this.$i18n.locale='uz'
        this.stateLanUz=true
        this.stateLanRU=false
        this.stateLanЎз=false
      }
      else if (type === 'ru'){
        this.$i18n.locale='ru'
        this.stateLanRU=true
        this.stateLanUz=false
        this.stateLanЎз=false
      }
      else if(type === 'ўз'){
        this.$i18n.locale='ўз'
        this.stateLanЎз = true
        this.stateLanRU = false
        this.stateLanUz = false
      }
    }
  },
}
</script>

<style>

#lanuz{
  text-align: center;
  color: grey;
  width: 20px;
       }
#lanuz2{
  text-align: center;
  color: grey;
  width: 20px;
       }
#lanuz3{
  text-align: center;
  color: grey;
  width: 20px;
       }
    #lanuz.stateLang{
      border-radius: 20%;
      font-size: 15px;
      font-weight: bold;
      font-family:"Arial";
      color: red;
      background-color: white
    }
    #lanuz2.stateLang{
      border-radius: 20%;
      font-size: 15px;
      font-weight: bold;
      font-family:"Arial";
      color: red;
      background-color: white
    }
    #lanuz3.stateLang{
      border-radius: 20%;
      font-size: 15px;
      font-weight: bold;
      font-family:"Arial";
        color: red;
        background-color: white;
    }
    #logout{
      width: 4%;
      height: 55%;
      font-size: 12px;
      background-color: red;
      color: white;
      transition: 0.4s;
    }
    #logout:hover{
      width: 4.5%;
      height: 60%;
      color: red;
      background-color: white;
    }

    #register{
      margin-left: 1%;
      background-color: black;
      width: 5%;
      height: 55%;
      font-size: 12px;
      transition: 0.4s;
    }
    #register:hover{
      width: 4.5%;
      height: 60%;
      background-color: white;
      color: black;
    }
</style>