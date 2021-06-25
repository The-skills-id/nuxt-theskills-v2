<template>
  <v-container pa-0 ma-0 fluid>
    <div class="mt-6 login-page">
      <v-card class="mx-auto" max-width="500" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div
              :class="
                $vuetify.breakpoint.mdAndUp
                  ? 'primary--text text-h6 mb-4'
                  : 'primary--text text-h6 mb-4 text-center'
              "
            >
              Login ke akunmu..
            </div>

            <v-divider inset></v-divider>
          </v-list-item-content>
        </v-list-item>
        <v-form ref="form">
          <v-row class="ml-6" align="center" justify="center" no-gutters>
            <v-col cols="12" md="8">
              <span class="text-subtitle-2">Username</span>
              <v-text-field
                v-model="username"
                :rules="[(v) => !!v || 'username harus diisi']"
                placeholder="Username"
                flat
                outlined
                @keyup.enter="login"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <span class="text-subtitle-2">Password</span>
              <v-text-field
                v-model="password"
                :rules="[(v) => !!v || 'password harus diisi']"
                type="password"
                placeholder="Password"
                flat
                outlined
                @keyup.enter="login"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <nuxt-link
                to="/auth/register"
                class="
                  font-weight-light
                  text-subtitle-2
                  blue-lighten-4--text
                  text-decoration-underline
                "
                >Belum punya akun ?</nuxt-link
              >
              <v-spacer></v-spacer>
              <nuxt-link
                to="/auth/reset-password"
                class="
                  font-weight-light
                  text-subtitle-2
                  blue-lighten-4--text
                  text-decoration-underline
                "
                >Lupa password</nuxt-link
              >
              <!-- <a
                href="/register"
                class="font-weight-light text-subtitle-2 blue-lighten-4--text text-decoration-underline"
                >Lupa Password</a
              > -->
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-btn
            class="btn"
            color="primary"
            large
            block
            :loading="loading"
            @click="login"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    loading: false,
    username: '',
    password: '',
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      guest: 'auth/guest',
    }),
  },
  mounted() {
    if (this.guest) {
      this.$router.push('/auth/login')
    }
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    login() {
      this.loading = true
      const validate = this.$refs.form.validate()
      if (!validate) {
        return
      }

      // eslint-disable-next-line no-undef
      const data = new FormData()
      data.set('username', this.username)
      data.set('password', this.password)

      this.$axios
        .post('/api/v2/login', data)
        .then((response) => {
          this.setAuth(response.data)
          this.setAlert({
            status: true,
            text: 'Login Berhasil ',
            type: 'success',
          })
          this.$router.push('/')
        })
        .catch(() => {
          this.setAlert({
            status: true,
            text: 'Login gagal, username atau password salah',
            type: 'warning',
          })
          this.loading = !this.loading
        })
    },
  },
}
</script>
<style>
.login-page {
  background-color: snow;
  width: 100%;
  height: 100vh;
}
.btn {
  text-transform: unset !important;
}
</style>
