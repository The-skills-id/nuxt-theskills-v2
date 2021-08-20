<template>
  <v-app>
    <v-container grid-list-md>
      <v-row dense>
        <v-col cols="12">
          <v-breadcrumbs :items="items"></v-breadcrumbs>
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Materi untuk Orangtua</v-card-title>

            <v-card-subtitle>Webinar dan materi untuk orangtua</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row v-if="loading">
        <v-col v-for="i in 3" :key="i" cols="12" md="4">
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col v-for="(c, index) in classes" :key="index" cols="12" md="3">
          <v-card class="mx-auto" color="white" elevation="3" outlined>
            <!--  :to="'/course/fondasipokok/' + c.id" -->
            <v-img
              lazy-src="/loader.svg"
              :src="baseUrl + c.flyer.replace('.', '_')"
            ></v-img>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="subtitle mb-1"
                  v-text="c.webinar_name"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-card-text>
              <v-chip-group>
                <v-chip
                  color="green"
                  dark
                  v-text="c.price == 0 ? 'GRATIS' : 'Rp. ' + c.price"
                >
                </v-chip>

                <v-chip
                  v-show="c.status == 'off' || c.status == 'selesai'"
                  class="ml-2"
                  :color="c.status == 'off' ? 'red' : 'orange'"
                  dark
                  v-text="c.status == 'off' ? 'Belum Dibuka' : 'Sudah Selesai'"
                >
                </v-chip>
              </v-chip-group>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-show="c.status == 'on'"
                class="ml-2"
                small
                rounded
                dark
                @click="daftarwebinar(c.id)"
                >Daftar Sekarang</v-btn
              >

              <!-- <nuxt-link
                v-show="c.status == 'selesai'"
                :to="'/course/orangtua/record/' + c.id"
              >
                <v-btn
                  class="text-capitalize"
                  rounded
                  small
                  dark
                  v-text="'Rekaman Webinar'"
                ></v-btn>
              </nuxt-link> -->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    baseUrl: 'http://onlyadmin.the-skills.id/api/v2/storage/',
    loading: true,
    imgLoad: false,
    classes: [],
    items: [
      {
        text: 'Beranda',
        disabled: false,
        href: '/',
      },
      {
        text: 'Orangtua',
        disabled: true,
      },
    ],
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
    }),
  },
  created() {
    this.$axios
      .get('/api/v2/webinar')
      .then((response) => {
        this.classes = response.data
        this.loading = !this.loading
      })
      .catch((error) => {
        this.setAlert({
          status: true,
          text: 'Gagal mengambil data webinar... Coba lagi ' + error,
          type: 'error',
        })
      })
  },
  methods: {
    daftarwebinar(webinarId) {
      if (this.guest) {
        this.$router.push('/auth/login')
      } else {
        const data = new FormData()
        data.set('user_id', this.user.user.id)
        data.set('webinar_id', webinarId)
        this.$swal({
          text: 'Lanjutkan untuk mendaftar di webinar ini',
          icon: 'question',
          showCancelButton: true,
          showConfirmButton: true,
          showCloseButton: true,
        }).then((response) => {
          this.$axios
            .post('/api/v2/webinar/register', data)
            .then((response) => {
              this.$swal({
                text: response.data.message,
              })
            })
            .catch((err) => {
              this.setAlert({
                status: true,
                text: 'Gagal mendaftar webinar... Coba lagi ' + err,
                type: 'error',
              })
            })
        })
      }
    },
    ...mapActions({
      setAlert: 'alert/set',
    }),
  },
}
</script>
