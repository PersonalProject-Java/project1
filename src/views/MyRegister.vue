<template >
  <v-app id="inspire" v-if="$store.state.token">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row justify="center">
          <v-col cols="12">
            <v-card class="elevation-12 mr-16">
              <v-window>
                  <v-window-item>
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="card_color">
                      <v-card-text class="white--text mt-12 text">
                        <h1 class="display-1">Foydalanuvchilarni ro'yxatdan o'tkazish oynasi</h1>
                        <h5
                            class="text-center"
                        >kiritgan parolingizni yodda salqashni unutmang</h5>
                      </v-card-text>
                      </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <div class="text-center mt-4">
                          <v-img
                              class="justify-content-center align-items-center"
                              lazy-src="../assets/web-development-4439345-3726916.webp"
                              max-height="150"
                              max-width="250"
                              src="../assets/web-development-4439345-3726916.webp"
                          ></v-img>
                        </div>
                        <h5 class="text-center display-1 blue-grey--text text--accent-3">Foydalanuvchi ma'lumotlarini kiriting</h5>
                        <v-form ref="submit">
                          <v-text-field
                              label="Name"
                              v-model="data.fullName"
                              prepend-icon="person"
                              type="text"
                              color="#27496D"
                          />
                          <v-text-field
                              label="Username"
                              v-model="data.username"
                              prepend-icon="email"
                              type="text"
                              color="#27496D"
                          />
                          <v-select
                              prepend-icon="mdi-city"
                              :items="region"
                              v-model="data.region_id"
                              item-text="name"
                              item-value="id"
                              label="Viloyati"
                              @change="districtfunction"
                              persistent-hint
                              single-line
                          ></v-select>
                          <v-select
                              prepend-icon="mdi-domain"
                              :items="district"
                              item-text="name"
                              v-model="data.district_id"
                              item-value="id"
                              label="Tuman"
                              persistent-hint
                              single-line
                          ></v-select>

                          <v-text-field
                              label="Password"
                              v-model="data.password"
                              prepend-icon="lock"
                              type="password"
                              color="#27496D"
                          />
                          <v-text-field
                              label="Pre Password"
                              v-model="data.prePassword"
                              prepend-icon="lock"
                              type="password"
                              color="#27496D"
                          />
                          <div class="text-center mb-5">
                            <v-btn @click.prevent="submit" color="#27496D" dark>SAQLASH</v-btn>
                          </div>
                        </v-form>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name:"myregister",
  data(){
    return {
       data: {
        fullName: "",
        username: "",
        region_id:"",
        district_id:"",
        password: "",
        prePassword: ""
      },
      region:'',
      district:'',
      token: 'Bearer ' + sessionStorage.getItem('token'),
    }
  },
  props: {
    source: String
  },

  mounted: async function () {
    const regionResponse = await axios.get('region/get/'+this.$store.state.regionid, {headers: { 'authorization': this.token }})
    this.region = regionResponse.data
    },
  methods:{
    //https://webdevchallenges.com/persist-access-token-with-vue-js   //  FOR FULL LOGIN URL
    submit(){
      if (this.data.district_id===''){this.data.district_id=null}
      console.log(this.data)
      let response =  axios.post('auth/register',this.data,{headers: { 'authorization': this.token }});
      this.data=''
    },
    async districtfunction() {
      const districtResponse = await axios.get('district/get/'+this.data.region_id, {headers: {'authorization': this.token}})
      this.district = districtResponse.data
    },
  },
};
</script>
<style>
.text h1{
  text-align: center;
  color: aquamarine;
  margin-top: 200px;
}
.text h5{
  color: yellow;
  margin-top: 50px;
  font-size: 20px;
}
</style>