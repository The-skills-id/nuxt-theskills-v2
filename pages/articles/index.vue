<template>
  <v-app>
    <v-container grid-list-md>
      <v-row dense>
        <v-col cols="12">
          <!-- <v-breadcrumbs :items="items"></v-breadcrumbs> -->
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Artikel</v-card-title>

            <v-card-subtitle
              >Artikel terbaru tentang pendidikan merdeka
              belajar</v-card-subtitle
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col v-for="(c, index) in article" :key="index" cols="12" md="4">
          <v-card class="mx-auto" color="white" elevation="3" outlined>
            <v-img :src="'/img/course/' + c.flyer"></v-img>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="headline mb-1 text-wrap"
                  v-text="c.title"
                ></v-list-item-title>
                <v-list-item-subtitle class="subtitle" v-text="c.description">
                </v-list-item-subtitle>
                <!-- <v-list-item-title class="text-wrap text-white" v-text="(c.price == 0) ? 'GRATIS' : c.price"></v-list-item-subtitle> -->
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-btn
                class="ml-2 text-capitalize"
                color="amber darken-1"
                small
                rounded
                dark
                :to="'/articles/' + c.slug"
                >Lebih lengkap ...</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
  data: () => ({
    classes: [
      /*  {name : "Webinar Artificial Inteligence",slug : 'asesmen-diagnostik-awal',img : 'webinarAI.png'},
      {name : "Webinar Abad 21",slug : 'numerasi',img : 'webinarabad21.png'}, */
    ],
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
    }),
  },
  /* created() {
    this.axios
      .get('/api/v2/webinar')
      .then((response) => {
        this.classes = response.data
      })
      .catch((error) => {
        // eslint-disable-next-line no-undef
        alert(error)
      })
  }, */
  methods: {
    daftarwebinar() {
      if (this.guest) {
        this.$router.push({ name: 'login' })
      }
    },
  },
}
</script>
