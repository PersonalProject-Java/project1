<template xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
  <div>
<v-app>
    <MyNavbar />
    <v-navigation-drawer
        app
        permanent
        clipped
        flat
        dark
        expand-on-hover
        color="#27496D"
        class="mt-10"
        v-if="$store.state.token">
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="../assets/admin2.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-title class="mt-1">{{$store.state.role}}</v-list-item-title>
        </v-list-item>
        <v-list-item-group v-for="item in items" :key="item.root" v-model="selectedItem" color="white" >
        <v-list-item v-if="!item.subLinks" :to="item.path" >
<!--          <v-list-item-icon>-->
           <span class="icons">
            <v-icon :size="23">
                {{ item.icon }}
            </v-icon>
           </span>
<!--          </v-list-item-icon>-->
          <v-list-item-title>
          <v-list-item>
            <span class="custom-text">
            {{ $t(item.text) }}<br>{{$t(item.additionaltext)}}
            </span>
          </v-list-item>
          </v-list-item-title>
        </v-list-item>


           <v-list-group
              v-else-if="$store.state.role==='SUPERADMIN'"
              :key="item.text"
              no-action
              :prepend-icon="item.icon"
          >
            <template v-slot:activator>
              <v-list-item-title>
                          <span class="custom-text">
                {{ $t(item.text) }}
                          </span>
              </v-list-item-title>
            </template>

            <v-list-item
                v-for="subLink in item.subLinks"
                :to="subLink.path"
                :key="subLink.text"
            >
              <v-list-item-icon>
                <span class="icons">
                <v-icon :size="20">{{ subLink.icon }}</v-icon>
                </span>
              </v-list-item-icon>
              <v-list-item-title >
                   <span class="custom-text">
                {{ $t(subLink.text) }}
                   </span>
              </v-list-item-title>
            </v-list-item>

          </v-list-group>
        </v-list-item-group>




      </v-list>

      <v-list>
        <v-list-item-group v-for="item in users" :key="item.root" v-model="selectedItem" color="white" >
          <v-list-item v-if=" $store.state.role !=='USER'" :to="item.path" >
            <v-list-item-icon>
              <span class="icons">
              <v-icon>{{ item.icon }}</v-icon>
              </span>
            </v-list-item-icon>
            <v-list-item-title>
              <v-list-item>
                {{ $t(item.text)}}
              </v-list-item>
               </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>


    </v-navigation-drawer>
</v-app>
  </div>
</template>
<script>


  import MyNavbar from "@/components/MyNavbar";
  import MyFooter from "@/components/MyFooter";
  export default {
    name:'SideBar',
    components: {MyFooter, MyNavbar},
    data(){

      return{
        selectedItem: 0,
        items: [
              {icon: 'fas fa-paste', text: 'Directory', subLinks:[

              {icon: 'fas fa-map', text: 'Region', path: '/region'},
              {icon: 'fas fa-city', text: 'Districts', path: '/district'},
              {icon: 'fas fa-city', text: 'City', path: '/city'},
              {icon: 'fas fa-restroom', text: 'Floor', path:'/floor'},
              {icon: 'fas fa-graduation-cap', text: 'Educational', path: '/educational'},
              {icon: 'far fa-id-card', text: 'Nationality', path: '/nationality'},
            ]},

          {icon: 'fa fa-users', text: 'Afghan',additionaltext:'', path: '/personalforms'},
          {icon: 'fas fa-people-carry', text: 'AES',additionaltext:'', path: '/dr'},
          {icon: 'fas fa-bomb', text: 'Yadro',additionaltext:'', path: '/yd'},
          {icon: 'fas fa-medal', text: 'Secondwar',additionaltext:'used', path: '/secondwar'},
          {icon: 'fas fa-solid fa-hospital', text: 'companionpart',additionaltext:'companions', path: '/companion'},
          {icon: 'fas fa-solid fa-people-arrows', text: 'front',additionaltext:'persons', path: '/awardees'},
          {icon: 'fas fa-user', text: 'conscript', path: '/conscripts'},
          {icon: 'fas fa-plus', text: 'invalid',additionaltext: 'equal', path: '/invalids'},
          {icon: 'fas fa-users', text: 'other',additionaltext:'half_other', path: '/others'},
          {icon: 'fas fa-users', text: 'sibling',additionaltext:'siblingpart', path: '/siblings'},
          {icon: 'fas fa-user-injured', text: 'baynalmilal',additionaltext:'', path: '/wareor'},
        ],
      users:[{icon: 'fas fa-users-cog', text: 'Users', path: '/users'}],
      }
    },
    methods:{
      },
  }
</script>
<style scoped lang="scss">
.custom-text {
  color: lightblue;
  font-size: 16px;
  text-align: left;
  margin-left: 0;
  font-family: open-s;

}
.icons{
  color: orangered;
}
::v-deep .v-application--wrap {
  min-height: fit-content;
}
.iconUser{
  color: white;
}
</style>

