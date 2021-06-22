<template>
  <v-app>
    <v-container grid-list-md>
      <v-row dense>
        <v-col cols="12">
          <v-breadcrumbs :items="items"></v-breadcrumbs>
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Materi Fondasi Pokok</v-card-title>

            <v-card-subtitle
              >Dapatkan semua course di katerogi ini secara gratis setelah anda
              melakukan pembelian course skill abad 21</v-card-subtitle
            >
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
      <v-row v-if="!loading">
        <v-col v-for="(c, index) in classes" :key="index" cols="12" md="4">
          <v-card class="mx-auto" color="white" elevation="3" outlined>
            <!--  :to="'/course/fondasipokok/' + c.id" -->
            <v-img
              lazy-src="/loader.svg"
              :src="baseUrl + c.crs_thumbnail.replace('.', '_')"
            ></v-img>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="headline mb-1 text-wrap"
                  v-text="'Pondasi pokok : ' + c.course_name"
                ></v-list-item-title>
                <v-list-item-subtitle class="subtitle text-wrap">
                  Harga : {{ c.price == 0 ? 'Gratis' : 'Rp. ' + c.price }} *
                </v-list-item-subtitle>
                <p class="caption">*Setelah pembelian course skill abad 21</p>
                <v-list-item-subtitle v-text="''"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-card-actions>
              <v-btn
                color="green"
                class="ml-2"
                small
                rounded
                dark
                @click="preorder"
                >Pre-Order Kelas</v-btn
              >
            </v-card-actions> -->
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
    baseUrl: 'https://sapi.the-skills.id/api/v2/storage/',
    classes: [],
    loading: true,
    items: [
      {
        text: 'Beranda',
        disabled: false,
        href: '/',
      },
      {
        text: 'Fondasi pokok',
        disabled: true,
      },
    ],
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      guest: 'auth/guest',
    }),
  },
  created() {
    this.$axios
      .get('/api/v2/course/pondasi-pokok')
      .then((response) => {
        this.classes = response.data[0].courses
        this.loading = !this.loading
      })
      .catch((err) => {
        this.setAlert({
          status: true,
          text: 'Gagal mengambil data materi, Coba lagi ' + err,
          type: 'error',
        })
      })
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
    preorder() {
      if (this.guest) {
        this.$router.push('/auth/login')
      } else {
        // simpan database
      }
    },
  },
}
</script>
