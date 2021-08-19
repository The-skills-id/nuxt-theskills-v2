<template>
  <v-app>
    <div v-show="loading" class="mt-6 text-center">
      <v-progress-circular indeterminate color="purple"></v-progress-circular>
    </div>
    <v-container v-show="!loading" grid-list-md>
      <v-row dense>
        <v-col cols="12">
          <v-breadcrumbs :items="items"></v-breadcrumbs>
          <v-card color="#ffffff" flat>
            <v-card-title class="headline"
              >Course untuk {{ subcourses.course_name }}
            </v-card-title>
            <v-card-subtitle>
              Belajar di Komunitas {{ subcourses.course_name }} bersama
              TheSkills dengan cara yang menyenangkan
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col
          v-for="(sc, index) in subcourses.subcourses"
          :key="index"
          cols="12"
          md="4"
        >
          <v-card color="pink" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="sc.subcourse_name"
                ></v-card-title>
                <v-card-actions>
                  <nuxt-link :to="'/course/skill21/minicourse/' + sc.id">
                    <v-btn class="ml-2 mt-5" outlined rounded small>
                      Mulai belajar
                    </v-btn>
                  </nuxt-link>
                </v-card-actions>
              </div>

              <v-avatar class="ma-3" size="125" tile>
                <v-img></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
/* import { mapActions, mapGetters } from 'vuex' */

export default {
  data: () => ({
    baseUrl: 'http://sapi.the-skills.id/api/v2/storage/',
    subcourses: [],
    loading: true,
    items: [
      {
        text: 'Beranda',
        disabled: false,
        href: '/',
      },
      {
        text: 'Fondasi Skill 21',
        disabled: false,
        href: '/Skill21',
      },
    ],
  }),
  /* computed: {
    ...mapGetters({
      user: 'auth/user',
      guest: 'auth/guest',
    }),
  }, */
  created() {
    this.$axios
      .get(encodeURI('/api/v2/subcourse/' + this.$route.params.id))
      .then((response) => {
        this.subcourses = response.data

        this.items.push({
          text: response.data.course_name,
          disabled: true,
        })
        this.loading = false
      })
      .catch((error) => {
        return error
        /* this.setAlert({
          status: true,
          text: 'Gagal memuat Data ' + error,
          type: 'warning',
        }) */
      })
  },
}
/* methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
  }, */
</script>
