<template>
  <v-app v-if="detail.length != 0">
    <v-container fluid>
      <div v-if="loading" class="text-center">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="purple"
        ></v-progress-circular>
      </div>
      <!-- <v-breadcrumbs :items="items">
        </v-breadcrumbs> -->
      <!-- desktop -->
      <div v-if="!loading && $vuetify.breakpoint.mdAndUp">
        <h3 v-text="'Materi ' + cdetail.minicourse_name"></h3>
        <v-row class="mt-6">
          <v-col cols="12">
            <v-tabs v-model="currentTab" vertical>
              <v-tab
                v-for="(i, index) in detail"
                :key="index"
                class="text-capitalize"
                @click="tabClick(index)"
              >
                {{ i.minicourse_name }}
              </v-tab>
              <v-tab-item v-for="(i, index) in detail" :key="index">
                <v-row justify="center">
                  <v-col cols="8">
                    <vue-plyr v-if="i.link_video != '-'" class="player">
                      <div class="plyr__video-embed">
                        <iframe
                          :src="i.link_video"
                          allowfullscreen
                          allowtransparency
                        >
                        </iframe>
                      </div>
                    </vue-plyr>
                    <v-img
                      v-if="cdetail.mc_thumbnail != '-'"
                      max-width="300px"
                      class="mt-6"
                      :src="baseUrl + cdetail.mc_thumbnail.replace('.', '_')"
                      contain
                    ></v-img>
                    <!-- <v-tabs v-model="tab" class="mt-3" centered>
                      <v-tab href="#deskripsi"> Deskripsi </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                      <v-tab-item :value="'deskripsi'">
                        <p
                          class="font-weight-normal"
                          v-html="i.description"
                        ></p>
                      </v-tab-item>
                    </v-tabs-items> -->
                  </v-col>
                  <v-col cols="4">
                    <v-simple-table>
                      <tbody>
                        <tr>
                          <td class="font-weight-bold">Judul :</td>
                          <td v-text="cdetail.minicourse_name"></td>
                        </tr>

                        <v-btn
                          v-if="cdetail.link_doc != '-'"
                          :href="cdetail.link_doc"
                          class="mt-3"
                          small
                          dark
                          >Download Worksheet</v-btn
                        >
                      </tbody>
                    </v-simple-table>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs>
          </v-col>
          <v-col>
            <v-tabs v-model="tab" class="mt-3" centered>
              <v-tab href="#jadwal"> Jadwal Kegiatan </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <!-- <v-tab-item :value="'deskripsi'">
              <v-container class="mt-6">
                <p class="font-weight-normal" v-html="cdetail.description"></p>
              </v-container>
            </v-tab-item> -->
              <v-tab-item :value="'jadwal'">
                <v-container class="mt-6">
                  <v-col>
                    <v-simple-table class="mb-6">
                      <thead>
                        <tr>
                          <th>Tanggal</th>
                          <th>Link Conference</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(schedule, index) in schedules" :key="index">
                          <td>{{ schedule.date }}</td>
                          <td>
                            <v-btn
                              :href="schedule.link"
                              target="blank"
                              class="mt-3 text-capitalize"
                              small
                              dark
                              >Join zoom</v-btn
                            >
                          </td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-col>
                </v-container>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </div>

      <!-- mobile -->
      <div v-if="!loading && $vuetify.breakpoint.smAndDown">
        <h1 v-text="'Video dan Materi ' + cdetail.minicourse_name"></h1>
        <v-row>
          <v-col class="text-center" cols="12" md="6">
            <div
              v-for="(i, index) in detail"
              :key="index"
              :style="'display:' + (cdetail.id == i.id ? 'block' : 'none')"
            >
              <vue-plyr v-if="cdetail.link_video != '-'" class="player">
                <div class="plyr__video-embed">
                  <iframe :src="i.link_video" allowfullscreen allowtransparency>
                  </iframe>
                </div>
              </vue-plyr>
              <v-img
                v-if="cdetail.mc_thumbnail != '-'"
                max-width="500px"
                class="mt-6"
                :src="baseUrl + cdetail.mc_thumbnail.replace('.', '_')"
                contain
              ></v-img>
            </div>
          </v-col>
          <v-col>
            <v-simple-table>
              <tbody>
                <tr>
                  <td class="font-weight-bold">Judul :</td>
                  <td v-text="cdetail.minicourse_name"></td>
                </tr>

                <!-- <v-btn class="mt-3" small dark>Download Worksheet</v-btn>        -->
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>

        <p class="text-center mt-6 font-weight-bold">Bahan belajar</p>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="(i, index) in detail"
              :key="index"
              @click="tabClick(index)"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-text="i.minicourse_name"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-col>
          <v-tabs v-model="tab" class="mt-3" centered>
            <!-- <v-tab href="#deskripsi"> Deskripsi </v-tab> -->
            <v-tab href="#jadwal"> Jadwal Kegiatan </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <!-- <v-tab-item :value="'deskripsi'">
              <v-container class="mt-6">
                <p class="font-weight-normal" v-html="cdetail.description"></p>
              </v-container>
            </v-tab-item> -->
            <v-tab-item :value="'jadwal'">
              <v-container class="mt-6">
                <v-col>
                  <v-simple-table class="mb-6">
                    <thead>
                      <tr>
                        <th>Tanggal</th>
                        <th>Link Conference</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(schedule, index) in schedules" :key="index">
                        <td>{{ schedule.date }}</td>
                        <td>
                          <v-btn
                            :href="schedule.link"
                            target="blank"
                            class="mt-3 text-capitalize"
                            small
                            dark
                            >Join zoom</v-btn
                          >
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-col>
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </div>
      <!-- <tombol-lihat-materi /> -->
    </v-container>
  </v-app>
</template>

<script>
/* import TombolLihatMateri from '@/components/TombolLihatMateri' */
import { mapActions, mapGetters } from 'vuex'

export default {
  /* components: {
    TombolLihatMateri,
  }, */
  data: () => ({
    baseUrl: 'http://onlyadmin.the-skills.id/api/v2/storage/',
    detail: [],
    loading: true,
    tab: null,
    cdetail: [],
    schedules: [],
    items: [{}],
    currentTab: 0,
  }),
  computed: {
    ...mapGetters({
      csidebarMateriItem: 'csidebarMateriItem',
    }),
  },
  created() {
    this.$axios
      .get(encodeURI('/api/v2/subcourse/schedule/' + this.$route.params.id))
      .then((response) => {
        this.schedules = response.data.schedules
      })
      .catch((err) => {
        console.log(err)
      })
    this.$axios
      .get(encodeURI('/api/v2/minicourse/' + this.$route.params.id))
      .then((response) => {
        /** this.setcsidebarMateriItem(null)
                      this.setsidebarMateriItem(response.data)
                      if(this.csidebarMateriItem == null){
                          this.setcsidebarMateriItem(response.data[0])
                      }**/
        this.detail = response.data
        this.cdetail = response.data[0]
        this.loading = false
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    tabClick(index) {
      this.$forceUpdate()
      this.cdetail = this.detail[index]
    },
    ...mapActions({
      setsidebarMateriItem: 'setsidebarMateriItem',
      setcsidebarMateriItem: 'setcsidebarMateriItem',
    }),
  },
}
</script>
