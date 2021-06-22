<template>
  <v-app>
    <v-container grid-list-md>
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
    </v-container>
    <v-container>
      <v-row>
        <!-- <div>
          <h1>Deskripsi</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            quisquam enim aut suscipit, ipsum accusantium atque nostrum.
            Deleniti laudantium id dolore alias veniam quo error tenetur libero
            vel. Eos, eveniet?
          </p>
          <p><b>Buka course untuk melihat materi lebih banyak..</b></p>
          <v-btn>Buka Course</v-btn>
        </div> -->
        <v-col
          v-for="(c, index) in subcourses.subcourses"
          :key="index"
          cols="12"
          md="4"
        >
          <v-card
            class="mx-auto"
            color="primary"
            dark
            outlined
            :to="'/course/fondasipokok/minicourse/' + c.id"
          >
            <v-img :src="baseUrl + c.sc_thumbnail.replace('.', '_')"></v-img>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="text-wrap headline mb-1"
                  v-text="c.subcourse_name"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
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
    baseUrl: 'https://sapi.the-skills.id/api/v2/storage/',
    subcourses: [],
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
