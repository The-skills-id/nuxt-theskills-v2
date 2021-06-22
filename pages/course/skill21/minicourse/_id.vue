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
        <h1 v-text="'Video dan Materi ' + cdetail.minicourse_name"></h1>
        <v-row>
          <v-col cols="12" cla>
            <v-tabs vertical>
              <v-tab
                v-for="(i, index) in detail"
                :key="index"
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
                    <v-tabs v-model="tab" class="mt-3" centered>
                      <v-tab href="#deskripsi"> Deskripsi </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                      <v-tab-item :value="'deskripsi'">
                        <p class="font-weight-normal">{{ i.description }}</p>
                      </v-tab-item>
                    </v-tabs-items>
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
          <v-col> </v-col>
        </v-row>
      </div>

      <!-- mobile -->
      <div v-if="!loading && $vuetify.breakpoint.smAndDown">
        <h1 v-text="'Video dan Materi ' + cdetail.minicourse_name"></h1>
        <v-row>
          <v-col class="text-center" cols="12" md="6">
            <vue-plyr v-if="cdetail.link_video != '-'" class="player">
              <div class="plyr__video-embed">
                <iframe
                  :src="cdetail.link_video"
                  allowfullscreen
                  allowtransparency
                >
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

        <v-tabs v-model="tab" class="mt-3" centered>
          <v-tab href="#deskripsi"> Deskripsi </v-tab>
          <!-- <v-tab href="#jadwal">
                  Jadwal Kegiatan
              </v-tab> -->
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :value="'deskripsi'">
            <p class="font-weight-normal">{{ cdetail.description }}</p>
          </v-tab-item>
        </v-tabs-items>
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
    baseUrl: 'https://sapi.the-skills.id/api/v2/storage/',
    detail: [],
    loading: true,
    tab: null,
    cdetail: [],
    items: [{}],
  }),
  computed: {
    ...mapGetters({
      csidebarMateriItem: 'csidebarMateriItem',
    }),
  },
  created() {
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
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    tabClick(index) {
      this.cdetail = this.detail[index]
    },
    ...mapActions({
      setsidebarMateriItem: 'setsidebarMateriItem',
      setcsidebarMateriItem: 'setcsidebarMateriItem',
    }),
  },
}
</script>
