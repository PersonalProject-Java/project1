<template>
  <div>
<v-app>
    <MyNavbar v-if="$store.state.token"/>
    <v-navigation-drawer app clipped flat dark expand-on-hover color="#27496D" class="mt-10" v-if="$store.state.token">
      <v-list>

        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="../assets/admin2.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-title class="mt-1">{{$store.state.role}}</v-list-item-title>
        </v-list-item>

        <v-list-item-group v-for="item in items" :key="item.root" v-model="selectedItem" color="white" >
        <v-list-item v-if="!item.subLinks" :to="item.path" >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
          <v-list-item>{{ $t(item.text) }}</v-list-item>
          </v-list-item-title>
        </v-list-item>

          <v-list-group
              v-else-if="$store.state.role==='SUPERADMIN'"
              :key="item.text"
              no-action
              :prepend-icon="item.icon"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
            </template>

            <v-list-item
                v-for="subLink in item.subLinks"
                :to="subLink.path"
                :key="subLink.text"
            >
              <v-list-item-icon>
                <v-icon>{{ subLink.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t(subLink.text) }}</v-list-item-title>

            </v-list-item>

          </v-list-group>
        </v-list-item-group>
      </v-list>

      <v-list>
        <v-list-item-group v-for="item in users" :key="item.root" v-model="selectedItem" color="white" >
          <v-list-item v-if=" $store.state.role !=='USER'" :to="item.path" >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <v-list-item>{{ $t(item.text) }}</v-list-item>
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

          {icon: 'fa fa-users', text: 'Afghan', path: '/personalforms'},
          {icon: 'fas fa-people-carry', text: 'AES', path: '/dr'},
          {icon: 'fas fa-bomb', text: 'Yadro', path: '/yd'},
          {icon: 'fas fa-medal', text: 'SecondWar', path: '/secondwar'},
          {icon: 'fas fa-user-injured', text: 'SecondWar', path: '/secondwar'},

        ],
      users:[{icon: 'fas fa-users-cog', text: 'Users', path: '/users'}],


      }
    },
    methods:{


      },
  }
</script>

<style scoped lang="scss">
::v-deep .v-application--wrap {
  min-height: fit-content;
}
.iconUser{
  color: white;
}

</style>

