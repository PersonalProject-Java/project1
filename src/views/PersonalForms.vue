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
              :items="ordersWithIndex"
              :items-per-page="itemsPerPage"
              item-key="desserts.index"
              single-expand
              class="elevation-1"
              :hide-default-footer="true"
              :loading="loading"
              id="my-table"
            >

<!--              <template v-slot:item.row="{item, index}">-->
<!--                  {{ (this.page-1)*limit + index +1 }}-->
<!--              </template>-->

              <template v-slot:top>
               <v-toolbar
                    color="#6F92AA"
                    outlined
               >
              <v-toolbar-title>Shaxslar : {{totalElement}}</v-toolbar-title>
                 <br>
                 <v-btn
                     class="ml-2"
                     @click="exportDessertsToExcel(page)"
                 >
                   Export to Excel
                 </v-btn>
<!--                 <v-btn-->
<!--                     class="ml-2"-->
<!--                     @click="generatePDF"-->
<!--                 >-->
<!--                   Export to PDF-->
<!--                 </v-btn>-->
                 <vue-html-to-paper
                     ref="print"
                     content="#my-table"
                     page-size="A4"
                     :show-header="true"
                     :print-delay="500"
                 />

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
                   Yaratish
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
                        counter
                        clearable
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
                        autofocus
                        counter
                        success
                        v-model="editedItem.name"
                        clearable
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
                        clearable
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
                        clearable
                        counter
                        validate-on-blur
                        v-model="editedItem.pnfl"
                        label="PNFL"
                        v-mask="'##############'"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-text-field
                        clearable

                        counter
                        type="text"
                        v-model="editedItem.serePassport"
                        return-masked-value
                        label="Passport sereasi"
                        uppercase="true"
                        v-mask="'AA'"
                        @input="editedItem.serePassport= editedItem.serePassport.toUpperCase()"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="2"
                  >
                    <v-text-field
                        clearable
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
                        clearable
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
                            clearable
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
                        clearable
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
                        clearable
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
                        clearable
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
                        clearable
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
                            clearable
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
                        clearable
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
                            clearable
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
                        clearable
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
                        clearable
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
                        clearable
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
                        clearable
                        :items="region"
                        item-text="name"
                        item-value="id"
                        v-model="editedItem.region"
                        label="Viloyati"
                        @change="sorted"
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
                        clearable
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
                        clearable
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
                      clearable
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
                        clearable
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
                      clearable
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
                      clearable
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
                      clearable
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
                      clearable
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
                      clearable
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
                      clearable
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
                      clearable
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
                        clearable
                        v-model="editedItem.acceptance"
                        label="acceptance"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                >
                  <v-text-field
                      clearable
                      v-model="editedItem.removed"
                      label="Qayta"
                  ></v-text-field>
                </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                >
                  <v-text-field
                      clearable
                      v-model="editedItem.mukofot"
                      label="Mukofot"
                  ></v-text-field>
                </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                >
                  <v-text-field
                      clearable
                      v-model="editedItem.injury"
                      label="Jarohatlari"
                  ></v-text-field>
                </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                >
                  <v-text-field
                      clearable
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
                Yopish
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
            <v-card-title class="text-h5">Siz rostan ham ushbu ma'lumotni o'chirshga rozimisiz ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Yopish</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Roziman</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
               <v-dialog v-model="view" persistent>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">Shaxsning ma'lumotlari</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <div class="view">
                          <v-row>
                            <v-col cols="12" sm="6" md="2">
                              <label>Ismi</label>
                              <li>{{editedItem.name}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            ><label>Otasining ismi</label>
                            <li>{{editedItem.lastName}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                        <label>Familyasi</label>
                              <li>{{editedItem.sureName}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                          <label>PNFL</label>
                              <li>{{editedItem.pnfl}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                            <label>Passport sereasi</label>
                              <li>{{editedItem.serePassport}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                          <label>Passport raqami</label>
                              <li>{{editedItem.numberPassport}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                            <label>Kim tomonidan berilgan</label>
                              <li>{{editedItem.whoGive}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                              <label>Berilgan sanasi</label>
                              <li>{{editedItem.datePassport}}</li>


                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                             <label>Chet tillarini bilishi</label>
                              <li>{{editedItem.language}}</li>
                            </v-col>
                            <v-col

                                cols="12"
                                sm="6"
                                md="2"
                            >
                            <label>Jinsi</label>

                              <li v-if="editedItem.floor">{{editedItem.floor.name}}</li>

                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                              <label>Sereasi</label>
                              <li>{{editedItem.seree}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                             <label>Raqami</label>
                              <li>{{editedItem.number}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                              <label>Qabul qilingan sanasi</label>
                              <li>{{editedItem.dateEntry}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                             <label>Kim tomonidan berilgan</label>
                              <li>{{editedItem.whoGive2}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                              <label>Tug'ilgan sanasi</label>
                              <li>{{editedItem.birthDay}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                              <label>Tug'ilgan joyi</label>
                              <li>{{editedItem.birthPlace}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                             <label>Millati</label>
                              <li v-if="editedItem.nationality">{{editedItem.nationality.name}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                             <label>Doimiy yashash joyi</label>
                              <li>{{editedItem.registeredAllTime}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                              <label>Viloyati</label>
                              <li v-if="editedItem.region">{{editedItem.region.name}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                            <label>Shahar</label>
                              <li v-if="editedItem.city">{{editedItem.city.name}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                             <label>Tuman</label>
                              <li v-if="editedItem.district">{{editedItem.district.name}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                              <label>Mahallasi</label>
                              <li>{{editedItem.neighborhood}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                              <label>Ma'lumoti</label>
                              <li v-if="editedItem.educational">{{editedItem.educational.name}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                            <label>Bilim yurti</label>
                              <li>{{editedItem.institution}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                              <label>Mutahasisligi</label>
                              <li>{{editedItem.specialty}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="2"
                            >
                             <label>Ish joyi</label>
                              <li>{{editedItem.workPlace}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                             <label>Egallab turgan lavozimi</label>
                              <li>{{editedItem.position}}</li>
                            </v-col>
                            <v-col
                                cols="8"
                                sm="6"
                                md="4"
                            >
                             <label>Oilaviy ahvoli</label>
                              <li>{{editedItem.familySituation}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                             <label>Sudlanganligi</label>
                              <li>{{editedItem.conviction}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                             <label>Ijtimoiy kelib chiqishi</label>
                              <li>{{editedItem.socialBackground}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                             <label>Qabul qilingan</label>
                              <li>{{editedItem.acceptance}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <label>Hisobdan chiqarilgan</label>
                              <li>{{editedItem.removed}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <label>Mukofotlari</label>
                              <li>{{editedItem.mukofot}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                            <label>Jarohatlari</label>
                              <li>{{editedItem.injury}}</li>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <label>Belgilari</label>
                              <li>{{editedItem.characters}}</li>
                            </v-col>
                          </v-row>
                          </div>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="close"
                        >
                          Yopish
                        </v-btn>
                </v-card-actions>
                    </v-card>
                  </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }" >
      <div style="width: 50px">
      <v-icon
          color="primary"
          size="17px"
          @click="viewItem(item)"
      >
        mdi-eye
      </v-icon>
      <v-icon
          color="success"
          size="17px"
          @click="editItem(item)"
      >
        mdi-pen
      </v-icon>
      <v-icon
          size="16px"
          color="red"
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
      </div>
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
import XLSX from 'xlsx';
import { utils } from 'xlsx';
import jsPDF from 'jspdf'

export default {
  name:'personalforms',
  components:{
  },
  data: () => ({



    deleteId:'',
    totalElement:'',
    modal: false,
    modal2: false,
    modal3: false,
    loading: true,
    floor:[],
    region:'',
    city:[],
    district:[],
    nationality:[],
    educational:[],
    search: '',
    dialog: false,
    dialogDelete: false,
    view: false,
    token: 'Bearer ' + sessionStorage.getItem('token'),
    i:1,
    page: 1,
    totalPages:0,
    itemsPerPage: 10,
    perPageChoices: [
      {text:'5 records/page' , value: 5},
      {text:'10 records/page' , value: 10},
      {text:'20 records/page' , value: 20},
    ],

    headers: [
     {
          text: 'T/R',
          align: 'start',
          sortable: true,
          value: 'index',
    },
      { text: 'Familyasi', value: 'sureName'},
      {text: 'Ismi', align: 'start',sortable: false,id: 'id',value: 'name',},
      { text: 'Otasining ismi', value: 'lastName' },
      { text: 'PNFL', value: 'pnfl' },
      { text: 'SerePassport', value: 'serePassport' },
      { text: 'NumberPassport', value: 'numberPassport' },
      // { text: 'floor', value: 'floor.name' },
      { text: 'Nationality', value: 'nationality.name' },
      { text: 'region', value: 'region.name' },
      { text: 'city', value: 'city.name' },
      { text: 'district', value: 'district.name' },
/*    { text: 'Seree', value: 'seree' },
      { text: 'number', value: 'number' },
      { text: 'DateEntry', value: 'dateEntry' },
      { text: 'whoGive', value: 'whoGive' },
      { text: 'datePassport', value: 'datePassport' },
      { text: 'whoGive2', value: 'whoGive2' },
      { text: 'BirthDay', value: 'birthDay' },
      { text: 'BirthPlace', value: 'birthPlace' },
      { text: 'RegisteredAllTime', value: 'registeredAllTime' },
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
      { text: 'photo', value: 'photo' },*/
      { text: 'Jarayon', value: 'actions', sortable: false },
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
      floor:[],
      seree:'',
      number:'',
      dateEntry:'',
      whoGive2:'',
      birthDay:'',
      birthPlace:'',
      nationality:[],
      registeredAllTime:'',
      region:[],
      city:[],
      district:[],
      neighborhood:'',
      educational:[],
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
    this.sorted()
    const floorResponse = await axios.get('floor/get', {headers: { 'authorization': this.token }})
    const regionResponse = await axios.get('region/get/'+this.$store.state.regionid, {headers: { 'authorization': this.token }})
    const nationalityResponse = await axios.get('nationality/get', {headers: { 'authorization': this.token }})


    const educationalResponse = await axios.get('educational/get', {headers: { 'authorization': this.token }})
    this.floor = floorResponse.data
    this.region = regionResponse.data



    this.nationality = nationalityResponse.data
    this.educational = educationalResponse.data

  },
  computed: {

    ordersWithIndex(){
      return this.desserts.map(
          (items, index) => ({
            ...items,
            index: (this.page-1)*10 + index + 1
          }))
    },


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
    '$route.query.page': {
      handler() {
        this.nextperson();
      },
      immediate: true
    }
  },
  created () {
    this.initialize()
  },

  methods: {
    //
    // generatePDF() {
    //   const doc = new jsPDF();
    //   const htmlContent = document.querySelector('#my-table');
    //   doc.autoTable({
    //     html: htmlContent
    //   });
    //   doc.save('my-table.pdf');
    // },


    exportDessertsToExcel(page) {
      let count=(page-1)*10 + 1;
      const excelData =this.desserts.map(disserts=>({
        "№":count++,
        Familyasi: disserts.sureName,
        Ismi: disserts.name,
        OtasiningIsmi:disserts.lastName,
        PNFL: disserts.pnfl,
        SereePassport: disserts.serePassport,
        Passport_raqami: disserts.numberPassport,
        Viloyati: disserts.region ? disserts.region.name : null,
        Tumani: disserts.district ? disserts.district.name : null,
        Shahar: disserts.city ? disserts.city.name : null,
        Millati: disserts.nationality ? disserts.nationality.name : null,
      }))
     this.exportToExcel(excelData, 'Desserts');
    },
    exportToExcel(data, filename) {
      const worksheet = utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, filename + '.xlsx');
    },


    async nextperson() {
      const response = await axios.get('personal/get', {
        params: {page: this.page-1,text:this.search},
        headers: {'authorization': this.token}
      })
      this.totalElement = response.data.totalElements
      if (this.search!== '' && this.search.length > 3 && response.data.length!==0){
        this.desserts=response.data.content
        this.totalPages = response.data.totalPages
        this.loading=false
      }else {
        this.desserts = response.data.content
        this.totalPages = response.data.totalPages
        this.loading=false
            }
    },

    initialize() {},

    async sorted() {
            const districtResponse = await axios.get('district/get/'+this.editedItem.region, {headers: {'authorization': this.token}})
            const cityResponse = await axios.get('city/get/'+this.editedItem.region, {headers: { 'authorization': this.token }})
            this.district = districtResponse.data
            this.city = cityResponse.data
          },

    editItem(item) {
      this.desserts.push(item)
       this.editedIndex = this.desserts.indexOf(item)
       this.editedItem = Object.assign({}, item)
       this.dialog = true
     },

    viewItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.view = true
    },

    deleteItem (item) {
      this.deleteId = item.id
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const districtResponse = await axios.delete('personal/delete/'+this.deleteId, {headers: {'authorization': this.token}})
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.view=false
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
        console.log('edit page')
        if (isNaN(this.editedItem.floor)){this.editedItem.floor = this.editedItem.floor.id}
        if (isNaN(this.editedItem.region)){this.editedItem.region = this.editedItem.region.id}
        if (isNaN(this.editedItem.district)){this.editedItem.district = this.editedItem.district.id}
        if (isNaN(this.editedItem.city)){this.editedItem.city = this.editedItem.city.id}
        if (isNaN(this.editedItem.educational)){this.editedItem.educational = this.editedItem.educational.id}
        if (isNaN(this.editedItem.nationality)){this.editedItem.nationality = this.editedItem.nationality.id}
        console.log(this.editedItem)
        await axios.put('personal/edit/'+this.editedItem.id,  this.editedItem, {headers: {'authorization': this.token}})
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        this.close()
        this.nextperson()
       }
       else{
        console.log(this.editedItem.pnfl.length)
         if (this.editedItem.pnfl.length<14){
           alert("Siz ma'lumotlarni to'ldirmadingiz")
         }else {
       await axios.post('personal/add', this.editedItem, {headers: {'authorization': this.token}})
       this.desserts.push(this.editedItem)
        this.close()
      }
    }

    },
  },
}
</script>
<style>
.view li{
  height: 30px;
  font-size: 15px;
  text-align: center;
  justify-content: center;
  border-radius: 3px;
  background-color: darkgray;
  color: white;
  border: 1px solid darkgray;
  list-style: none;

}
label{
  color: black;
}
</style>

