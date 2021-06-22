<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-expansion-panels accordion>
            <v-expansion-panel v-for="(index, i) in link" :key="i">
              <v-expansion-panel-header>{{
                'Materi ' + (i + 1)
              }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <vue-plyr class="player">
                  <div class="plyr__video-embed">
                    <iframe
                      :src="index"
                      allowfullscreen
                      allowtransparency
                    ></iframe>
                  </div>
                </vue-plyr>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    dt: [],
    link: [],
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
    }),
  },
  mounted() {
    if (this.guest) {
      this.$router.push('/auth/login')
    }
    this.$axios
      .get(encodeURI('/api/v2/webinar/' + this.$route.params.slug))
      .then((res) => {
        this.dt = res.data
        this.link = JSON.parse(this.dt.link_record)
      })
      .catch((er) => {
        console.log(er)
      })
  },
}
</script>
