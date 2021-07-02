<template>
  <v-app>
    <v-navigation-drawer
      v-model="sideBar"
      :height="500"
      class="drawer pt-6 pb-6"
      absolute
      clipped
    >
      <div>
        <v-btn
          class="close-drawer text-align-right"
          color="primary"
          icon
          dark
          @click="sideBar = false"
        >
          <v-icon>highlight-off</v-icon>
        </v-btn>
      </div>
      <v-list v-if="guest">
        <v-list-item>
          <nuxt-link to="/auth/login">
            <v-btn
              depressed
              block
              rounded
              color="accent lighten-1"
              class="white--text"
            >
              Login
              <v-icon dark right>person-arrow-right</v-icon>
            </v-btn>
          </nuxt-link>
        </v-list-item>
      </v-list>
      <v-list v-if="!guest">
        <v-list-item>
          <v-list-item-avatar>
            <!-- //<img :src="getImage('/users/'+user.avatar)"> -->
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ this.user.name }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-btn
            :loading="loading"
            block
            small
            rounded
            depressed
            color="error lighten-1"
            class="white--text"
            @click.stop="logout()"
          >
            Logout
            <v-icon small right dark>settings_power</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="item.route"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!guest" to="/agenda">
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Agenda'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark flat>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click="sideBar = true"
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img class="mr-3" src="/namtag.png" width="100px" contain></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items
        v-if="$vuetify.breakpoint.mdAndUp"
        class="text-center justify-center"
        right
      >
        <nuxt-link
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          class="mt-3"
        >
          <v-btn class="mr-2 font-weight-medium btn" text>
            {{ item.title }}
          </v-btn>
        </nuxt-link>
        <nuxt-link to="/agenda" class="mt-3">
          <v-btn
            v-if="!guest"
            class="mr-2 font-weight-medium btn"
            text
            v-text="'Agenda'"
          >
          </v-btn>
        </nuxt-link>
        <nuxt-link to="/auth/login" class="mt-3">
          <v-btn
            v-if="guest"
            class="mr-2 font-weight-medium btn"
            text
            v-text="'Login'"
          >
          </v-btn>
        </nuxt-link>
        <div>
          <v-btn
            v-if="guest"
            rounded
            depressed
            color="amber darken-1"
            class="mt-3 font-weight-bold"
            to="/auth/register"
          >
            Daftar Gratis
          </v-btn>
          <v-btn
            v-if="!guest"
            rounded
            depressed
            color="red darken-1"
            class="mt-3 font-weight-bold"
            @click="logout"
          >
            Logout
          </v-btn>
        </div>
      </v-toolbar-items>
    </v-toolbar>
    <nuxt />
    <v-speed-dial
      v-model="fab"
      class="mr-4"
      fixed
      right
      bottom
      direction="top"
      transition="slide-y-reverse-transition"
    >
      <template #activator>
        <v-chip v-model="fab" color="green" dark fab right bottom>
          <v-icon v-if="fab" class="mr-1"> mdi-close </v-icon>
          <v-icon v-else class="mr-1"> mdi-whatsapp </v-icon>

          Hubungi Kami
        </v-chip>
      </template>
      <v-btn href="https://wa.me/6281336681197" dark small color="green">
        <v-icon>mdi-whatsapp</v-icon> Bu Tyas
      </v-btn>
      <v-btn href="https://wa.me/6282245820849" dark small color="green">
        <v-icon>mdi-whatsapp</v-icon> Kak Cinta
      </v-btn>
      <v-btn href="https://wa.me/6281386279125" dark small color="green">
        <v-icon>mdi-whatsapp</v-icon> Kak Nabila
      </v-btn>
    </v-speed-dial>
    <Alert></Alert>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '~/components/Alert'

export default {
  components: {
    Alert,
  },
  data: () => ({
    fab: false,
    loading: false,
    sideBar: false,
    items: [
      {
        title: 'Beranda',
        route: '/',
      },
      {
        title: 'Komunitas Orangtua',
        route: '/course/orangtua',
      },
      {
        title: 'Fondasi Pokok',
        route: '/course/fondasipokok',
      },
      {
        title: 'Fondasi Skill Abad 21',
        route: '/course/skill21',
      },
      {
        title: 'Artikel',
        route: '/articles/',
      },
    ],
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    logout() {
      console.log(this.user.token.plainTextToken)
      const config = {
        headers: {
          Authorization: `Bearer ${this.user.token.plainTextToken}`,
          'Content-Type': 'application/json',
        },
      }
      this.loading = !this.loading
      this.$axios
        .post('/api/v2/logout', {}, config)
        .then((response) => {
          this.setAuth({})
          this.setAlert({
            status: true,
            text: response.data.message,
            type: 'success',
          })
          this.$router.push('/')
        })
        .catch(() => {
          this.setAlert({
            status: true,
            text: 'Logout gagal ',
            type: 'warning',
          })
        })
      this.loading = !this.loading
    },
  },
}
</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
}
.drawer {
  margin-top: 70px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.close-drawer {
  float: right;
  position: relative;
}

a {
  text-decoration: none;
}
</style>
