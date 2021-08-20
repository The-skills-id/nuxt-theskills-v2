<template>
  <v-app>
    <v-container grid-list-md>
      <v-row dense>
        <v-col cols="12">
          <v-breadcrumbs :items="items"></v-breadcrumbs>
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Artikel</v-card-title>

            <v-card-subtitle
              >Artikel tentang merdeka belajar, anak dan
              parenting</v-card-subtitle
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
        <v-col v-for="(c, index) in classes" :key="index" cols="12" md="3">
          <v-card
            class="mx-auto"
            color="white"
            elevation="3"
            outlined
            :to="'/articles/' + c.id"
          >
            <!--  :to="'/course/fondasipokok/' + c.id" -->
            <v-img lazy-src="/loader.svg"></v-img>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="body-2 mb-1 text-wrap"
                  v-text="c.article_title"
                ></v-list-item-title>
                <v-list-item-subtitle class="subtitle text-wrap">
                  <p class="caption" v-text="c.created_at"></p>
                  <p class="wrap-content-article caption">
                    {{ c.content.substring(0, 100) }}
                  </p>
                  <p>Baca selengkapnya...</p>
                </v-list-item-subtitle>
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
        text: 'Artikel',
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
      .get('/api/v2/articles')
      .then((response) => {
        this.classes = response.data.data
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

<style>
.wrap-content-article > * {
  font-size: 0.75rem;
  letter-spacing: 0.0333333333em;
  font-weight: 400;
}
</style>
