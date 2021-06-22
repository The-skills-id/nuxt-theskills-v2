<template>
  <v-app>
    <v-container>
      <h1>Agendaku</h1>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">Tanggal Acara Webinar</th>
            <th class="text-left">Judul Webinar</th>
            <th class="text-left">Link</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in mywebinar" :key="index">
            <td>{{ item.closed_at }}</td>
            <td>{{ item.webinar_name }}</td>
            <td v-if="item.link_webinar == ''">Belum ada link</td>
            <td v-if="item.link_record && item.status === 'selesai'">
              <nuxt-link
                v-show="item.status == 'selesai'"
                :to="'/course/orangtua/record/' + item.id"
              >
                <v-btn
                  class="text-capitalize"
                  rounded
                  small
                  dark
                  v-text="'Rekaman Webinar'"
                ></v-btn>
              </nuxt-link>
            </td>
            <td v-show="item.status === 'on'">
              <a :href="item.link_webinar" target="_blank"> Ke Zoom </a>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    mywebinar: [],
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
    }),
  },
  created() {
    if (this.guest) {
      this.$router.push('/auth/login')
    }
  },
  mounted() {
    this.$axios
      .get(encodeURI('/api/v2/webinar/mywebinar/' + this.user.user.id))
      .then((res) => {
        this.mywebinar = res.data
      })
      .catch(() => {
        console.log('gagal load data')
      })
  },
}
</script>
