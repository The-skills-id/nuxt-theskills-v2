<template>
  <v-app>
    <div v-show="loading" class="mt-6 text-center">
      <v-progress-circular indeterminate color="purple"></v-progress-circular>
    </div>
    <v-container v-show="!loading" grid-list-md>
      <v-row dense>
        <v-col cols="12">
          <v-breadcrumbs :items="items"></v-breadcrumbs>
          <v-card color="#385F73" dark>
            <v-card-title class="headline"
              >Course untuk {{ subcourses.course_name }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <div class="mt-6 title">
        Deskripsi Materi {{ subcourses.course_name }}
      </div>
      <v-row class="ml-3 mt-3" v-html="subcourses.description"></v-row>
      <div class="mt-6 title">Daftar Materi {{ subcourses.course_name }}</div>
      <v-row class="mt-6" justify="center">
        <v-expansion-panels accordion>
          <v-expansion-panel
            v-for="(item, i) in subcourses.subcourses"
            :key="i"
          >
            <v-expansion-panel-header class="text-weight-bold">{{
              item.subcourse_name
            }}</v-expansion-panel-header>
            <v-expansion-panel-content
              v-for="(itemm, index) in item.minicourse"
              :key="index"
              class="caption"
            >
              <v-icon left> letter-b-box </v-icon>
              {{ itemm.minicourse_name }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
/* import { mapActions, mapGetters } from 'vuex' */

export default {
  data: () => ({
    baseUrl: 'http://onlyadmin.the-skills.id/api/v2/storage/',
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
