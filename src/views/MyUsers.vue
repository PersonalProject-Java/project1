<template>
  <v-row v-if="$store.state.token && ($store.state.role==='SUPERADMIN' || $store.state.role==='ADMIN')">
    <v-col cols="10" class="mt-16">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Qidirish"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          sort-by="calories"
          class="elevation-4"
      >
       <template v-slot:top>
          <v-toolbar
              flat
          >
            <v-toolbar-title>Foydalanuvchilar</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
                v-model="dialog"
                max-width="1200px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                          md="2"
                      >
                        <v-select
                            clearable
                            outlined
                            :items="region"
                            item-text="name"
                            item-value="id"
                            v-model="editedItem.region"
                            label="Viloyati"
                            @change="sorted"
                        ></v-select>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="2"
                      >
                        <v-select
                            clearable
                            outlined
                            :items="district"
                            item-text="name"
                            item-value="id"
                            v-model="editedItem.district"
                            label="Tuman"
                        ></v-select>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="2"
                      >
                        <v-text-field
                            clearable
                            outlined
                            v-model="editedItem.username"
                            label="Username"

                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="2"
                      >
                        <v-text-field
                            clearable
                            outlined
                            v-model="editedItem.fullName"
                            label="To'liq ismi"
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            outlined
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            v-model="editedItem.passwordd"
                            label="Yangi parol kiriting"
                            persistent-hint
                            single-line
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                  >
                    Bekor qilish
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                  >
                    Saqlash
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Bekor qilish</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">Ok</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.switch="{ item }">
          <v-switch
              v-model="item.enabled"
              :label="`holati : ${ item.enabled }`"
              class="pa-3"
              @click="changedStatus(item)"
          ></v-switch>
        </template>

        <template v-slot:item.actions="{ item }">
           <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              small
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>

        <template v-slot:no-data>
          <v-btn
              color="primary"
              @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>

    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name:'district',
  data: () => ({

    search:'',
    region:'',
    district:'',
    deleteId:'',
    statusId:'',
    switch1:'faol',
    dialog: false,
    dialogDelete: false,
    token: 'Bearer ' + sessionStorage.getItem('token'),
    show1:false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },


    headers: [

      { text: 'Role', value: 'role.name' },
      { text: 'Viloyat', value: 'region.name' },
      { text: 'Tuman', value: 'district.name' },
      { text: 'To\'liq ismi', value: 'fullName' },
      { text: 'username', value: 'username' },
      { text: 'Yaratilgan', value: 'createdAt' },
      { text: 'Faollik', value: 'switch', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      region:'',
      district:'',
      username:'',
      fullName:'',
      passwordd:'',
    },
    defaultItem: {
      name: '',
      region: '',
    },
  }),


  mounted: async function () {
    this.sorted()
    const response = await axios.get('user/get', {headers: { 'authorization': this.token }})
    const regionResponse = await axios.get('region/get/', {headers: { 'authorization': this.token }})
    const districtResponse = await axios.get('district/get/'+this.editedItem.region, {headers: {'authorization': this.token}})
    this.region = regionResponse.data
    this.desserts = response.data
    this.district = districtResponse.data
  },


  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Yangi yaratish' : 'O\'zgartirish'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    async sorted() {
      const districtResponse = await axios.get('district/get/'+this.editedItem.region, {headers: {'authorization': this.token}})
      this.district = districtResponse.data
    },




    async changedStatus(item) {
      this.statusId = item.id
      const response = await axios.put('user/edit/status/'+this.statusId,this.editedItem, {headers: {'authorization': this.token}})


    },


    initialize () {
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.deleteId = item.id
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      await axios.delete('user/delete/'+this.deleteId, {headers: {'authorization': this.token}})
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      if (this.editedIndex > -1) {
        if (isNaN(this.editedItem.region)){this.editedItem.region = this.editedItem.region.id}
        if (isNaN(this.editedItem.district)){this.editedItem.district = this.editedItem.district.id}
         await axios.put('user/edit/'+this.editedItem.id,  this.editedItem, {headers: {'authorization': this.token}})
        Object.assign(this.desserts[this.editedIndex], this.editedItem)

      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
   },
}
</script>