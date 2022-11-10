<template>
  <v-row v-if="$store.state.token">
    <v-col cols="10" class="mt-16">
        <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            @input="this.nextperson"
        ></v-text-field>
      </v-card-title>

            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="itemsPerPage"
              item-key="name"
              single-expand
              class="elevation-1"
              :hide-default-footer="true"
              :loading="loading"
            >
              <template v-slot:top>
                <v-toolbar
                    color="#6F92AA"
                    outlined
              >
                <v-toolbar-title>Shaxslar</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
               ></v-divider>
               <v-spacer></v-spacer>
               <v-dialog
                        v-model="dialog"
                        max-width="1500px"
                        persistent

               >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="#336791"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                  >
                   Create
                  </v-btn>
          </template>
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
                    <v-text-field
                        autofocus
                        counter
                        success
                        v-model="editedItem.name"
                        label="Ismi"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-text-field
                        counter
                        v-model="editedItem.lastName"
                        label="Otasining ismi"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-text-field
                        counter
                        v-model="editedItem.sureName"
                        label="Familyasi"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-text-field
                        counter
                        validate-on-blur
                        v-model="editedItem.pnfl"
                        label="PNFL"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-text-field

                        counter

                        v-model="editedItem.serePassport"
                        label="Passport sereasi"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-text-field
                          counter
                        v-model="editedItem.numberPassport"
                        label="Passport raqami"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-text-field
                        counter
                        v-model="editedItem.whoGive"
                        label="Kim tomonidan berilgan"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-menu
                        v-model="modal"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="editedItem.datePassport"
                            label="Pasport berilgan sana"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="editedItem.datePassport"
                          @input="modal = false"
                      ></v-date-picker>
                    </v-menu>


                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-text-field
                        counter
                        v-model="editedItem.language"
                        label="chet tillarni bilishi"
                    ></v-text-field>
                  </v-col>
                  <v-col

                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-select
                        persistent-hint
                        :items="floor"
                        item-text='name'
                        item-value='id'
                        v-model="editedItem.floor"
                        label="Jinsi"
                    ></v-select>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-text-field
                        counter
                        v-model="editedItem.seree"
                        label="sereasi"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-text-field
                        counter
                        v-model="editedItem.number"
                        label="raqami"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-menu
                        v-model="modal2"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="editedItem.dateEntry"
                            label="Qabul qilingan sanasi"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="editedItem.dateEntry"
                          @input="modal2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-text-field
                        counter
                        v-model="editedItem.whoGive2"
                        label="Kim tomonidan"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-menu
                        v-model="modal3"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="editedItem.birthDay"
                            label="Tug'ilgan sanasi"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="editedItem.birthDay"
                          @input="modal3 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-text-field
                        counter
                        v-model="editedItem.birthPlace"
                        label="Tugilgan joyi"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-select
                        :items="nationality"
                        item-text="name"
                        item-value="id"
                        v-model="editedItem.nationality"
                        label="Millati"
                        persistent-hint
                        single-line
                    ></v-select>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-text-field
                        counter
                        v-model="editedItem.registeredAllTime"
                        label="Doimiy yashash joyi"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-select
                        :items="region"
                        item-text="name"
                        item-value="id"
                        v-model="editedItem.region"
                        label="Viloyati"
                        persistent-hint
                        single-line
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="2"
                >
                    <v-select
                        :items="city"
                        item-text="name"
                        item-value="id"
                        v-model="editedItem.city"
                        label="Shahar"
                        persistent-hint
                        single-line
                    ></v-select>
                </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-select
                        :items="district"
                        item-text="name"
                        item-value="id"
                        v-model="editedItem.district"
                        label="Tuman"
                        persistent-hint
                        single-line
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="2"
                >
                  <v-text-field
                      outlined
                      v-model="editedItem.neighborhood"
                      label="mahallasi"
                  ></v-text-field>
                </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="2"
                >
                    <v-select
                        :items="educational"
                        item-text="name"
                        item-value="id"
                        v-model="editedItem.educational"
                        label="Ma'lumoti"
                        persistent-hint
                        single-line
                    ></v-select>
                </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="2"
                >
                  <v-text-field
                      outlined
                      counter
                      v-model="editedItem.institution"
                      label="Oliy bilim yurti"
                  ></v-text-field>
                </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="2"
                >
                  <v-text-field
                      counter
                      v-model="editedItem.specialty"
                      label="Mutahasisligi"
                  ></v-text-field>
                </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="2"
                >
                  <v-text-field
                      counter
                      v-model="editedItem.workPlace"
                      label="Ish joyi"
                  ></v-text-field>
                </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedItem.position"
                      label="Egalla turgan lavozimi"
                  ></v-text-field>
                </v-col>
                  <v-col
                    cols="8"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedItem.familySituation"
                      label="Oilaviy ahvoli"
                  ></v-text-field>
                </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedItem.conviction"
                      label="Conviction"
                  ></v-text-field>
                </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedItem.socialBackground"
                      label="Ijtimoiy kelib chiqishi"
                  ></v-text-field>
                </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.acceptance"
                        label="acceptance"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedItem.removed"
                      label="Qayta"
                  ></v-text-field>
                </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedItem.mukofot"
                      label="Mukofot"
                  ></v-text-field>
                </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedItem.injury"
                      label="Jarohatlari"
                  ></v-text-field>
                </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                  <v-text-field
                      v-model="editedItem.characters"
                      label="characters"
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
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-if="$store.state.role==='ADMIN'" v-slot:item.actions="{ item }" >
      <v-icon
          color="success"
          size="20px"
          @click="editItem(item,item.value)"
      >
        mdi-pen
      </v-icon>
      <v-icon
          size="20px"
          color="red"
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
    <v-col cols="12" md="6">
      <v-pagination
          v-model="page"
          :length="pageCount"
          @input="nextperson"
        >
      </v-pagination>
    </v-col>
    </v-col>
    <v-col cols="6" md="3">
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name:'personalforms',
  data: () => ({
    modal: false,
    modal2: false,
    modal3: false,
    loading: true,
    floor:[],
    region:[],
    city:[],
    district:[],
    nationality:[],
    educational:[],
    search: '',
    dialog: false,
    dialogDelete: false,
    token: 'Bearer ' + localStorage.getItem('token'),
    i:1,
    page: 1,
    totalPages:'',
    itemsPerPage: 10,
    perPageChoices: [
      {text:'5 records/page' , value: 5},
      {text:'10 records/page' , value: 10},
      {text:'20 records/page' , value: 20},
    ],

    headers: [
     {
          text: 'Id',
          align: 'start',
          sortable: true,
          value: 'id',
    },
      {
        text: 'Ismi',
        align: 'start',
        sortable: false,
        id: 'id',
        value: 'name',
      },
      { text: 'Familyasi', value: 'sureName'},
      { text: 'Otasining ismi', value: 'lastName' },
      { text: 'PNFL', value: 'pnfl' },
      { text: 'SerePassport', value: 'serePassport' },
      { text: 'NumberPassport', value: 'numberPassport' },
      { text: 'whoGive', value: 'whoGive' },
      { text: 'datePassport', value: 'datePassport' },
      { text: 'floor', value: 'floor.name' },
      { text: 'Seree', value: 'seree' },
      { text: 'number', value: 'number' },
      { text: 'DateEntry', value: 'dateEntry' },
      { text: 'whoGive2', value: 'whoGive2' },
      { text: 'BirthDay', value: 'birthDay' },
      { text: 'BirthPlace', value: 'birthPlace' },
      { text: 'Nationality', value: 'nationality.name' },
      { text: 'RegisteredAllTime', value: 'registeredAllTime' },
      { text: 'region', value: 'region.name' },
      { text: 'city', value: 'city.name' },
      { text: 'district', value: 'district.name' },
      { text: 'neighborhood', value: 'neighborhood' },
      { text: 'educational', value: 'educational.name' },
      { text: 'Institution', value: 'institution' },
      { text: 'Specialty', value: 'specialty' },
      { text: 'WorkPlace', value: 'workPlace' },
      { text: 'Position', value: 'position' },
      { text: 'FamilySituation', value: 'familySituation' },
      { text: 'Conviction', value: 'conviction' },
      { text: 'SocialBackground', value: 'socialBackground' },
      { text: 'removed', value: 'removed' },
      { text: 'Mukofot', value: 'mukofot' },
      { text: 'injury', value: 'injury' },
      { text: 'Characters', value: 'characters' },
      { text: 'photo', value: 'photo' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      sureName: '',
      lastName: '',
      pnfl: '',
      serePassport: '',
      numberPassport:'',
      whoGive:'',
      datePassport:'',
      language:'',
      floor:'',
      seree:'',
      number:'',
      dateEntry:'',
      whoGive2:'',
      birthDay:'',
      birthPlace:'',
      nationality:'',
      registeredAllTime:'',
      region:'',
      city:'',
      district:'',
      neighborhood:'',
      educational:'',
      institution:'',
      specialty:'',
      workPlace:'',
      position:'',
      familySituation:'',
      conviction:'',
      socialBackground:'',
      acceptance:'',
      removed:'',
      mukofot:'',
      injury:'',
      characters:'',
      photo:''
    },
    defaultItem: {
      name: '',
      region: '',
    },
  }),


  mounted: async function () {
    this.nextperson()
    console.log("mounted ishlayapti")
    const floorResponse = await axios.get('floor/get', {headers: { 'authorization': this.token }})
    const regionResponse = await axios.get('region/get', {headers: { 'authorization': this.token }})
    const cityResponse = await axios.get('city/get', {headers: { 'authorization': this.token }})
    const districtResponse = await axios.get('district/get', {headers: { 'authorization': this.token }})
    const nationalityResponse = await axios.get('nationality/get', {headers: { 'authorization': this.token }})
    const educationalResponse = await axios.get('educational/get', {headers: { 'authorization': this.token }})
    this.floor = floorResponse.data
    this.region = regionResponse.data
    this.city = cityResponse.data
    this.district = districtResponse.data
    this.nationality = nationalityResponse.data
    this.educational = educationalResponse.data


  },
  computed: {

    totalRecords() {
      return this.desserts.length
    },
    pageCount() {
      return this.totalPages
      // this.totalRecords / this.itemsPerPage
    },




    formTitle () {
      return this.editedIndex === -1 ? 'Yangi yaratish' : 'Shaxsning ma\'lumotlarini o\'zgartirish'
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
    async nextperson() {
      const response = await axios.get('personal/get', {
        params: {page: this.page-1,text:this.search},
        headers: {'authorization': this.token}
      })
      console.log(response)
      if (this.search!== '' && this.search.length > 3 && response.data.length!==0){
        console.log("ishadi")
        this.desserts=response.data
        // this.itemsPerPage = this.desserts.length
        this.totalPages = this.desserts.length
        this.loading=false
      }else {
        this.desserts = response.data.content
        this.totalPages = response.data.totalPages
        this.loading=false
      }
    },
       initialize() {
  },


    async editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
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
        console.log(this.editedItem.floor)
        if (this.editedItem.floor.name!==null){this.editedItem.floor = this.editedItem.floor.id}
        if (this.editedItem.region!==null){this.editedItem.region = this.editedItem.region.id}
        if (this.editedItem.district!==null){this.editedItem.district = this.editedItem.district.id}
        if (this.editedItem.city!==null){this.editedItem.city = this.editedItem.city.id}
        if (this.editedItem.educational!==''){this.editedItem.educational = this.editedItem.educational.id}
        if (this.editedItem.nationality!==''){this.editedItem.nationality = this.editedItem.nationality.id}
        console.log(this.editedItem)

        const response = await axios.put('personal/edit/'+this.editedItem.id,  this.editedItem, {headers: {'authorization': this.token}})
       Object.assign(this.desserts[this.editedIndex], this.editedItem)
        console.log(response)
      }


      else {
       await axios.post('personal/add',  this.editedItem, {headers: {'authorization': this.token}})
       this.desserts.push(this.editedItem)
      }
       this.close()
    },
  },
}
</script>