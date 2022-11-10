<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row justify="center">
          <v-col cols="6">
            <v-card class="elevation-12 mr-lg-16">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-3">
                        <h4
                            class="text-center display-2 teal--text text--accent-3"
                        ></h4>
                        <div class="text-center mt-4">
                          <v-img
                              class="justify-content-center align-items-center"
                              lazy-src="../assets/web-development-4439345-3726916.webp"
                              max-height="150"
                              max-width="250"
                              src="../assets/web-development-4439345-3726916.webp"
                          ></v-img>
                        </div>
                        <v-form ref="submit" class="mt-3">
                          <v-text-field
                              label="Username"
                              v-model="data.username"
                              prepend-icon="email"
                              type="text"
                              color="#27496D"
                          />

                          <v-text-field
                              id="password"
                              label="Password"
                              v-model="data.password"
                              prepend-icon="lock"
                              type="password"
                              color="#27496D"

                          />
                          <div class="text-center mb-5">
                            <v-btn @click.prevent="submit" color="#27496D" dark>SIGN IN</v-btn>
                          </div>
                        </v-form>

                      </v-card-text>

                    </v-col>
                    <v-col cols="12" md="4" class="card_color">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Kiberxavfsizlik departamenti!</h1>
                        <h5
                            class="text-center"
                        >Foydalanish uchun o'zingizning shaxsiy ma'lumotlaringizni kiriting</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn outlined color="red" @click="step++">Register</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="card_color">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5
                            class="text-center"
                        >To Keep connected with us please login with your personnel info</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn outlined color="success" @click="step--">Sign in</v-btn>
                      </div>
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
                        <h5 class="text-center display-1 blue-grey--text text--accent-3">Ro'yxatdan o'ting</h5>
                        <v-form ref="submit2">
                          <v-text-field
                              label="Name"
                              v-model="data2.fullName"
                              prepend-icon="person"
                              type="text"
                              color="#27496D"
                          />
                          <v-text-field
                              label="Username"
                              v-model="data2.username"
                              prepend-icon="email"
                              type="text"
                              color="#27496D"
                          />

                          <v-text-field
                              label="Password"
                              v-model="data2.password"
                              prepend-icon="lock"
                              type="password"
                              color="#27496D"
                          />
                          <v-text-field
                              label="Pre Password"
                              v-model="data2.prePassword"
                              prepend-icon="lock"
                              type="password"
                              color="#27496D"
                          />
                          <div class="text-center mb-5">
                            <v-btn @click.prevent="submit2" color="#27496D" dark>SIGN UP</v-btn>
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

name:"MyLogin",
  data(){
   return {
     step: 1,
     data: {
       username: "",
       password: ""
     },
     data2: {
       fullName: "",
       username: "",
       password: "",
       prePassword: ""
     }
   }
  },
  props: {
    source: String
  },
        methods:{
                      //https://webdevchallenges.com/persist-access-token-with-vue-js   //  FOR FULL LOGIN URL
           submit () {
              localStorage.clear();
              axios.post('auth/login', this.data).then(response =>{
             if (response.data){
              localStorage.setItem('token',response.data);
              this.$router.push('/');
              window.location.reload()
             }else {
               alert("Login yoki parol noto'g'ri")
             }
            })
          },
           submit2(){
            let response =  axios.post('auth/register',this.data2);
             console.log(response)
             this.step--
          }

        },
      };
    </script>

<style>
.card_color{
  background-color: #27496D;
}
</style>